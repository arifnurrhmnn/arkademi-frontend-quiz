"use client";

import { useQuiz, useSession } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GetReadyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const { session } = useSession(sessionId as string);
  const { quiz } = useQuiz(session?.quizId);

  const currentQuestionIndex = session?.currentQuestion || 0;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  console.log("currentQuestion", currentQuestion, quiz, session);

  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    if (countDown === 0) {
      router.push(`/admin/gameblock?id=${sessionId}`);
      return;
    }

    const timer = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown, router, sessionId]);

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-black">
      <div className="min-h-[76px] flex justify-between items-center px-8 py-2">
        <p className="font-bold text-xl text-white"></p>
        <p className="font-bold text-white text-6xl"></p>
        <p className="font-bold text-xl text-white">
          {currentQuestionIndex + 1}/{quiz?.questions?.length} Questions
        </p>
      </div>
      <div className="flex-grow w-full flex flex-col justify-center items-center gap-20 p-8">
        <h1 className="font-bold text-white text-center text-4xl/normal px-[10%]">
          {currentQuestion?.question}
        </h1>
        <div className="box-countdown w-28 h-28 flex justify-center items-center rounded-full bg-white mb-8">
          <p className="font-bold text-dark text-8xl p-0">{countDown}</p>
        </div>
      </div>
    </div>
  );
};

export default GetReadyPage;
