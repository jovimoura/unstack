import { QuizLoading } from "./quiz-loading";

export function Quiz({ quizId }: { quizId: string }) {
  const loading = true;
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-svh">
        <QuizLoading
          title="Preparing Quiz for Practise"
          description="Preparing the quiz so you can now pratice..."
        />
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="font-bold">quiz</h1>
    </div>
  );
}
