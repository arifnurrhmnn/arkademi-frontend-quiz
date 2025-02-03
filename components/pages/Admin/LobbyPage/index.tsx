"use client";

import { Button } from "@/components/ui/button";
import { startQuiz } from "@/lib/firebase/action";
import { useParticipants, useSession } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const LobbyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const { session } = useSession(sessionId as string);
  const { participants } = useParticipants(sessionId as string);

  const handleStartQuiz = async () => {
    await startQuiz(sessionId as string);
    router.push(`/admin/getready?id=${sessionId}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between gap-6 bg-black py-20">
      <div className="w-auto h-auto bg-white rounded-xl py-2 px-4">
        <p className="font-bold text-base">Quiz PIN:</p>
        <h1 className="font-bold text-6xl">{session?.pin}</h1>
      </div>
      <div className="flex-grow w-full max-w-[500px] py-[100px]">
        <p className="font-bold text-white text-lg text-center mb-6">
          {participants?.length} Players
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {participants.map((participant: any) => (
            <div
              key={participant?.id}
              className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm"
            >
              {participant?.nickname}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleStartQuiz}
        variant="secondary"
        className="!bg-white font-bold text-lg py-6 px-16 rounded-sm"
        disabled={session?.status !== "waiting"}
      >
        Start
      </Button>
    </div>
  );
};

export default LobbyPage;
