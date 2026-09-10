import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { changelogEntries } from "@/lib/data/changelog";
import type { ChangelogEntry } from "@/types";

const columns: DataTableColumn<ChangelogEntry>[] = [
  { header: "Version", cell: (entry) => entry.version },
  { header: "Title", cell: (entry) => entry.title },
  { header: "Tag", cell: (entry) => <Badge>{entry.tag}</Badge> },
  { header: "Published", cell: (entry) => entry.publishedAt },
];

export default function AdminChangelogPage() {
  return (
    <div>
      <PageHeader
        title="Changelog"
        action={
          <Link href="/admin/changelog/new">
            <Button size="sm">New entry</Button>
          </Link>
        }
      />
      <DataTable columns={columns} rows={changelogEntries} />
    </div>
  );
}
