import Box from "@/components/atoms/Box/index";
import PageTemplate from "@/components/templates/PageTemplate/index";
import React from "react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";

// Definisikan tipe untuk props
interface AnswerResultPageProps {
  resultStatus: "correct" | "incorrect" | "timesUp";
}

const AnswerResultPage: React.FC<AnswerResultPageProps> = ({
  resultStatus,
}) => {
  return (
    <PageTemplate className="bg-black">
      <div className="answer-result w-full h-screen flex flex-col items-center justify-center">
        <h3 className="font-bold text-white text-4xl mb-4">
          {resultStatus === "correct"
            ? "Correct!"
            : resultStatus === "incorrect"
            ? "Incorrect!"
            : resultStatus === "timesUp"
            ? "Time's Up!"
            : ""}
        </h3>
        <>
          {resultStatus === "correct" && (
            <RiCheckboxCircleFill className="text-7xl text-green-600 border-[4px] border-green-600 rounded-full" />
          )}
          {(resultStatus === "incorrect" || resultStatus === "timesUp") && (
            <RiCloseCircleFill className="text-7xl text-red-600 border-[4px] border-red-600 rounded-full" />
          )}
        </>
        <Box className="font-bold bg-white bg-opacity-20 text-white py-2 px-8 mt-12 rounded-sm">
          +150
        </Box>
      </div>
    </PageTemplate>
  );
};

export default AnswerResultPage;
