import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer_index: number;
};

type QuizStore = {
  quiz: QuizQuestion[] | null;
  setQuiz: (data: QuizQuestion[]) => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quiz: null,
      setQuiz: (data) => set({ quiz: data }),
      resetQuiz: () => set({ quiz: null }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
