import { PlatformDownloadList } from "@/components/marketing/platform-download-list";

export default function DownloadPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Download rustrest</h1>
      <p className="mt-3 text-muted">Available for every major platform.</p>
      <PlatformDownloadList />
    </section>
  );
}
