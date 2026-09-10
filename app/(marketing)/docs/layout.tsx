import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-dynamic";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = await getAllDocs();

  return (
    <div className="mx-auto flex max-w-5xl gap-10 px-6 py-20">
      <aside className="w-48 shrink-0">
        <nav className="space-y-1 text-sm">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="block rounded-md px-3 py-1.5 text-muted hover:bg-surface hover:text-foreground"
            >
              {doc.title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
