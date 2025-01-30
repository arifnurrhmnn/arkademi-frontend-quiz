import { Button } from "@/components/ui/button";
import React from "react";

const LobbyPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between gap-6 bg-black py-20">
      <div className="w-auto h-auto bg-white rounded-xl py-2 px-4">
        <p className="font-bold text-base">Quiz PIN:</p>
        <h1 className="font-bold text-6xl">789902</h1>
      </div>
      <div className="flex-grow w-full max-w-[500px] py-[100px]">
        <p className="font-bold text-white text-lg text-center mb-6">
          4 Players
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm">
            Fauzan
          </div>
          <div className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm">
            Fandi
          </div>
          <div className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm">
            Listyo
          </div>
          <div className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm">
            Arif
          </div>
          <div className="bg-white bg-opacity-70 font-bold text-black text-lg px-6 py-1 rounded-sm">
            Naufal
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        className="!bg-white font-bold text-lg py-6 px-16 rounded-sm"
      >
        Start
      </Button>
    </div>
  );
};

export default LobbyPage;
