"use client";

import { QuizLoading } from "@/components/(quiz-journey)/quiz-loading";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Share,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQuizStore } from "@/hooks/use-quiz-store";
import { useEffect, useState } from "react";
import { CheckBox } from "@/components/checkbox";
import { useRouter } from "next/navigation";

export default function Results() {
  const { quiz, answers, reset } = useQuizStore();
  const router = useRouter();
  const [answerOpen, setAnswerOpen] = useState<number[]>([]);

  const correctCount = quiz.questions.reduce((acc, question, index) => {
    return answers[index] === question.answer_index ? acc + 1 : acc;
  }, 0);

  function handleBack() {
    reset();
    router.push("/");
  }

  function handleAnswerOpen(index: number) {
    if (answerOpen.includes(index)) {
      setAnswerOpen(answerOpen.filter((i) => i !== index));
    } else {
      setAnswerOpen([...answerOpen, index]);
    }
  }

  const total = quiz.questions.length;
  const correctPercentage = (correctCount / total) * 100;
  const incorrectPercentage = 100 - correctPercentage;

  return (
    <div className="min-h-svh flex flex-col w-full items-start p-4 md:p-8 justify-start gap-y-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-start text-[#6E6B7B] gap-x-1 md:gap-x-2">
          <Button onClick={handleBack} variant="ghost" className="cursor-pointer" size="icon">
            <ChevronLeft className="size-5 md:size-7" />
          </Button>
          <div className="flex items-center gap-x-2">
            <Image
              src="/file-pdf-icon.svg"
              alt="file"
              width={24}
              height={24}
              className="size-6"
            />

            <span className="font-semibold text-lg md:text-2xl">Lorem Ipsum</span>
          </div>
        </div>

        <Button
          className="bg-[#15112B] rounded-xl text-white cursor-pointer md:h-11 hover:bg-[#15112B]/90"
          onClick={() => {}}
          size="default"
        >
          <Zap className="size-4 fill-white" />
          Upgrade
        </Button>
      </div>

      <div className="flex flex-col self-center space-y-6 w-full items-center max-w-[700px]">
        <div className="w-full p-5 border bg-white border-input flex flex-col gap-y-6 items-center justify-start rounded-xl">
          <Image src="/correct-icon.svg" width={70} height={74} alt="check" className="size-10 md:size-[70px]" />

          <span className="font-medium text-lg md:text-2xl max-w-[453px] text-center">
            Great Work Martinelli, you did very good on your quiz.
          </span>

          <span className="font-semibold text-5xl md:text-[56px]">{`${correctCount}/${quiz.questions.length}`}</span>

          <div className="max-w-[450px] w-full flex items-center gap-1">
            <div
              className="h-[10px] bg-[#46CD94] rounded-full"
              style={{ width: `${correctPercentage}%` }}
            />
            <div
              className="h-[10px] bg-[#FF6258] rounded-full"
              style={{ width: `${incorrectPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <div className="size-4 rounded-full bg-[#46CD94]" />
              <span className="text-sm md:text-base text-muted-foreground font-medium">
                Answered Correctly
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="size-4 rounded-full bg-[#FF6258]" />
              <span className="text-sm md:text-base text-muted-foreground font-medium">
                Missed ansers
              </span>
            </div>
          </div>

          <Button
            className="rounded-xl cursor-pointer h-11"
            onClick={() => {}}
            size="default"
          >
            Share results
            <Share className="size-5" />
          </Button>
        </div>

        <div className="w-full flex items-center justify-start">
          <span className="md:text-xl font-medium">Result Summary</span>
        </div>

        {quiz.questions.map((q, i) => {
          const isCorrect = answers[i] === q.answer_index;
          const isOpen = answerOpen.includes(i);
          return (
            <div
              key={i}
              onClick={() => handleAnswerOpen(i)}
              className={cn(
                "border rounded-lg p-5 w-full bg-white flex flex-col gap-4 cursor-pointer transition-all",
                isOpen ? "" : "hover:bg-muted"
              )}
            >
              {isOpen ? (
                <div className="w-full flex flex-col gap-y-6 items-start justify-start rounded-xl">
                  <span className="text-sm font-medium">Question {i + 1}</span>

                  <div className="border-input bg-[#98989814] p-5 rounded-xl w-full">
                    <span className="w-full text-sm md:text-base font-medium bg-transparent outline-none">
                      {q.question}
                    </span>
                  </div>

                  <Separator />

                  <div className="space-y-2 w-full">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-start gap-2"
                      >
                        <div
                          className={cn(
                            "rounded-xl text-sm md:text-base p-4 w-full flex items-center justify-between relative transition-colors bg-[#F8F8F9]",
                            answers[i] === j && j === q.answer_index
                              ? "bg-[#ECFDF1] border border-[#ABEFC6] text-[#28AD75]"
                              : answers[i] === j && j !== q.answer_index
                              ? "bg-[#FF62581F] border border-[#FF6258] text-[#FF6258]"
                              : ""
                          )}
                        >
                          <div className="flex items-center justify-start">
                            <CheckBox
                              checked={answers[i] === j}
                              bgColor={
                                isCorrect ? "bg-[#28AD75]" : "bg-[#FF6258]"
                              }
                            />
                            <span className="ml-2 bg-transparent outline-none">
                              {opt}
                            </span>
                          </div>

                          {answers[i] === j && (
                            <span className="text-sm font-medium">
                              {j === q.answer_index ? "Correct" : "Wrong"} Answer
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full flex items-center justify-between">
                    <span className="font-medium text-sm md:text-base">Question {i + 1}</span>

                    <div
                      className={cn(
                        "border rounded-xl flex items-center p-2 gap-2 text-sm md:text-base",
                        isCorrect
                          ? "bg-[#ECFDF1] border border-[#ABEFC6] text-[#28AD75]"
                          : "bg-[#FF62581F] border border-[#FF6258] text-[#FF6258]"
                      )}
                    >
                      {isCorrect ? (
                        <Check className="size-5" />
                      ) : (
                        <X className="size-5" />
                      )}
                      <span className="text-sm font-medium">
                        {isCorrect ? "Correct" : "Wrong"} Answer
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <span className="text-sm md:text-base">{q.question}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
