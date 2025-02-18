"use client";

import { db } from "@/lib/firebase";
import { useParticipant, useSession } from "@/lib/firebase/hooks";
import { doc, getDoc } from "@firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconTrophy from "./trophy-star.png";

const RankingPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;
  const { participant } = useParticipant(sessionId as string);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-8">
        {participant?.nickname}
      </h1>
      <Image src={IconTrophy} alt="" className="mb-4" />
      <p className="font-semibold text-white text-base mb-1">Score:</p>
      <p className="font-bold text-white text-8xl mb-2">
        {Math.round(participant?.score || 0)}
      </p>
      {/* <p className="font-bold text-white text-2xl">First Place!</p> */}
    </div>
  );
};

export default RankingPage;
