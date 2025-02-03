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
    startTime: serverTimestamp(),
  });
};

// NEXT QUESTION
export const nextQuestion = async (sessionId: string) => {
  const sessionRef = doc(db, "sessionQuiz", sessionId);
  const sessionDoc = await getDoc(sessionRef);
  const currentQuestion = sessionDoc.data()?.currentQuestion || 0;

  await updateDoc(sessionRef, {
    currentQuestion: currentQuestion + 1,
    startTime: serverTimestamp(),
  });
};

// SUBMIT ANSWERE
export const submitAnswer = async (
  sessionId: string,
  participantId: string,
  questionIndex: number,
  answerIndex: number
) => {
  const participantRef = doc(
    db,
    `sessionQuiz/${sessionId}/participants/${participantId}`
  );

  await updateDoc(participantRef, {
    [`answers.${questionIndex}`]: {
      answerIndex,
      timestamp: serverTimestamp(),
    },
  });
};
