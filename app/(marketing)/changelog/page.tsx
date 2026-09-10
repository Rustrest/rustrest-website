import { Badge } from "@/components/ui/badge";
import { getAllChangelogEntries } from "@/lib/db/changelog";

export const dynamic = "force-dynamic";

export default async function ChangelogPage() {
  const changelogEntries = await getAllChangelogEntries();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-foreground">Changelog</h1>
      <div className="mt-10 space-y-8">
        {changelogEntries.map((entry) => (
          <div key={entry.id} className="border-l-2 border-border pl-6">
            <div className="flex items-center gap-3">
              <Badge>{entry.version}</Badge>
              <span className="text-sm text-muted">{entry.publishedAt}</span>
            </div>
            <h2 className="mt-2 text-lg font-medium text-foreground">{entry.title}</h2>
            <p className="mt-1 text-muted">{entry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
