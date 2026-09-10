import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAllPosts } from "@/lib/db/posts";
import { getAllDocs } from "@/lib/docs";
import { pricingPlans } from "@/lib/data/pricing-plans";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [posts, docs] = await Promise.all([getAllPosts(), getAllDocs()]);

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
