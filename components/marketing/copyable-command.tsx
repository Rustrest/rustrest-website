"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyableCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2",
        className
      )}
    >
      <code className="command-scrollbar block flex-1 overflow-x-auto whitespace-pre pb-1 text-xs text-foreground">
        {command}
      </code>
      <button
        onClick={handleCopy}
        aria-label="Copy command"
        className="shrink-0 text-muted hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
