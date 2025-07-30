import { QuizLoading } from "./quiz-loading"

export function QuizGenerator({ quizId }: { quizId: string }) {
  const loading = true
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-svh">
        <QuizLoading title="Generating Quiz Questions" description="Reading your materials..." />
      </div>
    )
  }

  return (
    <div className="">
      <h1 className="font-bold">quiz generator</h1>
    </div>
  )
}