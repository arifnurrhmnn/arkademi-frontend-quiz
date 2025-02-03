import React, { JSX } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaDiamond, FaSquare } from "react-icons/fa6";

type VariantType = `${string}`;
type TypeAnswerType = "default" | "text";

const AnswerBox = ({
  variant,
  typeAnswer = "default",
  textAnsware,
  onClick,
  correctAnswer,
}: {
  variant: VariantType;
  typeAnswer?: TypeAnswerType;
  textAnsware?: string;
  onClick?: (e: string) => void;
  correctAnswer?: string; // Bisa string bebas atau salah satu dari "0"|"1"|"2"|"3"
}) => {
  // Mapping warna background
  const bgColors: Record<VariantType, string> = {
    "0": "bg-red-600 hover:bg-red-800",
    "1": "bg-blue-600 hover:bg-blue-800",
    "2": "bg-yellow-600 hover:bg-yellow-800",
    "3": "bg-green-600 hover:bg-green-800",
  };

  // Cek apakah correctAnswer adalah nilai yang valid ("0"|"1"|"2"|"3")
  const isValidCorrectAnswer = ["0", "1", "2", "3"].includes(
    correctAnswer || ""
  );

  // Jika correctAnswer valid, tambahkan opacity-50 ke jawaban yang salah
  const isIncorrect = isValidCorrectAnswer && correctAnswer !== variant;
  const bgColor = `${bgColors[variant]} ${isIncorrect ? "opacity-50" : ""}`;

  // Mapping ikon
  const icons: Record<VariantType, JSX.Element> = {
    "0": <BsTriangleFill className="text-white" />,
    "1": <FaDiamond className="text-white" />,
    "2": <FaCircle className="text-white" />,
    "3": <FaSquare className="text-white" />,
  };

  const className: Record<TypeAnswerType, string> = {
    default: "w-full h-full grid place-items-center rounded-lg cursor-pointer",
    text: "w-full h-full flex flex-nowrap items-center gap-4 rounded-md cursor-pointer py-6 px-4",
  };

  return (
    <div
      className={`${className[typeAnswer]} ${bgColor}`}
      onClick={() => onClick && onClick(variant)}
    >
      <div className={typeAnswer === "text" ? "text-3xl" : "text-8xl"}>
        {icons[variant]}
      </div>
      {typeAnswer === "text" && (
        <span className="font-semibold text-white text-lg">{textAnsware}</span>
      )}
    </div>
  );
};

export default AnswerBox;
