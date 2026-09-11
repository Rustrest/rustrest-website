"use client";

import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import type { Visit } from "@/types";

export function AdminVisitsTable({ visits }: { visits: Visit[] }) {
  const router = useRouter();

  async function handleDelete(visit: Visit) {
    await fetch(`/api/visits/${visit.id}`, { method: "DELETE" });
    router.refresh();
  }

  const columns: DataTableColumn<Visit>[] = [
    { header: "IP", cell: (visit) => visit.ip },
    { header: "Country", cell: (visit) => visit.country ?? "—" },
    {
      header: "Region / City",
      cell: (visit) => [visit.region, visit.city].filter(Boolean).join(", ") || "—",
    },
    { header: "Path", cell: (visit) => visit.path },
    { header: "Visited", cell: (visit) => new Date(visit.createdAt).toLocaleString() },
    {
      header: "",
      cell: (visit) => <ConfirmDeleteButton onConfirm={() => handleDelete(visit)} />,
    },
  ];

  return <DataTable columns={columns} rows={visits} />;
}
