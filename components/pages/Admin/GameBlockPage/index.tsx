"use client";

import GroubAnswerBox from "@/components/organisms/GroubAnswerBox";
import { Button } from "@/components/ui/button";
import {
  endSession,
  handleQuestionTimeout,
  nextQuestion,
} from "@/lib/firebase/action";
import { useCurrentQuestion, useParticipants } from "@/lib/firebase/hooks";
import { useQuestionStats } from "@/lib/useQuestionStats";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GameBlockPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;

  const [timeLeft, setTimeLeft] = useState<number>(-1);

  const { currentQuestionIndex, currentQuestion, totalQuestions } =
    useCurrentQuestion(sessionId);
  const participants = useParticipants(sessionId);
  const questionStats = useQuestionStats(
    participants?.participants,
    currentQuestionIndex,
    currentQuestion
  );

  const forceTimeout = async () => {
    await handleQuestionTimeout(sessionId);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex + 1 == totalQuestions) {
      await endSession(sessionId as string);
      router.push(`/admin/gameover?id=${sessionId}`);
    } else {
      await nextQuestion(sessionId as string);
      router.push(`/admin/getready?id=${sessionId}`);
    }
  };

  // Timer logic
  useEffect(() => {
    if (currentQuestion?.timeout) {
      setTimeLeft(currentQuestion.timeout);

      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) forceTimeout();
  }, [timeLeft]);

  const formatTime = (time: number) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;

  console.log("questionStats", questionStats, timeLeft);

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-black">
      <div className="min-h-[76px] bg-white bg-opacity-10 flex justify-between items-center px-8 py-2">
        <p className="font-bold text-xl text-white">
          {questionStats.answeredCount}/{questionStats.totalParticipants}{" "}
          Answered
        </p>
        <p className="font-bold text-white text-6xl">{formatTime(timeLeft)}</p>

        {timeLeft === 0 ? (
          <Button
            variant="secondary"
            className="font-bold text-black px-6 rounded-sm"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex + 1 == totalQuestions
              ? "Check Scores"
              : "Next"}
          </Button>
        ) : (
          <p className="font-bold text-xl text-white">
            {currentQuestionIndex + 1}/{totalQuestions} Questions
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="font-bold text-white text-center text-4xl px-[10%]">
          {currentQuestion?.question}
        </h1>
      </div>

      <GroubAnswerBox
        typeAnswer="text"
        dataAnswer={currentQuestion?.options}
        correctAnswer={
          timeLeft === 0 ? questionStats?.correctAnswer.index.toString() : "-1"
        }
      />
    </div>
  );
};

export default GameBlockPage;
