'use client'

import { QuizCreation } from "@/components/(quiz-journey)/quiz-creation";
import { FileUploadInput } from "@/components/file-upload-input";
import { Logo } from "@/components/ui/logo";
import { useQuizStore } from "@/hooks/use-quiz-store";

export default function Home() {
  const quiz = useQuizStore((state) => state.quiz);

  return (
    <div className="min-h-svh flex flex-col w-full items-center justify-center gap-y-4">
      {quiz?.length ? <QuizCreation quiz={quiz} /> : (
        <>
          <div className="flex flex-col gap-3.5 max-w-[542px] text-center">
            <Logo />
            <p className="text-muted-foreground text-xl">Generate quiz quiz your course materials, or textbooks to help you study faster and smarter.</p>
          </div>
          <FileUploadInput />
        </>
      )}
    </div>
  );
}
