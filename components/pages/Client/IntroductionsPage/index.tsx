"use client";

import { useSession } from "@/lib/firebase/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const IntroductionsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const { session } = useSession(sessionId as string);

  useEffect(() => {
    if (session?.status == "started") {
      router.push(`/getready?id=${sessionId}`);
    }
  }, [session]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h2 className="font-bold text-white text-4xl mb-6">You're In!</h2>
      <p className="font-bold text-white text-xl">
        See your nickname on screen?
      </p>
    </div>
  );
};

export default IntroductionsPage;
