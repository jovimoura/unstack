import { FileUploadInput } from "@/components/file-upload-input";
import { Logo } from "@/components/ui/logo";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col w-full items-center justify-center gap-y-4">
      <div className="flex flex-col gap-3.5 max-w-[542px] text-center">
        <Logo />
        <p className="text-muted-foreground text-xl">Generate quiz quiz your course materials, or textbooks to help you study faster and smarter.</p>
      </div>
      <FileUploadInput />
    </div>
  );
}
