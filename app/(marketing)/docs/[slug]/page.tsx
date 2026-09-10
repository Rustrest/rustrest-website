import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllDocs, getAdjacentDocs } from "@/lib/docs";
import { MarkdownContent } from "@/components/markdown/markdown-content";

export const dynamic = "force-dynamic";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const docs = await getAllDocs();
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const { prev, next } = getAdjacentDocs(docs, slug);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{doc.title}</h1>
      <MarkdownContent content={doc.content} className="mt-4" />

      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="flex min-w-0 items-center gap-1 text-muted hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="flex min-w-0 items-center gap-1 text-muted hover:text-foreground sm:justify-end"
          >
            <span className="truncate">{next.title}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
