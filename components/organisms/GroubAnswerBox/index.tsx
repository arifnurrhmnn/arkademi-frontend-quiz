import AnswerBox from "@/components/moleculs/AnswerBox/index";
import React from "react";

const GroubAnswerBox = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-5 m-auto p-8">
      <AnswerBox variant="a" />
      <AnswerBox variant="b" />
      <AnswerBox variant="c" />
      <AnswerBox variant="d" />
    </div>
  );
};

export default GroubAnswerBox;
