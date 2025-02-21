"use client";
import AdminTemplate from "@/components/templates/AdminTemplate";
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

  const handleEditQuiz = async (quizId: string) => {
    router.push(`/admin/creator?id=${quizId}`);
  };

  console.log("quizzes", quizzes);

  return (
    <AdminTemplate className="bg-black">
      <div className="w-full h-screen flex flex-col items-center p-8">
        <div className="w-full flex flex-col flex-wrap gap-4">
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
                <Button
                  onClick={() => handleEditQuiz(quiz.id)}
                  variant="secondary"
                  className="font-bold text-base w-fit"
                >
                  Edit
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminPage;
