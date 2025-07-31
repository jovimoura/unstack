import { cn } from "@/lib/utils";

export function CheckBox({ checked, bgColor = "bg-primary" }: { checked: boolean, bgColor?: string }) {
  return (
    <div
      className={cn(
        "size-5 rounded-full flex items-center justify-center",
        checked ? bgColor : "bg-[#D9D9D9]"
      )}
    >
      <div className="size-3 rounded-full bg-white"></div>
    </div>
  );
}
