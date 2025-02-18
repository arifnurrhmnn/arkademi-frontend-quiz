"use client";
import Spinner from "@/components/atoms/Spinner";
import PageTemplate from "@/components/templates/PageTemplate/index";
import { useCurrentQuestion, useQuestionState } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const AnswerSentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");

  const { currentQuestionStatus } = useCurrentQuestion(sessionId as string);

  console.log("status", status);

  useEffect(() => {
    if (currentQuestionStatus === "timeout") {
      router.push(`/answer/result?id=${sessionId}`);
    }
  }, [currentQuestionStatus]);

  return (
    <PageTemplate className="bg-black">
      <div className="answer-sent w-full h-screen flex flex-col items-center justify-center">
        <Spinner />
        <h3 className="font-bold text-white text-4xl mt-10">Answer Locked!</h3>
      </div>
    </PageTemplate>
  );
};

export default AnswerSentPage;
