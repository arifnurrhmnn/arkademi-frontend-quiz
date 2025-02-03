"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GetReadyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    if (countDown === 0) {
      router.push(`/gameblock?id=${sessionId}`);
      return;
    }

    const timer = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown, router, sessionId]);

  const status = countDown > 3 ? "Ready..." : countDown > 2 ? "Set..." : "Go!";

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h2 className="font-bold text-white text-4xl mb-6 border-c">
        Question 1
      </h2>
      <div className="box-countdown w-16 h-16 flex justify-center items-center rounded-full bg-white mb-8">
        <p className="font-bold text-dark text-4xl p-0">{countDown}</p>
      </div>
      <p className="font-semibold text-white text-xl">{status}</p>
    </div>
  );
};

export default GetReadyPage;
