import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { AdminVisitsTable } from "@/components/admin/admin-visits-table";
import { Pagination } from "@/components/admin/pagination";
import { VisitsSearchForm } from "@/components/admin/visits-search-form";
import { getVisitsPage, getVisitStats } from "@/lib/db/visits";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

export default async function AdminVisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; ip?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const ip = params.ip?.trim() ?? "";

  const [stats, { visits, total }] = await Promise.all([
    getVisitStats(),
    getVisitsPage({ page, pageSize: PAGE_SIZE, ip: ip || undefined }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <PageHeader title="Visitors" />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total visits" value={stats.total} />
        <StatCard label="Unique visitors" value={stats.uniqueIps} />
        <StatCard label="Countries reached" value={stats.uniqueCountries} />
      </div>

      <VisitsSearchForm initialIp={ip} />

      <div className="mt-4">
        <AdminVisitsTable visits={visits} />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        buildHref={(p) => `/admin/visitors?page=${p}${ip ? `&ip=${encodeURIComponent(ip)}` : ""}`}
      />
    </div>
  );
}
