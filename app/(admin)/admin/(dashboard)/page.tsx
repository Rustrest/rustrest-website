import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAllPosts } from "@/lib/db/posts";
import { pricingPlans } from "@/lib/data/pricing-plans";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Blog posts" value={posts.length} />
        <StatCard label="Pricing plans" value={pricingPlans.length} />
      </div>
    </div>
  );
}
