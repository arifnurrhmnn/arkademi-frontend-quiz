import React, { JSX } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaDiamond, FaSquare } from "react-icons/fa6";

type VariantType = "a" | "b" | "c" | "d";

const AnswerBox = ({ variant }: { variant: VariantType }) => {
  // Mapping for background colors
  const bgColors: Record<VariantType, string> = {
    a: "bg-red-700 hover:bg-red-800",
    b: "bg-blue-700 hover:bg-blue -800",
    c: "bg-yellow-700 hover:bg-yellow-800",
    d: "bg-green-700 hover:bg-green-800",
  };

  // Mapping for icons
  const icons: Record<VariantType, JSX.Element> = {
    a: <BsTriangleFill className="text-8xl text-white" />,
    b: <FaDiamond className="text-8xl text-white" />,
    c: <FaCircle className="text-8xl text-white" />,
    d: <FaSquare className="text-8xl text-white" />,
  };

  return (
    <div
      className={`w-full h-full grid place-items-center rounded-lg cursor-pointer ${bgColors[variant]}`}
    >
      {icons[variant]}
    </div>
  );
};

export default AnswerBox;
