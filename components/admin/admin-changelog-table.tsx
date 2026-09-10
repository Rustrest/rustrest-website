"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import type { ChangelogEntry } from "@/types";

export function AdminChangelogTable({ entries }: { entries: ChangelogEntry[] }) {
  const router = useRouter();

  async function handleDelete(entry: ChangelogEntry) {
    await fetch(`/api/changelog/${entry.id}`, { method: "DELETE" });
    router.refresh();
  }

  const columns: DataTableColumn<ChangelogEntry>[] = [
    { header: "Version", cell: (entry) => entry.version },
    {
      header: "Title",
      cell: (entry) => (
        <Link href={`/admin/changelog/${entry.id}`} className="hover:text-brand">
          {entry.title}
        </Link>
      ),
    },
    { header: "Tag", cell: (entry) => <Badge>{entry.tag}</Badge> },
    { header: "Published", cell: (entry) => entry.publishedAt },
    {
      header: "",
      cell: (entry) => <ConfirmDeleteButton onConfirm={() => handleDelete(entry)} />,
    },
  ];

  return <DataTable columns={columns} rows={entries} />;
}
