import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { DocForm } from "@/components/admin/doc-form";
import { getDocById } from "@/lib/docs";

export const dynamic = "force-dynamic";

export default async function AdminEditDocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocById(id);
  if (!doc) notFound();

  return (
    <div>
      <PageHeader title="Edit Doc Page" />
      <DocForm doc={doc} />
    </div>
  );
}
