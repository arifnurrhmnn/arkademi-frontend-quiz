import React, { JSX } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaDiamond, FaSquare } from "react-icons/fa6";

type VariantType = "a" | "b" | "c" | "d";
type typeAnswerType = "default" | "text";

const AnswerBox = ({
  variant,
  typeAnswer = "default",
  textAnsware,
}: {
  variant: VariantType;
  typeAnswer?: typeAnswerType;
  textAnsware?: string;
}) => {
  // Mapping for background colors
  const bgColors: Record<VariantType, string> = {
    a: "bg-red-600 hover:bg-red-800",
    b: "bg-blue-600 hover:bg-blue-800",
    c: "bg-yellow-600 hover:bg-yellow-800",
    d: "bg-green-600 hover:bg-green-800",
  };
  // bg-green-600 hover:bg-green-800 opacity-50

  // Mapping for icons
  const icons: Record<VariantType, JSX.Element> = {
    a: (
      <BsTriangleFill
        className={`${
          typeAnswer == "text" ? "text-3xl" : "text-8xl"
        } text-white`}
      />
    ),
    b: (
      <FaDiamond
        className={`${
          typeAnswer == "text" ? "text-3xl" : "text-8xl"
        } text-white`}
      />
    ),
    c: (
      <FaCircle
        className={`${
          typeAnswer == "text" ? "text-3xl" : "text-8xl"
        } text-white`}
      />
    ),
    d: (
      <FaSquare
        className={`${
          typeAnswer == "text" ? "text-3xl" : "text-8xl"
        } text-white`}
      />
    ),
  };

  const className: Record<typeAnswerType, string> = {
    default: "w-full h-full grid place-items-center rounded-lg cursor-pointer",
    text: "w-full h-full flex flex-nowrap items-center gap-4 rounded-md cursor-pointer py-6 px-4",
  };

  return (
    <div className={`${className[typeAnswer]} ${bgColors[variant]}`}>
      {icons[variant]}
      {typeAnswer === "text" && (
        <span className="font-semibold text-white text-lg">{textAnsware}</span>
      )}
    </div>
  );
};

export default AnswerBox;
