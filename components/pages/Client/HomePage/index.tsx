"use client";

import FormStart from "@/components/moleculs/FormStart/index";
import { checkSession } from "@/lib/firebase/action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitted PIN:", pin);
    setLoading(true);
    try {
      const sessionId = await checkSession(pin);
      router.push(`/join?pin=${pin}`);
    } catch (error) {
      alert("Invalid PIN or error joining session");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-16">Arkademi Quiz</h1>
      <FormStart
        placeholder="Quiz PIN"
        textBtn="Enter"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
