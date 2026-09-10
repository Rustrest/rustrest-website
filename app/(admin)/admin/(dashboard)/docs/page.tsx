import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { AdminDocsTable } from "@/components/admin/admin-docs-table";
import { Button } from "@/components/ui/button";
import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-dynamic";

export default async function AdminDocsListPage() {
  const docs = await getAllDocs();

  return (
    <div>
      <PageHeader
        title="Docs"
        action={
          <Link href="/admin/docs/new">
            <Button size="sm">New page</Button>
          </Link>
        }
      />
      <AdminDocsTable docs={docs} />
    </div>
  );
}
