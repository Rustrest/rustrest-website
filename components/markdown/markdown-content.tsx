import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/markdown/code-block";

export function MarkdownContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
        "prose-a:text-brand prose-code:text-brand prose-blockquote:text-muted prose-li:text-foreground",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-pre:text-inherit",
        "prose-img:rounded-lg prose-img:border prose-img:border-border",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ pre: CodeBlock }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
