import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// CREATE SESSION
const generateUniquePin = async () => {
  let pin = "";
  let exists = true;

  while (exists) {
    pin = Math.floor(100000 + Math.random() * 900000).toString();
    const q = query(collection(db, "sessionQuiz"), where("pin", "==", pin));
    const snapshot = await getDocs(q);
    exists = !snapshot.empty;
  }
  return pin;
};

export const createSession = async (quizId: string) => {
  const pin = await generateUniquePin();
  const sessionRef = await addDoc(collection(db, "sessionQuiz"), {
    quizId,
    pin,
    status: "waiting",
    currentQuestion: -1,
    createdAt: serverTimestamp(),
  });
  return { sessionId: sessionRef.id, pin };
};

export const endSession = async (sessionId: string) => {
  await updateDoc(doc(db, "sessionQuiz", sessionId), {
    status: "ended",
  });
};

// JOIN SESSION
export const validatePin = async (pin: string) => {
  const sessionsQuery = query(
    collection(db, "sessionQuiz"),
    where("pin", "==", pin)
  );
  const snapshot = await getDocs(sessionsQuery);

  if (snapshot.empty) throw new Error("Invalid PIN");

  const session = snapshot.docs[0].data();
  if (session.status !== "waiting")
    throw new Error("Session has already started");

  return snapshot.docs[0].id;
};

export const joinSession = async (pin: string, nickname: string) => {
  const sessionId = await validatePin(pin);

  const participantRef = await addDoc(
    collection(db, `sessionQuiz/${sessionId}/participants`),
    {
      nickname,
      joinedAt: serverTimestamp(),
      score: 0,
      answers: {},
    }
  );

  localStorage.setItem("participantId", participantRef.id);
  return { sessionId, participantId: participantRef.id };
};

// START QUIZ
export const startQuiz = async (sessionId: string) => {
  await updateDoc(doc(db, "sessionQuiz", sessionId), {
    status: "started",
    currentQuestion: 0,
    currentQuestionStatus: "active",
    currentQuestionStartTime: serverTimestamp(),
    currentQuestionEndTime: {
      _seconds: Math.floor(Date.now() / 1000) + getQuestionTimeout(),
    },
  });
};

// NEXT QUESTION
export const nextQuestion = async (sessionId: string) => {
  const sessionRef = doc(db, "sessionQuiz", sessionId);
  const sessionDoc = await getDoc(sessionRef);
  const currentQuestion = sessionDoc.data()?.currentQuestion || 0;
  const timeout = getQuestionTimeout();

  await updateDoc(sessionRef, {
    currentQuestion: currentQuestion + 1,
    currentQuestionStatus: "active",
    currentQuestionStartTime: serverTimestamp(),
    currentQuestionEndTime: {
      _seconds: Math.floor(Date.now() / 1000) + timeout,
    },
  });
};

// SUBMIT ANSWERE
export const submitAnswer = async (
  sessionId: string,
  participantId: string,
  questionIndex: number,
  answerIndex: number
) => {
  const sessionRef = doc(db, "sessionQuiz", sessionId);
  const participantRef = doc(
    db,
    `sessionQuiz/${sessionId}/participants/${participantId}`
  );

  try {
    // Get session data untuk mendapatkan quizId
    const sessionDoc = await getDoc(sessionRef);
    const sessionData = sessionDoc.data();

    if (!sessionData) {
      throw new Error("Session tidak ditemukan");
    }

    // Get quiz data untuk memeriksa jawaban benar
    const quizRef = doc(db, "quizzes", sessionData.quizId);
    const quizDoc = await getDoc(quizRef);
    const quizData = quizDoc.data();

    if (!quizData) {
      throw new Error("Quiz tidak ditemukan");
    }

    // Dapatkan data partisipan terbaru
    const participantDoc = await getDoc(participantRef);
    const participantData = participantDoc.data();

    // Hitung skor
    const totalQuestions = quizData.questions.length;
    const currentScore = participantData?.score || 0;
    const correctAnswer = quizData.questions[questionIndex]?.correctIndex;
    const scoreIncrement =
      answerIndex == correctAnswer ? 100 / totalQuestions : 0;

    // Update jawaban dan skor
    await updateDoc(participantRef, {
      [`answers.${questionIndex}`]: {
        answerIndex,
        timestamp: serverTimestamp(),
      },
      score: currentScore + scoreIncrement,
    });
  } catch (error) {
    console.error("Error submit jawaban:", error);
    throw error;
  }
};

// interface ParticipantAnswer {
//   [questionIndex: string]: {
//     answerIndex: number;
//     timestamp: string;
//   };
// }

// interface QuizQuestion {
//   question: string;
//   options: string[];
//   correctIndex: number;
// }

// export const checkAnswerCorrectness = (
//   participantAnswers: ParticipantAnswer,
//   questionIndex: number,
//   quizQuestions: QuizQuestion[]
// ) => {
//   const question = quizQuestions[questionIndex];

//   // Jika pertanyaan tidak ada
//   if (!question) {
//     return {
//       isCorrect: false,
//       participantAnswer: null,
//       correctAnswer: null,
//       error: "Question not found",
//     };
//   }

//   const participantAnswer = participantAnswers[questionIndex]?.answerIndex;

//   // Jika partisipan belum menjawab
//   if (typeof participantAnswer !== "number") {
//     return {
//       isCorrect: false,
//       participantAnswer: null,
//       correctAnswer: question.correctIndex,
//       status: "unanswered",
//     };
//   }

//   // Bandingkan jawaban dengan kunci benar
//   const isCorrect = participantAnswer === question.correctIndex;

//   return {
//     isCorrect,
//     participantAnswer,
//     correctAnswer: question.correctIndex,
//     status: isCorrect ? "correct" : "incorrect",
//   };
// };

// export const getParticipantResults = (
//   participantAnswers: Record<string, any>,
//   quizQuestions: any[]
// ) => {
//   return quizQuestions.map((question, index) => {
//     const participantAnswer = participantAnswers[index]?.answerIndex;
//     const isCorrect = participantAnswer === question.correctIndex;

//     return {
//       question: question.question,
//       options: question.options,
//       participantAnswer,
//       correctAnswer: question.correctIndex,
//       isCorrect,
//       status:
//         participantAnswer === undefined
//           ? "unanswered"
//           : isCorrect
//           ? "correct"
//           : "incorrect",
//     };
//   });
// };

// export const calculateTotalScore = (results: any[]) => {
//   return results.filter((result) => result.isCorrect).length;
// };

interface QuestionResult {
  isCorrect: boolean;
  status: "correct" | "incorrect" | "timesup";
  participantAnswer: number | null;
  correctAnswer: number;
  score: number;
}

export const getSingleQuestionResult = (
  participantAnswers: Record<string, any>, // Jawaban dari Firestore
  targetQuestionIndex: number,
  quizQuestions: any[]
): QuestionResult => {
  const question = quizQuestions[targetQuestionIndex];

  const participantAnswer =
    participantAnswers[targetQuestionIndex]?.answerIndex;
  const isCorrect = participantAnswer == question.correctIndex;
  const status =
    participantAnswer >= 0 ? (isCorrect ? "correct" : "incorrect") : "timesup";
  const score = isCorrect ? 100 / quizQuestions.length : 0;

  return {
    isCorrect,
    status,
    participantAnswer: participantAnswer ?? null,
    correctAnswer: question.correctIndex,
    score,
  };
};

const getQuestionTimeout = (quizId?: string, questionIndex?: number) => {
  return 20;
};

export const handleQuestionTimeout = async (sessionId: string) => {
  const sessionRef = doc(db, "sessionQuiz", sessionId);
  await updateDoc(sessionRef, {
    currentQuestionStatus: "timeout",
  });
};
