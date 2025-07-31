"use client";

import {
  AlertCircleIcon,
  PaperclipIcon,
  Sparkles,
  XIcon,
} from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuizStore } from "@/hooks/use-quiz-store";
import { QuizLoading } from "./(quiz-journey)/quiz-loading";

export function FileUploadInput() {
  const maxSize = 10 * 1024 * 1024; // 10MB default
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const setCreatingQuiz = useQuizStore((state) => state.setCreatingQuiz);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
  });

  const file = files[0];

  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if ('file' in file && file.file instanceof File) {
        formData.append("file", file.file);
      } else {
        throw new Error("Invalid file type");
      }
      formData.append("file", file.file);
      setCreatingQuiz(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-quiz/`, {
        method: "POST",
        body: formData,
      });
    
      if (!res.ok) throw new Error("Failed to generate quiz");
      
      const data = await res.json();
      // console.log('JSON QUIZ', data);
      return {questions: data.questions, quizId: data.quizId};
    },
    onSuccess: (questions) => {
      setQuiz(questions);
      setCreatingQuiz(false);
      queryClient.invalidateQueries({ queryKey: ["pdf"] });
    },
    onError: (error) => {
      setCreatingQuiz(false);
      console.error("Send pdf error", error);
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-svh">
        <QuizLoading
          title="Generating Quiz Questions"
          description="Reading your materials..."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-3xl w-full max-w-[700px] h-[400px]">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input cursor-pointer bg-white hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] w-full h-full"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
          disabled={Boolean(file)}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <Image
            alt="file icon"
            src="/file-icon.svg"
            width={94}
            height={74}
            className="mb-8"
          />
          <p className="mb-1.5 text-base md:text-xl text-muted-foreground">
            <span className="text-primary font-semibold">Click to upload</span>{" "}
            or drag and drop files
          </p>
          <p className="text-muted-foreground text-sm md:text-base">
            Drop Course Materials and start generating - for{" "}
            <span className="font-semibold">FREE</span>
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon
                className="size-4 shrink-0 opacity-60"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">
                  {file.file.name}
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="w-full flex items-center justify-end">
            <Button onClick={() => mutate()} disabled={isLoading} className="cursor-pointer">Generate Quiz <Sparkles /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
