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
  totalQuestions: number;
  loading: boolean;
  error?: Error;
}

export const useCurrentQuestion = (
  sessionId: string
): UseCurrentQuestionResult => {
  const { session } = useSession(sessionId);
  const { quiz } = useQuiz(session?.quizId || "");

  const currentQuestionIndex = session?.currentQuestion ?? -1;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  return {
    currentQuestion,
    currentQuestionIndex,
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
