import Spinner from "@/components/atoms/Spinner";
import PageTemplate from "@/components/templates/PageTemplate/index";
import React from "react";

const AnswerSentPage = () => {
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
