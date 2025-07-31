import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion } from "@/contracts/quiz";

interface QuizState {
  creatingQuiz: boolean;
  setCreatingQuiz: (creating: boolean) => void;
  quiz: { quizId: string; questions: QuizQuestion[] };
  setQuiz: (quiz: { quizId: string; questions: QuizQuestion[] }) => void;
  updateQuestionText: (index: number, newText: string) => void;
  updateOptionText: (qIndex: number, oIndex: number, newText: string) => void;
  reset: () => void;
  answers: number[];
  chooseAnswer: (questionIndex: number, optionIndex: number) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      creatingQuiz: false,
      setCreatingQuiz: (creating) => set({ creatingQuiz: creating }),
      quiz: { quizId: "", questions: [] },
      answers: [],
      setQuiz: (quiz) => set({ quiz, answers: [] }),
      updateQuestionText: (index, newText) =>
        set((state) => {
          const updated = [...state.quiz.questions];
          updated[index].question = newText;
          return {
            quiz: {
              ...state.quiz,
              questions: updated,
            },
          };
        }),
      updateOptionText: (qIndex, oIndex, newText) =>
        set((state) => {
          const updated = [...state.quiz.questions];
          updated[qIndex].options[oIndex] = newText;
          return {
            quiz: {
              ...state.quiz,
              questions: updated,
            },
          };
        }),
      chooseAnswer: (questionIndex, optionIndex) =>
        set((state) => {
          const updated = [...state.answers];
          updated[questionIndex] = optionIndex;
          return { answers: updated };
        }),
      reset: () => set({ quiz: { quizId: "", questions: [] } }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
