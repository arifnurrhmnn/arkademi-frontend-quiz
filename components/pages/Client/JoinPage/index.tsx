"use client";
import FormStart from "@/components/moleculs/FormStart/index";
import { joinSession } from "@/lib/firebase/action";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const JoinPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pin = searchParams.get("pin") as string;
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("pin", pin, nickname);
      const { sessionId } = await joinSession(pin, nickname);
      router.push(`/getready?id=${sessionId}`);
    } catch (error) {
      alert("Invalid PIN or error joining session");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="font-bold text-white text-4xl mb-16">Arkademi Quiz</h1>
      <FormStart
        placeholder="Nickname"
        textBtn="OK, go!"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default JoinPage;
