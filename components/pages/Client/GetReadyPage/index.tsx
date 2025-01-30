"use client";

import React, { useEffect, useState } from "react";

const GetReadyPage = () => {
  const [countDown, setCountDown] = useState(5);
  const [status, setStatus] = useState<"Ready..." | "Set..." | "Go!">(
    "Ready..."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer); // Hentikan timer ketika countdown selesai
          return 0;
        }
      });
    }, 1000); // Interval 1 detik

    return () => clearInterval(timer); // Membersihkan timer saat komponen dilepas
  }, []);

  useEffect(() => {
    if (countDown > 3) setStatus("Ready...");
    else if (countDown > 2) setStatus("Set...");
    else if (countDown > 1) setStatus("Go!");
  }, [countDown]);

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
