import { useMemo } from "react";

interface Participant {
  answers: {
    [questionIndex: string]: {
      answerIndex: number;
    };
  };
  id: string;
  joineAt: string;
  nickname: string;
  score: number;
}

interface QuizQuestion {
  options: string[];
  correctIndex: number;
}

interface QuestionStats {
  totalParticipants: number;
  answeredCount: number;
  answerDistribution: Record<number, number>;
  correctAnswer: {
    index: number;
    text: string;
  };
}

export const useQuestionStats = (
  participants: Participant[],
  currentQuestionIndex: number,
  question?: QuizQuestion
): QuestionStats => {
  return useMemo(() => {
    const totalParticipants = participants.length;

    // Hitung yang sudah menjawab
    const answeredCount = participants.filter(
      (p) => p.answers[currentQuestionIndex] !== undefined
    ).length;

    // Hitung distribusi jawaban
    const answerDistribution = participants.reduce((acc, p) => {
      const answer = p.answers[currentQuestionIndex]?.answerIndex;
      if (typeof answer === "number") {
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    // Dapatkan jawaban benar
    const correctAnswer = {
      index: question?.correctIndex ?? -1,
      text: question?.options[question?.correctIndex] || "",
    };

    return {
      totalParticipants,
      answeredCount,
      answerDistribution,
      correctAnswer,
    };
  }, [participants, currentQuestionIndex, question]);
};
