import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { DocForm } from "@/components/admin/doc-form";
import { docs } from "@/lib/data/docs";

export default async function AdminEditDocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = docs.find((d) => d.id === id);
  if (!doc) notFound();

  return (
    <div>
      <PageHeader title="Edit Doc Page" />
      <DocForm doc={doc} />
    </div>
  );
}
