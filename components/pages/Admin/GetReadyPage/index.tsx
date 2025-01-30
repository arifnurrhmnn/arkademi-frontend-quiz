"use client";

import React, { useEffect, useState } from "react";

const GetReadyPage = () => {
  const [countDown, setCountDown] = useState(5);

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

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-black">
      <div className="min-h-[76px] flex justify-between items-center px-8 py-2">
        <p className="font-bold text-xl text-white"></p>
        <p className="font-bold text-white text-6xl"></p>
        <p className="font-bold text-xl text-white">1/3 Questions</p>
      </div>
      <div className="flex-grow w-full flex flex-col justify-center items-center gap-20 p-8">
        <h1 className="font-bold text-white text-center text-4xl/normal px-[10%]">
          Apa kepanjangan dari istilah 'IoT' yang sering digunakan dalam dunia
          teknologi?
        </h1>
        <div className="box-countdown w-28 h-28 flex justify-center items-center rounded-full bg-white mb-8">
          <p className="font-bold text-dark text-8xl p-0">{countDown}</p>
        </div>
      </div>
    </div>
  );
};

export default GetReadyPage;
