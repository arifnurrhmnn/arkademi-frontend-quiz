"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";

interface Quiz {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  currentQuestionId: string;
  pin: number;
  status: string;
}

const LobbyPage = () => {
  const subscribeToQuiz = (quizId: string) => {
    const quizDocRef = doc(db, "quizzes", quizId);

    const unsubscribe = onSnapshot(quizDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const quiz = { id: docSnap.id, ...docSnap.data() };
        console.log("Real-time Quiz: ", quiz);
      } else {
        console.log("No such document!");
      }
    });

    // Pastikan untuk unsubscribe saat komponen di-unmount
    return unsubscribe;
  };

  useEffect(() => {
    const data = subscribeToQuiz("a7qOMVAJ2To2zcSOFA2L");
    console.log("data", data);
  }, []);

  // const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // useEffect(() => {
  //   const quizzesCollection = collection(db, "quizzes");
  //   const q = query(quizzesCollection);
  //   console.log("dataq", q);

  //   // Mendapatkan data secara real-time
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const quizzesData: Quiz[] = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Quiz[];
  //     console.log("quizzes", quizzesData);
  //     setQuizzes(quizzesData);
  //   });

  //   // Membersihkan listener saat komponen di-unmount
  //   return () => unsubscribe();
  // }, []);

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
