import { Quiz } from "@/components/(quiz-journey)/quiz";

interface QuizByIdParams {
  params: Promise<{ quizId: string }>
}

export default async function QuizById({
  params,
}: QuizByIdParams) {
  const { quizId } = await params;
  return (
    <Quiz
      quizId={quizId}
    />
  );
}
