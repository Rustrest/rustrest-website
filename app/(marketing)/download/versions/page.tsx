import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getReleaseHistory } from "@/lib/data/downloads";

export const dynamic = "force-dynamic";

export default async function DownloadVersionsPage() {
  const releases = await getReleaseHistory();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/download" className="text-sm text-muted hover:text-foreground hover:underline">
        ← Back to download
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-foreground">Version history</h1>
      <p className="mt-3 text-muted">
        Every rustrest release, with direct download links per platform and architecture.
      </p>

      {releases.length === 0 ? (
        <p className="mt-12 text-muted">Release history is temporarily unavailable.</p>
      ) : (
        <div className="mt-12 divide-y divide-border">
          {releases.map((release, index) => (
            <div key={release.version ?? index} className="py-8">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">{release.version}</h2>
                {index === 0 && <Badge>Latest</Badge>}
              </div>

              <div className="mt-4 grid gap-6 sm:grid-cols-3">
                {release.platforms.map((platform) => (
                  <div key={platform.platform}>
                    <h3 className="text-sm font-medium text-foreground">{platform.label}</h3>
                    {platform.assets.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {platform.assets.map((asset) => (
                          <li key={asset.url}>
                            <a
                              href={asset.url}
                              className="text-sm text-muted hover:text-foreground hover:underline"
                            >
                              {asset.archLabel} ({asset.fileType})
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">—</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
