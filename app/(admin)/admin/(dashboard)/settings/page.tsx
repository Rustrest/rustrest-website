import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DocsUrlForm } from "@/components/admin/docs-url-form";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { docsUrl } = await getSiteSettings();

  return (
    <div>
      <PageHeader title="Settings" />
      <Card className="mx-auto max-w-lg space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted">Site name</label>
          <Input defaultValue={siteConfig.name} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted">Tagline</label>
          <Input defaultValue={siteConfig.tagline} />
        </div>
        <Button>Save</Button>
      </Card>

      <Card className="mx-auto mt-4 max-w-lg">
        <DocsUrlForm initialUrl={docsUrl} />
      </Card>
    </div>
  );
}
