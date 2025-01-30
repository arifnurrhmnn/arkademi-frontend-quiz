import AnswerBox from "@/components/moleculs/AnswerBox/index";
import React from "react";
type typeAnswerType = "default" | "text";

const GroubAnswerBox = ({
  typeAnswer = "default",
  dataAnswer,
}: {
  typeAnswer?: typeAnswerType;
  dataAnswer?: any;
}) => {
  const className: Record<typeAnswerType, string> = {
    default: "h-full m-auto gap-5 ",
    text: "h-auto gap-3",
  };

  return (
    <div className={`${className[typeAnswer]} w-full grid grid-cols-2 p-8`}>
      <AnswerBox
        variant="a"
        typeAnswer={typeAnswer}
        textAnsware={dataAnswer?.a}
      />
      <AnswerBox
        variant="b"
        typeAnswer={typeAnswer}
        textAnsware={dataAnswer?.b}
      />
      <AnswerBox
        variant="c"
        typeAnswer={typeAnswer}
        textAnsware={dataAnswer?.c}
      />
      <AnswerBox
        variant="d"
        typeAnswer={typeAnswer}
        textAnsware={dataAnswer?.d}
      />
    </div>
  );
};

export default GroubAnswerBox;
