"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import type { DocPage } from "@/types";

export function AdminDocsTable({ docs }: { docs: DocPage[] }) {
  const router = useRouter();

  async function handleDelete(doc: DocPage) {
    await fetch(`/api/docs/${doc.id}`, { method: "DELETE" });
    router.refresh();
  }

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
    {
      header: "",
      cell: (doc) => <ConfirmDeleteButton onConfirm={() => handleDelete(doc)} />,
    },
  ];

  return <DataTable columns={columns} rows={docs} />;
}
