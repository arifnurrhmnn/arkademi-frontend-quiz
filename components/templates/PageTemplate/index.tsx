"use client";
import FooterScore from "@/components/organisms/FooterScore/index";
import { useCurrentQuestion } from "@/lib/firebase/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";

type PageTemplateProps = {
  children: React.ReactNode;
  className?: string;
};

const PageTemplate: React.FC<PageTemplateProps> = ({ children, className }) => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;

  const { currentQuestionIndex } = useCurrentQuestion(sessionId);

  return (
    <div className={`flex flex-col w-full h-screen ${className}`}>
      <h2 className="font-bold text-white text-2xl text-center mt-8 mb-2">
        {`Question ${currentQuestionIndex + 1}`}
      </h2>
      {children}
      <FooterScore />
    </div>
  );
};

export default PageTemplate;
