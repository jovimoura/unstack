import { Quiz } from "@/components/(quiz-journey)/quiz";

interface QuizByIdParams {
  params: { quizId: string };
}

export const dynamic = "force-dynamic";

export default async function QuizById({
  params: { quizId },
}: QuizByIdParams) {
  return (
    <Quiz
      quizId={quizId}
    />
  );
}
