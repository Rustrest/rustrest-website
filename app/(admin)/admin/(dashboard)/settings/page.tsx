import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
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
    </div>
  );
}
