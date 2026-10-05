import Link from "next/link";
import { DownloadHub } from "@/components/marketing/download-hub";
import { getAllDownloads } from "@/lib/data/downloads";
import { getServerPlatform } from "@/lib/server-platform";

export const dynamic = "force-dynamic";

export default async function DownloadPage() {
  const [data, platform] = await Promise.all([getAllDownloads(), getServerPlatform()]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-center text-3xl font-semibold text-foreground">Download rustrest</h1>
      <div className="mt-8">
        <DownloadHub data={data} detectedPlatform={platform} />
      </div>
      <div className="mt-10 text-center">
        <Link href="/download/versions" className="text-sm text-muted hover:text-foreground hover:underline">
          See all versions →
        </Link>
      </div>
    </section>
  );
}
