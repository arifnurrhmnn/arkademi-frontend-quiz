"use client";
import Box from "@/components/atoms/Box/index";
import PageTemplate from "@/components/templates/PageTemplate/index";
import { db } from "@/lib/firebase";
import {
  calculateTotalScore,
  getParticipantResults,
  getSingleQuestionResult,
} from "@/lib/firebase/action";
import { useCurrentQuestion, useSession } from "@/lib/firebase/hooks";
import { doc, getDoc } from "@firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";

// Definisikan tipe untuk props
interface AnswerResultPageProps {
  resultStatus: "correct" | "incorrect" | "timesUp";
}

interface QuestionResult {
  isCorrect: boolean; // Apakah jawaban benar
  participantAnswer: number | null; // Jawaban peserta (null jika belum jawab)
  correctAnswer: number; // Jawaban benar dari quiz
  score: number; // 0 atau 1
}

const AnswerResultPage: React.FC<AnswerResultPageProps> = ({
  resultStatus,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id") as string;
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentQuestionIndex } = useCurrentQuestion(sessionId);
  const participantId = localStorage.getItem("participantId") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil data peserta
        const participantDoc = await getDoc(
          doc(db, `sessions/${sessionId}/participants/${participantId}`)
        );
        const participantData = participantDoc.data();

        // 2. Ambil data quiz
        const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
        const quizId = sessionDoc.data()?.quizId;
        const quizDoc = await getDoc(doc(db, "quizzes", quizId));
        const quizData = quizDoc.data();

        // 3. Proses hasil
        const questionResult = getSingleQuestionResult(
          participantData?.answers || {},
          currentQuestionIndex,
          quizData?.questions || []
        );

        setResult(questionResult);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, participantId, currentQuestionIndex]);

  console.log(result, totalScore);

  return (
    <PageTemplate className="bg-black">
      <div className="answer-result w-full h-screen flex flex-col items-center justify-center">
        <h3 className="font-bold text-white text-4xl mb-4">
          {resultStatus === "correct"
            ? "Correct!"
            : resultStatus === "incorrect"
            ? "Incorrect!"
            : resultStatus === "timesUp"
            ? "Time's Up!"
            : ""}
        </h3>
        <>
          {resultStatus === "correct" && (
            <RiCheckboxCircleFill className="text-7xl text-green-600 border-[4px] border-green-600 rounded-full" />
          )}
          {(resultStatus === "incorrect" || resultStatus === "timesUp") && (
            <RiCloseCircleFill className="text-7xl text-red-600 border-[4px] border-red-600 rounded-full" />
          )}
        </>
        <Box className="font-bold bg-white bg-opacity-20 text-white py-2 px-8 mt-12 rounded-sm">
          +150
        </Box>
      </div>
    </PageTemplate>
  );
};

export default AnswerResultPage;
