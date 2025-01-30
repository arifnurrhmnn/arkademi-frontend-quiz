import { Button } from "@/components/ui/button";
import React from "react";

const GameOverPage = () => {
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
          <div className="bg-white flex justify-between px-6 py-4 rounded-sm font-bold text-black text-xl">
            <p>Jack Berwin</p>
            <p>3000</p>
          </div>
          <div className="bg-white flex justify-between px-6 py-4 rounded-sm font-bold text-black text-xl">
            <p>Fauzan</p>
            <p>2890</p>
          </div>
          <div className="bg-white flex justify-between px-6 py-4 rounded-sm font-bold text-black text-xl">
            <p>Naufal</p>
            <p>2678</p>
          </div>
          <div className="bg-white flex justify-between px-6 py-4 rounded-sm font-bold text-black text-xl">
            <p>Fandy</p>
            <p>2114</p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-fit font-bold text-black px-6 rounded-sm mt-8"
        >
          Exit
        </Button>
      </div>
    </div>
  );
};

export default GameOverPage;
