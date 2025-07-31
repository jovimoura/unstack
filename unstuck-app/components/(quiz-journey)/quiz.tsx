"use client";

import { QuizLoading } from "./quiz-loading";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, CircleX, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useQuizStore } from "@/hooks/use-quiz-store";
import { useEffect, useState } from "react";
import { CheckBox } from "../checkbox";
import { useRouter } from "next/navigation";

export function Quiz({ quizId }: { quizId: string }) {
  const router = useRouter();
  const { quiz, chooseAnswer } = useQuizStore();
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [choosedOption, setChoosedOption] = useState<null | number>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(quiz.questions.length).fill(null)
  );

  function handleBack() {
    router.push("/");
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleNext() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setChoosedOption(null);
    }
  }

  function handleFinishQuiz() {
    router.push(`/quiz/${quizId}/results`);
  }

  function handleOptionClick(index: number) {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
    setChoosedOption(index);
    chooseAnswer(currentQuestion, index);
  }

  function renderResult() {
    const selected = answers[currentQuestion];
    if (selected === null) {
      return null;
    } else if (selected === activeQuestion.answer_index) {
      return (
        <div className="bg-[#ECFDF1] border border-[#ABEFC6] rounded-xl flex items-center py-3 px-6 text-[#28AD75] justify-start gap-x-4 w-full">
          <Image src="/correct-icon.svg" width={40} height={40} alt="correct" />
          <span className="font-semibold text-2xl">Correct!</span>
        </div>
      );
    } else {
      return (
        <div className="bg-[#FF62581F] border border-[#FF6258] rounded-xl flex items-center py-3 px-6 text-[#FF6258] justify-start gap-x-4 w-full">
          <CircleX className="size-10 text-white fill-[#FF6258]" />
          <span className="font-semibold text-2xl">Wrong!</span>
        </div>
      );
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingQuiz(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setChoosedOption(answers[currentQuestion]);
  }, [currentQuestion, answers]);

  if (loadingQuiz) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-svh">
        <QuizLoading
          title="Preparing Quiz for Practise"
          description="Preparing the quiz so you can now pratice..."
        />
      </div>
    );
  }

  const activeQuestion = quiz.questions[currentQuestion];

  return (
    <div className="min-h-svh flex flex-col w-full items-start md:p-8 justify-between gap-y-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-start text-[#6E6B7B] gap-x-2">
          <Button onClick={handleBack} variant="ghost" className="" size="icon">
            <ChevronLeft className="size-7" />
          </Button>
          <div className="flex items-center gap-x-2">
            <Image
              src="/file-pdf-icon.svg"
              alt="file"
              width={24}
              height={24}
              className="size-6"
            />

            <span className="font-semibold text-2xl">Lorem Ipsum</span>
          </div>
        </div>

        <Button
          className="bg-[#15112B] rounded-xl text-white cursor-pointer h-11 hover:bg-[#15112B]/90"
          onClick={() => {}}
          size="default"
        >
          <Zap className="size-4 fill-white" />
          Upgrade
        </Button>
      </div>

      <div className="flex flex-col self-center space-y-6 w-full items-center justify-between max-w-[700px]">
        <div className="w-full p-5 border bg-white border-input flex flex-col gap-y-6 items-start justify-start rounded-xl">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1}
          </span>

          <div className="border-input bg-[#98989814] p-5 rounded-xl w-full">
            <span className="w-full font-medium bg-transparent outline-none">
              {activeQuestion.question}
            </span>
          </div>

          <Separator />

          <div className="space-y-2 w-full">
            {activeQuestion.options.map((opt, j) => (
              <div key={j} className="flex items-center justify-start gap-2">
                <div
                  onClick={() => handleOptionClick(j)}
                  className={cn(
                    "rounded-xl p-4 gap-x-2 w-full flex items-center justify-start relative transition-colors",
                    choosedOption === j
                      ? "bg-[#6D56FA14] border border-[#6D56FA33]"
                      : "bg-[#F8F8F9]"
                  )}
                >
                  <CheckBox checked={choosedOption === j} />
                  <span className="w-full bg-transparent outline-none">
                    {opt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderResult()}
      </div>
      <div className="w-full max-w-[700px] self-center flex items-center justify-between">
        <Button
          disabled={currentQuestion === 0}
          onClick={handlePrevious}
          variant="outline"
          className="font-semibold px-5 border-[#6D56FA40] text-primary h-11 rounded-2xl self-center cursor-pointer"
        >
          <ChevronLeft className="size-4" /> Previous
        </Button>
        {currentQuestion === quiz.questions.length - 1 ? (
          <Button
            disabled={answers[currentQuestion] === null}
            onClick={handleFinishQuiz}
            className="font-semibold px-5 h-11 rounded-2xl self-center cursor-pointer"
          >
            Finish
          </Button>
        ) : (
          <Button
            disabled={answers[currentQuestion] === null}
            onClick={handleNext}
            className="font-semibold px-5 h-11 rounded-2xl self-center cursor-pointer"
          >
            Next <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
