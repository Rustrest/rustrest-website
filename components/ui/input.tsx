import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-brand",
        className
      )}
      {...props}
    />
  );
}
