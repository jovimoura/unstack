import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className }: Props) {
  return (
    <Link
      href={href || "/"}
      className={cn(
        "btn btn-ghost normal-case text-xl justify-center  flex items-center",
        className
      )}
    >
      <Image src="/logo.svg" width={40} height={40} alt="logo" className="size-6 md:size-10" />
      <h1 className={cn("text-xl md:text-4xl font-semibold ml-2 md:ml-3.5")}>
        Unstuck Quiz Generator
      </h1>
    </Link>
  );
}
