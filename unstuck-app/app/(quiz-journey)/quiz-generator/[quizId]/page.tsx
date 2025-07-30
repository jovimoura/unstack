import { QuizGenerator } from "@/components/(quiz-journey)/quiz-generator";

interface QuizGeneratorByIdParams {
  params: { quizId: string };
}

export const dynamic = "force-dynamic";

export default async function QuizGeneratorById({
  params: { quizId },
}: QuizGeneratorByIdParams) {
  return (
    <QuizGenerator
      quizId={quizId}
    />
  );
}
