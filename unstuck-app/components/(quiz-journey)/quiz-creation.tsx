import { QuizQuestion } from "@/contracts/quiz";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function QuizCreation({ quiz }: { quiz: QuizQuestion[] }) {
  function handleBack() {

  }

  return (
    <div className="min-h-svh flex flex-col w-full items-center md:p-8 justify-start gap-y-4">
      <div className="flex w-full items-center justify-start">
        <Button onClick={handleBack} variant="ghost" className="text-sm font-semibold text-primary">
          <ChevronLeft className="size-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col space-y-6 w-full items-center justify-center max-w-[700px]">
        <div className="flex items-center mb-2">
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

        {quiz.map((q, i) => <div key={i} className="w-full p-5 border bg-white border-input flex flex-col gap-y-6 items-start justify-start rounded-xl">
          <span className="text-sm font-medium">Question {i + 1}</span>

          <div className="border-input bg-[#98989814] p-5 rounded-xl w-full">
            <span className="font-medium">{q.question}</span>
          </div>

          <Separator />

          <span className="text-sm font-medium">Multichoice Answers</span>

          <div className="space-y-1 w-full">
            {q.options.map((opt, j) => <div key={j} className="flex items-center justify-start gap-2">
              <span className="text-sm font-medium min-w-16">Option {j + 1}:</span>

              <div className="bg-[#F8F8F9] rounded-xl p-4 w-full flex items-center justify-start">
                <span>{opt}</span>
              </div>
            </div>)}
          </div>
        </div>)}
      </div>
    </div>
  );
}
