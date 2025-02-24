import AnswerBoxCreator from "@/components/moleculs/AnswerBox/AnswerBoxCreator";
import React from "react";
type typeAnswerType = "default" | "text";

const GroubAnswerBoxCreator = ({
  typeAnswer = "default",
  dataAnswer,
  onClick,
  correctAnswer,
  setOptions,
}: {
  typeAnswer?: typeAnswerType;
  dataAnswer?: string[];
  onClick?: (e: string) => void;
  correctAnswer?: string;
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const className: Record<typeAnswerType, string> = {
    default: "h-full m-auto gap-5 ",
    text: "h-auto gap-3",
  };

  const handleSetOptions = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  return (
    <div className={`${className[typeAnswer]} w-full grid grid-cols-2 p-8`}>
      {dataAnswer?.map((answer: string, index: number) => (
        <AnswerBoxCreator
          key={index}
          variant={index.toString()}
          typeAnswer={typeAnswer}
          textAnsware={answer}
          onClick={onClick}
          correctAnswer={correctAnswer}
          setOptions={(value) => handleSetOptions(index, value)}
        />
      ))}
    </div>
  );
};

export default GroubAnswerBoxCreator;
