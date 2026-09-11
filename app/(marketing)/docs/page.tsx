import { getSiteSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export default async function DocsIndexPage() {
  const { docsUrl } = await getSiteSettings();

  return (
    <iframe
      src={docsUrl}
      title="Documentation"
      className="h-[calc(100dvh-4rem)] w-full border-0"
    />
  );
}
