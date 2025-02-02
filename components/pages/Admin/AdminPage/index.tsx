"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { createSession } from "@/lib/firebase/action";
import { IQuiz } from "@/types/quizzes";
import { collection, getDocs } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const quizzesData: IQuiz[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IQuiz[];
      setQuizzes(quizzesData);
    };
    fetchQuizzes();
  }, []);

  const handleCreateSession = async (quizId: string) => {
    const { sessionId, pin } = await createSession(quizId);
    router.push(`/admin/lobby?id=${sessionId}`);
  };

  console.log("quizzes", quizzes);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-full flex flex-wrap">
        {quizzes?.map((quiz, index) => {
          return (
            <div
              className="bg-white bg-opacity-20 flex flex-col gap-2 p-4 rounded-md"
              key={index}
            >
              <p className="font-bold text-white text-lg">{quiz.title}</p>
              <Button
                onClick={() => handleCreateSession(quiz.id)}
                variant="secondary"
                className="font-bold text-base w-fit"
              >
                Play
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
