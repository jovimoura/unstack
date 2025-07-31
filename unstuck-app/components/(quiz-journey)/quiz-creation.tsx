import { QuizQuestion } from "@/contracts/quiz";
import { Button } from "../ui/button";
import { Check, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useQuizStore } from "@/hooks/use-quiz-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function QuizCreation({
  quiz,
}: {
  quiz: { quizId: string; questions: QuizQuestion[] };
}) {
  const router = useRouter();
  const {
    quiz: storedQuiz,
    setQuiz,
    updateQuestionText,
    updateOptionText,
    reset,
  } = useQuizStore();
  const [focusedInput, setFocusedInput] = useState<{
    question?: number;
    option?: string;
  }>({});


  console.log('storedQuiz', storedQuiz);
  if (storedQuiz.questions.length === 0) {
    setQuiz(quiz);
  }

  function handleBack() {
    reset();
    router.refresh();
  }

  function handleStartQuiz() {
    router.push(`/quiz/${quiz.quizId}`);
  }

  return (
    <div className="min-h-svh flex flex-col w-full items-center md:p-8 justify-start gap-y-4">
      <div className="flex w-full items-center justify-start">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="text-sm font-semibold text-primary"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col space-y-6 w-full items-start justify-center max-w-[700px]">
        <div className="flex items-center mb-8">
          <Image
            src="/logo.svg"
            width={40}
            height={40}
            alt="logo"
            className="size-8 md:size-10"
          />
          <h1 className={cn("text-xl md:text-3xl font-medium ml-3.5")}>
            Review & Edit Questions
          </h1>
        </div>

        {storedQuiz.questions.map((q, i) => (
          <div
            key={i}
            className="w-full p-5 border bg-white border-input flex flex-col gap-y-6 items-start justify-start rounded-xl"
          >
            <span className="text-sm font-medium">Question {i + 1}</span>

            <div className="border-input bg-[#98989814] p-5 rounded-xl w-full">
              <input
                className="w-full font-medium bg-transparent outline-none"
                value={q.question}
                onChange={(e) => updateQuestionText(i, e.target.value)}
                onFocus={() => setFocusedInput({ question: i })}
                onBlur={() => setFocusedInput({})}
              />
            </div>

            <Separator />

            <span className="text-sm font-medium">Multichoice Answers</span>

            <div className="space-y-2 w-full">
              {q.options.map((opt, j) => (
                <div key={j} className="flex items-center justify-start gap-2">
                  <span className="text-sm font-medium min-w-16">
                    Option {j + 1}:
                  </span>

                  <div
                    className={cn(
                      "rounded-xl p-4 w-full flex items-center justify-start relative transition-colors",
                      focusedInput.option === `${i}-${j}`
                        ? "bg-[#6D56FA14] border border-[#6D56FA33]"
                        : "bg-[#F8F8F9]"
                    )}
                  >
                    <input
                      type="text"
                      value={opt}
                      className="w-full bg-transparent outline-none"
                      onChange={(e) => updateOptionText(i, j, e.target.value)}
                      onFocus={() => setFocusedInput({ option: `${i}-${j}` })}
                      onBlur={() => setFocusedInput({})}
                    />

                    {q.answer_index === j && (
                      <div className="absolute right-4 top-4 bg-[#ECFDF1] border border-[#ABEFC6] rounded-xl flex items-center p-2 text-[#28AD75]">
                        <Check className="size-4" />
                        <span className="text-xs font-medium">
                          Correct Answer
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button
          onClick={handleStartQuiz}
          className="font-semibold w-[150px] h-11 rounded-2xl self-center cursor-pointer"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
