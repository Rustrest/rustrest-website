import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { AdminVisitsTable } from "@/components/admin/admin-visits-table";
import { getAllVisits } from "@/lib/db/visits";

export const dynamic = "force-dynamic";

export default async function AdminVisitorsPage() {
  const visits = await getAllVisits();

  const uniqueIps = new Set(visits.map((v) => v.ip)).size;
  const uniqueCountries = new Set(visits.map((v) => v.country).filter(Boolean)).size;

  return (
    <div>
      <PageHeader title="Visitors" />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total visits" value={visits.length} />
        <StatCard label="Unique visitors" value={uniqueIps} />
        <StatCard label="Countries reached" value={uniqueCountries} />
      </div>
      <div className="mt-6">
        <AdminVisitsTable visits={visits} />
      </div>
    </div>
  );
}
