"use client";

import CustomInput from "@/components/atoms/CustomInput";
import GroubAnswerBoxCreator from "@/components/organisms/GroubAnswerBox/GrubAnswerBoxCreator";
import AdminTemplate from "@/components/templates/AdminTemplate";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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
  const [question, setQuestion] = useState("Input Question");
  const [options, setOptions] = useState<string[]>([
    "Add Answer 1",
    "Add Answer 2",
    "Add Answer 3",
    "Add Answer 4",
  ]);

  useEffect(() => {
    const currectQuestion = quiz?.questions[questionIndex];

    if (currectQuestion) {
      setQuestion(currectQuestion.question);
      setOptions(currectQuestion.options);
    }
  }, [quiz]);

  console.log("quiz", options, question);

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
        <main className="w-[85%] flex flex-col justify-between">
          <div className="w-full h-full flex flex-col justify-center items-center p-8">
            <CustomInput
              placeholder="Input Question"
              textContent={question}
              setTextContent={setQuestion}
            />
          </div>

          <GroubAnswerBoxCreator
            typeAnswer="text"
            dataAnswer={options}
            setOptions={setOptions}
          />
        </main>
      </div>
    </AdminTemplate>
  );
};

export default CreatorPage;
