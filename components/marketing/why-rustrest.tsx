import { Cpu, FileJson, GitBranch, Target } from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "Zero bloat",
    description: "Built natively, without a bundled web-browser runtime.",
  },
  {
    icon: Target,
    title: "Resource efficient",
    description: "Low memory footprint and instant startup — even with large collections.",
  },
  {
    icon: GitBranch,
    title: "Git-native",
    description: "Collections live on your filesystem, so any VCS works out of the box.",
  },
  {
    icon: FileJson,
    title: "Postman compatible",
    description: "Import Postman collections, environments, and scripts directly.",
  },
];

export function WhyRustRest() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground">Why rustrest?</h2>
          <p className="mt-3 text-muted">
            Modern API clients carry massive resource overhead. rustrest is built for
            developers who prefer speed and simplicity.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-xl border border-border bg-background p-6">
              <reason.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-medium text-foreground">{reason.title}</h3>
              <p className="mt-1 text-sm text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
