"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { DocPage } from "@/types";

function DocsNavLinks({ docs, onNavigate }: { docs: DocPage[]; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 text-sm">
      {docs.map((doc) => {
        const href = `/docs/${doc.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={doc.slug}
            href={href}
            onClick={onNavigate}
            className={`block rounded-md border-l-2 px-3 py-2 transition-colors ${
              active
                ? "border-brand bg-surface font-medium text-foreground"
                : "border-transparent text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function DocsSidebar({ docs }: { docs: DocPage[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: toggle button + slide-in drawer */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground"
        >
          <Menu className="h-4 w-4" />
          Docs menu
        </button>

        {open && (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[80vw] overflow-y-auto border-r border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Docs</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4">
                <DocsNavLinks docs={docs} onNavigate={() => setOpen(false)} />
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Desktop: static sidebar */}
      <aside className="hidden shrink-0 md:block md:w-48">
        <DocsNavLinks docs={docs} />
      </aside>
    </>
  );
}
