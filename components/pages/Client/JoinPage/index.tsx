import FormStart from "@/components/moleculs/FormStart/index";
import React from "react";

const JoinPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-16">Arkademi Quiz</h1>
      <FormStart placeholder="Nickname" textBtn="OK, go!" />
    </div>
  );
};

export default JoinPage;
