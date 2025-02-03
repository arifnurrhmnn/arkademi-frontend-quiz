import AnswerBox from "@/components/moleculs/AnswerBox/index";
import React from "react";
type typeAnswerType = "default" | "text";

const GroubAnswerBox = ({
  typeAnswer = "default",
  dataAnswer,
  onClick,
  correctAnswer,
}: {
  typeAnswer?: typeAnswerType;
  dataAnswer?: string[];
  onClick?: (e: string) => void;
  correctAnswer?: string;
}) => {
  const className: Record<typeAnswerType, string> = {
    default: "h-full m-auto gap-5 ",
    text: "h-auto gap-3",
  };

  return (
    <div className={`${className[typeAnswer]} w-full grid grid-cols-2 p-8`}>
      {dataAnswer?.map((answer: string, index: number) => (
        <AnswerBox
          key={index}
          variant={index.toString()}
          typeAnswer={typeAnswer}
          textAnsware={answer}
          onClick={onClick}
          correctAnswer={correctAnswer}
        />
      ))}
    </div>
  );
};

export default GroubAnswerBox;
