"use client";

import GroubAnswerBox from "@/components/organisms/GroubAnswerBox";
import AdminTemplate from "@/components/templates/AdminTemplate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuiz } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export interface Question {
  options: string[];
  question: string;
  correctIndex: string;
  timeout: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

const CreatorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id") as string;
  const { quiz }: { quiz: Quiz } = useQuiz(quizId);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const currectQuestion = quiz?.questions[questionIndex];

  console.log("quiz", quiz);

  return (
    <AdminTemplate className="bg-black">
      <div className="w-full h-full flex flex-nowrap">
        <aside className="w-[15%] bg-gray-900 flex flex-col items-center gap-4">
          <ul className="w-full flex flex-col">
            {quiz?.questions.map((question, index) => (
              <li
                className="flex flex-col px-4 py-3"
                key={index}
                onClick={() => setQuestionIndex(index)}
              >
                <p className="font-bold text-white mb-2">{index + 1} Quiz</p>
                <div className="w-full h-[100px] rounded-sm bg-white"></div>
              </li>
            ))}
          </ul>
          <Button className="font-bold w-fit">Add</Button>
        </aside>
        <main className="w-full flex flex-col justify-between">
          <div className="flex flex-col justify-center items-center p-8">
            <Textarea
              placeholder="Input Question."
              className="!flex !items-center !font-bold !text-white !text-3xl !text-center !border-dashed"
              //   value={}
            />
          </div>

          <GroubAnswerBox
            typeAnswer="text"
            dataAnswer={currectQuestion?.options}
          />
        </main>
      </div>
    </AdminTemplate>
  );
};

export default CreatorPage;
