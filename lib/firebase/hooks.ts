import { useEffect, useState } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { submitAnswer } from "./action";

export const useSession = (sessionId: string) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(
      doc(db, "sessionQuiz", sessionId),
      (doc) => {
        if (doc.exists()) {
          setSession({ id: doc.id, ...doc.data() });
          setLoading(false);
        } else {
          setError(new Error("Session not found"));
          setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  return { session, loading, error };
};

// interface Participant {
//   answers?: any;
//   id: string;
//   joineAt: string;
//   nickname?: string;
//   score?: number;
// }
export const useParticipants = (sessionId: string) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(
      collection(db, `sessionQuiz/${sessionId}/participants`),
      (snapshot) => {
        const parts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          joinedAt: doc.data().joinedAt?.toDate().toISOString(),
        }));
        setParticipants(parts);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  return { participants, loading, error };
};

interface DataParticipant {
  nickname: string;
  score: number;
  [key: string]: any;
}

export const useParticipant = (sessionId: string) => {
  const participantId =
    typeof window !== "undefined"
      ? localStorage.getItem("participantId") || ""
      : "";
  const [participant, setParticipant] = useState<DataParticipant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || !participantId) {
      setLoading(false);
      return;
    }

    const participantRef = doc(
      db,
      `sessionQuiz/${sessionId}/participants/${participantId}`
    );

    // Gunakan onSnapshot untuk mendapatkan update real-time
    const unsubscribe = onSnapshot(
      participantRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setParticipant(docSnap.data() as DataParticipant);
        } else {
          setError("Participant not found");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching participant:", err);
        setError("Failed to fetch participant data");
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, [sessionId, participantId]);

  return { participant, loading, error };
};

export const useQuiz = (quizId: string) => {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId) return;

    const unsubscribe = onSnapshot(doc(db, "quizzes", quizId), (doc) => {
      if (doc.exists()) {
        setQuiz({ id: doc.id, ...doc.data() });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [quizId]);

  return { quiz, loading };
};

interface CurrentQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  timeout: number;
}

interface UseCurrentQuestionResult {
  currentQuestion?: CurrentQuestion;
  currentQuestionIndex: number;
  currentQuestionStatus: string;
  totalQuestions: number;
  loading: boolean;
  error?: Error;
}

export const useCurrentQuestion = (
  sessionId: string
): UseCurrentQuestionResult => {
  const { session } = useSession(sessionId);
  const { quiz } = useQuiz(session?.quizId || "");

  const currentQuestionIndex = session?.currentQuestion;
  const currentQuestionStatus = session?.currentQuestionStatus;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  return {
    currentQuestion,
    currentQuestionIndex,
    currentQuestionStatus,
    totalQuestions: quiz?.questions?.length || 0,
    loading: !session || !quiz,
    error: session?.error || quiz?.error,
  };
};

export const useAnswerHandler = (sessionId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = async (
    participantId: string,
    questionIndex: number,
    answerIndex: number
  ) => {
    if (!sessionId || !participantId) {
      setError("Session or participant data missing");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await submitAnswer(sessionId, participantId, questionIndex, answerIndex);
      setSelectedAnswer(answerIndex);
    } catch (err) {
      setError("Failed to submit answer. Please try again.");
      console.error("Answer submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleAnswer,
    isSubmitting,
    selectedAnswer,
    error,
  };
};

export const useQuestionState = (sessionId: string) => {
  const [state, setState] = useState({
    status: "waiting",
    timeLeft: 0,
  });

  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(doc(db, "sessionQuiz", sessionId), (doc) => {
      const session = doc.data();
      const endTime = session?.currentQuestionEndTime
        ? session.currentQuestionEndTime * 1000
        : 0;
      const currentTime = Date.now();

      setState({
        status: session?.currentQuestionStatus || "waiting",
        timeLeft: endTime ? Math.max(0, endTime - currentTime) : 0,
      });
    });

    return () => unsubscribe();
  }, [sessionId]);

  return {
    ...state,
    timeLeftSeconds: Math.round(state.timeLeft / 1000),
  };
};
