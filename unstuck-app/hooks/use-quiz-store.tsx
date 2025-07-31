import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion } from "@/contracts/quiz";

interface QuizState {
  quiz: {quizId: string, questions: QuizQuestion[]};
  setQuiz: (quiz: {quizId: string, questions: QuizQuestion[]}) => void;
  updateQuestionText: (index: number, newText: string) => void;
  updateOptionText: (qIndex: number, oIndex: number, newText: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quiz: { quizId: "", questions: [] },
      setQuiz: (quiz) => set({ quiz }),
      updateQuestionText: (index, newText) =>
        set((state) => {
          const updated = [...state.quiz.questions];
          updated[index].question = newText;
          return { quiz: {
            ...state.quiz,
            questions: updated
          } };
        }),
      updateOptionText: (qIndex, oIndex, newText) =>
        set((state) => {
          const updated = [...state.quiz.questions];
          updated[qIndex].options[oIndex] = newText;
          return { quiz: {
            ...state.quiz,
            questions: updated
          } };
        }),
      reset: () => set({ quiz: { quizId: "", questions: [] } }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
