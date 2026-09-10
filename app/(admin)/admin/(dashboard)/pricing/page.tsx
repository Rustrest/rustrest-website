import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/lib/data/pricing-plans";
import type { PricingPlan } from "@/types";

const columns: DataTableColumn<PricingPlan>[] = [
  { header: "Plan", cell: (plan) => plan.name },
  { header: "Price", cell: (plan) => `${plan.price} / ${plan.billingPeriod}` },
  {
    header: "Highlighted",
    cell: (plan) => (plan.highlighted ? <Badge>Yes</Badge> : "No"),
  },
];

export default function AdminPricingPage() {
  return (
    <div>
      <PageHeader title="Pricing Plans" />
      <DataTable columns={columns} rows={pricingPlans} />
    </div>
  );
}
