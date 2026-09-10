import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { docs, getAdjacentDocs } from "@/lib/data/docs";
import { MarkdownContent } from "@/components/markdown/markdown-content";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{doc.title}</h1>
      <MarkdownContent content={doc.content} className="mt-4" />

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="flex items-center gap-1 text-muted hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="flex items-center gap-1 text-muted hover:text-foreground"
          >
            {next.title}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
