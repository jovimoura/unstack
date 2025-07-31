import Image from "next/image";

interface QuizLoadingProps {
  title: string;
  description: string;
}

export function QuizLoading({ title, description }: QuizLoadingProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
      <Image src="/file-loading.svg" width={446} height={200} alt="loading" className="md:w-[446px] w-[250px] md:h-[200px] h-[100px]" />

      <div className="text-center flex flex-col gap-3">
        <h1 className="text-xl md:text-4xl font-medium">{title}</h1>
        <p className="text-muted-foreground text-sm md:text-lg">{description}</p>
      </div>
    </div>
  )
}