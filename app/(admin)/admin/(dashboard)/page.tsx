import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { posts } from "@/lib/data/posts";
import { docs } from "@/lib/data/docs";
import { pricingPlans } from "@/lib/data/pricing-plans";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Blog posts" value={posts.length} />
        <StatCard label="Doc pages" value={docs.length} />
        <StatCard label="Pricing plans" value={pricingPlans.length} />
      </div>
    </div>
  );
}
