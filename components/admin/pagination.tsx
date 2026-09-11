import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Builds the compact page-number sequence, e.g. [1, "…", 4, 5, 6, "…", 20]
function getPageNumbers(page: number, totalPages: number): (number | "…")[] {
  const siblings = 1;
  const pages: (number | "…")[] = [];

  const start = Math.max(2, page - siblings);
  const end = Math.min(totalPages - 1, page + siblings);

  pages.push(1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("…");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const atStart = page <= 1;
  const atEnd = page >= totalPages;
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="mt-4 flex items-center justify-between gap-2 text-sm">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={atStart}
        className={cn(
          "flex items-center gap-1 rounded-md border border-border px-3 py-1.5",
          atStart ? "pointer-events-none opacity-40" : "text-foreground hover:bg-surface"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pageNumbers.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "min-w-8 rounded-md border px-2.5 py-1.5 text-center",
                p === page
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:bg-surface"
              )}
            >
              {p}
            </Link>
          )
        )}
      </div>

      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={atEnd}
        className={cn(
          "flex items-center gap-1 rounded-md border border-border px-3 py-1.5",
          atEnd ? "pointer-events-none opacity-40" : "text-foreground hover:bg-surface"
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
