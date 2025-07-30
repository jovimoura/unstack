import Image from "next/image";

interface QuizLoadingProps {
  title: string;
  description: string;
}

export function QuizLoading({ title, description }: QuizLoadingProps) {
  return (
    <div className="flex flex-col gap-10">
      <Image src="/file-loading.svg" width={446} height={200} alt="loading" />

      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-medium">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  )
}