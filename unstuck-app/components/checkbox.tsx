import { cn } from "@/lib/utils";

export function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "size-5 rounded-full flex items-center justify-center",
        checked ? "bg-primary" : "bg-[#D9D9D9]"
      )}
    >
      <div className="size-3 rounded-full bg-white"></div>
    </div>
  );
}
