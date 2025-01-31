"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "@/lib/firebase";

interface Quiz {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  currentQuestionId: string;
  pin: number;
  status: string;
  participants?: string[];
}

export const useQuizSubscription = (quizId: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const quizDocRef = doc(db, "quizzes", quizId);

    const unsubscribe = onSnapshot(
      quizDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const quizData = { id: docSnap.id, ...docSnap.data() } as Quiz;
          setQuiz(quizData);
          setLoading(false);
        } else {
          setError(new Error("Document not found"));
          setLoading(false);
        }
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  return { quiz, loading, error };
};
