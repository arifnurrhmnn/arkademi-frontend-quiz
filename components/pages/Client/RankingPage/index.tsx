import Image from "next/image";
import React from "react";
import IconTrophy from "./trophy-star.png";

const RankingPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-8">Jack Berwin</h1>
      <Image src={IconTrophy} alt="" className="mb-4" />
      <p className="font-semibold text-white text-base mb-2">- 3839 points -</p>
      <p className="font-bold text-white text-2xl">First Place!</p>
    </div>
  );
};

export default RankingPage;
