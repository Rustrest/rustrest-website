import { DownloadButton } from "@/components/marketing/download-button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {siteConfig.tagline}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">{siteConfig.description}</p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <DownloadButton />
      </div>
    </section>
  );
}
