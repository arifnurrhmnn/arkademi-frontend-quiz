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
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!pin || typeof pin !== "string") return;

    setLoading(true);
    setError("");

    try {
      const { sessionId } = await joinSession(pin, nickname);
      router.push(`/instructions?id=${sessionId}`);
    } catch (err) {
      setError("Failed to join session. Check PIN or try again.");
    } finally {
      setLoading(false);
    }
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
