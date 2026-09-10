import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ChangelogForm } from "@/components/admin/changelog-form";
import { getChangelogEntryById } from "@/lib/db/changelog";

export const dynamic = "force-dynamic";

export default async function AdminEditChangelogEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await getChangelogEntryById(id);
  if (!entry) notFound();

  return (
    <div>
      <PageHeader title="Edit Changelog Entry" />
      <ChangelogForm entry={entry} />
    </div>
  );
}
