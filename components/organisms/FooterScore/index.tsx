import Box from "@/components/atoms/Box/index";
import { useParticipant } from "@/lib/firebase/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";

const FooterScore = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;
  const { participant } = useParticipant(sessionId as string);

  return (
    <div className="w-full flex items-center justify-between bg-white py-3 px-8">
      <p className="font-bold">{participant?.nickname}</p>
      <Box className="font-semibold bg-black text-white py-1 px-6 rounded-sm">
        {Math.round(participant?.score || 0)}
      </Box>
    </div>
  );
};

export default FooterScore;
