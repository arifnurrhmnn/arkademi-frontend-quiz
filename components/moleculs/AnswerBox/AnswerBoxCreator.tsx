import CustomInput from "@/components/atoms/CustomInput";
import React, { JSX } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaDiamond, FaSquare } from "react-icons/fa6";

type VariantType = `${string}`;
type TypeAnswerType = "default" | "text";

const AnswerBoxCreator = ({
  variant,
  typeAnswer = "default",
  textAnsware,
  onClick,
  correctAnswer,
  setOptions,
}: {
  variant: VariantType;
  typeAnswer?: TypeAnswerType;
  textAnsware: string;
  onClick?: (e: string) => void;
  correctAnswer?: string; // Bisa string bebas atau salah satu dari "0"|"1"|"2"|"3"
  setOptions: (value: string) => void;
}) => {
  const iconColors: Record<VariantType, string> = {
    "0": "text-red-600",
    "1": "text-blue-600",
    "2": "text-yellow-600",
    "3": "text-green-600",
  };

  // Cek apakah correctAnswer adalah nilai yang valid ("0"|"1"|"2"|"3")
  const isValidCorrectAnswer = ["0", "1", "2", "3"].includes(
    correctAnswer || ""
  );

  // Jika correctAnswer valid, tambahkan opacity-50 ke jawaban yang salah
  const isIncorrect = isValidCorrectAnswer && correctAnswer !== variant;

  // Mapping ikon
  const icons: Record<VariantType, JSX.Element> = {
    "0": <BsTriangleFill className={iconColors[variant]} />,
    "1": <FaDiamond className={iconColors[variant]} />,
    "2": <FaCircle className={iconColors[variant]} />,
    "3": <FaSquare className={iconColors[variant]} />,
  };

  const className: Record<TypeAnswerType, string> = {
    default: "w-full h-full grid place-items-center rounded-lg",
    text: "w-full h-full flex flex-nowrap items-center gap-4 rounded-md py-6 px-4",
  };

  return (
    <div className={`${className[typeAnswer]} bg-white`}>
      <div className={typeAnswer === "text" ? "text-3xl" : "text-8xl"}>
        {icons[variant]}
      </div>
      <CustomInput
        className="font-semibold text-dark text-lg"
        placeholder={`Add Answer ${parseInt(variant) + 1}`}
        textContent={textAnsware}
        setTextContent={setOptions}
      />
    </div>
  );
};

export default AnswerBoxCreator;
