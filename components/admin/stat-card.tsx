import { Card } from "@/components/ui/card";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </Card>
  );
}
