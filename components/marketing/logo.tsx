import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/site-images/logo.png"
        alt="rustrest logo"
        width={28}
        height={28}
        className="rounded-md"
      />
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-brand">rust</span>
        <span className="text-foreground">rest</span>
      </span>
    </span>
  );
}
