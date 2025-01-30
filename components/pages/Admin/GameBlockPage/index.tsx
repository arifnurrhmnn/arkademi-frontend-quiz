import GroubAnswerBox from "@/components/organisms/GroubAnswerBox";
import { Button } from "@/components/ui/button";
import React from "react";

const GameBlockPage = () => {
  const dataQuestions = {
    question:
      "Apa kepanjangan dari istilah 'IoT' yang sering digunakan dalam dunia teknologi?",
    options: {
      a: "Internet of Things",
      b: "Internet of Technology",
      c: "Input Output Technology",
      d: "Integrated Online Tools",
    },
    correctAnswer: "a",
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-black">
      <div className="min-h-[76px] bg-white bg-opacity-10 flex justify-between items-center px-8 py-2">
        <p className="font-bold text-xl text-white">1/7 Answered</p>
        <p className="font-bold text-white text-6xl">00:00</p>
        {/* <Button
          variant="secondary"
          className="font-bold text-black px-6 rounded-sm"
        >
          Next
        </Button> */}
        <p className="font-bold text-xl text-white">1/3 Questions</p>
      </div>
      <div className="flex flex-col justify-center items-center p-8 ">
        <h1 className="font-bold text-white text-center text-4xl/normal px-[10%]">
          {dataQuestions?.question}
        </h1>
      </div>
      <GroubAnswerBox typeAnswer="text" dataAnswer={dataQuestions?.options} />
    </div>
  );
};

export default GameBlockPage;
