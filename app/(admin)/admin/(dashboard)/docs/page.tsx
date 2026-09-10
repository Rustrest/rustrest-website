import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { sortedDocs } from "@/lib/data/docs";
import type { DocPage } from "@/types";

const columns: DataTableColumn<DocPage>[] = [
  {
    header: "Title",
    cell: (doc) => (
      <Link href={`/admin/docs/${doc.id}`} className="hover:text-brand">
        {doc.title}
      </Link>
    ),
  },
  { header: "Slug", cell: (doc) => doc.slug },
  { header: "Order", cell: (doc) => doc.order },
];

export default function AdminDocsListPage() {
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
      <DataTable columns={columns} rows={sortedDocs()} />
    </div>
  );
}
