import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { AdminChangelogTable } from "@/components/admin/admin-changelog-table";
import { Button } from "@/components/ui/button";
import { getAllChangelogEntries } from "@/lib/db/changelog";

export const dynamic = "force-dynamic";

export default async function AdminChangelogPage() {
  const entries = await getAllChangelogEntries();

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
      <AdminChangelogTable entries={entries} />
    </div>
  );
}
