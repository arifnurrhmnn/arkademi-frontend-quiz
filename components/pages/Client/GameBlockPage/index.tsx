"use client";
import GroubAnswerBox from "@/components/organisms/GroubAnswerBox/index";
import PageTemplate from "@/components/templates/PageTemplate/index";
import { useAnswerHandler, useCurrentQuestion } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const GameBlockPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;
  const participantId = localStorage.getItem("participantId") || "";

  const { currentQuestion, currentQuestionIndex, currentQuestionStatus } =
    useCurrentQuestion(sessionId);

  const { handleAnswer, isSubmitting, selectedAnswer, error } =
    useAnswerHandler(sessionId);

  const handleSubmitAnswer = async (answerIndex: string) => {
    await handleAnswer(
      participantId,
      currentQuestionIndex,
      parseInt(answerIndex)
    );
    router.push(`/answer/sent?id=${sessionId}`);
  };

  useEffect(() => {
    if (currentQuestionStatus === "timeout") {
      handleSubmitAnswer("-1");
    }
  }, [currentQuestionStatus]);

  console.log("submitted", isSubmitting, selectedAnswer, error);
  return (
    <PageTemplate className="bg-black">
      <GroubAnswerBox
        dataAnswer={currentQuestion?.options}
        onClick={handleSubmitAnswer}
      />
    </PageTemplate>
  );
};

export default GameBlockPage;
