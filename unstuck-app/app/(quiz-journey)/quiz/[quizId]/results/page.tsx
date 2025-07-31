"use client";

import { useQuizStore } from "@/hooks/use-quiz-store";
import { CircleX, Check } from "lucide-react";

export default function Results() {
  const { quiz, answers } = useQuizStore();

  const correctCount = quiz.questions.reduce((acc, question, index) => {
    return answers[index] === question.answer_index ? acc + 1 : acc;
  }, 0);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Quiz Score</h1>
      <p className="text-xl">
        You got {correctCount} out of {quiz.questions.length} correct.
      </p>

      {quiz.questions.map((q, i) => {
        const isCorrect = answers[i] === q.answer_index;
        return (
          <div key={i} className="border p-4 rounded-lg bg-white space-y-2">
            <div className="flex items-center gap-x-2">
              {isCorrect ? (
                <Check className="text-green-500" />
              ) : (
                <CircleX className="text-red-500" />
              )}
              <span className="font-semibold">
                Question {i + 1}: {q.question}
              </span>
            </div>
            <div className="ml-8">
              <p>Your answer: {q.options[answers[i]] ?? "No answer"}</p>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground">
                  Correct: {q.options[q.answer_index]}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
