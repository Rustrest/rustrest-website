import { PageHeader } from "@/components/admin/page-header";
import { ChangelogForm } from "@/components/admin/changelog-form";

export default function AdminNewChangelogEntryPage() {
  return (
    <div>
      <PageHeader title="New Changelog Entry" />
      <ChangelogForm />
    </div>
  );
}
