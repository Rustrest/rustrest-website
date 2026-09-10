import { GitBranch, ImportIcon, Laptop, MonitorSmartphone, TerminalSquare } from "lucide-react";

const integrations = [
  { icon: ImportIcon, label: "Postman collections" },
  { icon: GitBranch, label: "Git & GitHub" },
  { icon: MonitorSmartphone, label: "Windows" },
  { icon: Laptop, label: "macOS" },
  { icon: TerminalSquare, label: "Linux" },
];

export function IntegrationsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-center text-sm font-medium uppercase tracking-wide text-muted">
        Works with the tools you already use
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {integrations.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            <item.icon className="h-4 w-4 text-brand" />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
