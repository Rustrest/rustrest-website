import { PageHeader } from "@/components/admin/page-header";
import { DocForm } from "@/components/admin/doc-form";

export default function AdminNewDocPage() {
  return (
    <div>
      <PageHeader title="New Doc Page" />
      <DocForm />
    </div>
  );
}
