"use client";

import { Button } from "@/components/ui/button";
import { useParticipants } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const GameOverPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const { participants } = useParticipants(sessionId as string);

  return (
    <div className="w-full h-screen flex flex-col items-center bg-black">
      <div className="w-full min-h-[76px] bg-white bg-opacity-10 flex justify-center items-center px-8 py-2">
        <p className="font-bold text-white text-4xl">Scoreboard</p>
      </div>
      <div className="w-full max-w-[70%] flex flex-col items-center pt-[150px]">
        <h3 className="font-bold text-white text-4xl text-center mb-8">
          Top 5
        </h3>
        <div className="w-full h-auto flex flex-col gap-6">
          {participants
            ?.slice()
            .sort((a: any, b: any) => b.score - a.score)
            .map((participant: any) => (
              <div className="bg-white flex justify-between px-6 py-4 rounded-sm font-bold text-black text-xl">
                <p>{participant?.nickname}</p>
                <p>{Math.round(participant?.score)}</p>
              </div>
            ))}
        </div>
        <Button
          variant="secondary"
          className="w-fit font-bold text-black px-6 rounded-sm mt-8"
          onClick={() => router.push(`/admin`)}
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default GameOverPage;
