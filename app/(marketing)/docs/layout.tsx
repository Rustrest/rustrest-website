import { getAllDocs } from "@/lib/docs";
import { DocsSidebar } from "@/components/marketing/docs-sidebar";

export const dynamic = "force-dynamic";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = await getAllDocs();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:py-20 md:flex-row md:gap-10">
      <DocsSidebar docs={docs} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
