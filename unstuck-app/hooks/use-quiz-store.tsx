import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion } from "@/contracts/quiz";

interface QuizState {
  quiz: QuizQuestion[];
  setQuiz: (quiz: QuizQuestion[]) => void;
  updateQuestionText: (index: number, newText: string) => void;
  updateOptionText: (qIndex: number, oIndex: number, newText: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quiz: [],
      setQuiz: (quiz) => set({ quiz }),
      updateQuestionText: (index, newText) =>
        set((state) => {
          const updated = [...state.quiz];
          updated[index].question = newText;
          return { quiz: updated };
        }),
      updateOptionText: (qIndex, oIndex, newText) =>
        set((state) => {
          const updated = [...state.quiz];
          updated[qIndex].options[oIndex] = newText;
          return { quiz: updated };
        }),
      reset: () => set({ quiz: [] }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
