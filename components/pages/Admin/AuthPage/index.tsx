import FormStart from "@/components/moleculs/FormStart";
import React from "react";

const AuthenticationPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-16">Arkademi Quiz</h1>
      <FormStart placeholder="Admin PIN" textBtn="Enter" />
    </div>
  );
};

export default AuthenticationPage;
