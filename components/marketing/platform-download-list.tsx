import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServerPlatform } from "@/lib/server-platform";
import { getDownloadOptions } from "@/lib/data/downloads";

export async function PlatformDownloadList() {
  const [platform, downloadOptions] = await Promise.all([getServerPlatform(), getDownloadOptions()]);

  const version = Object.values(downloadOptions).find((option) => option.version)?.version;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {Object.values(downloadOptions).map((option) => {
          const recommended = platform === option.platform;
          const button = (
            <Button variant={recommended ? "primary" : "outline"} size="lg">
              {option.label}
              {recommended && <Badge className="ml-2">Recommended</Badge>}
            </Button>
          );

          return option.external ? (
            <a key={option.platform} href={option.href}>
              {button}
            </a>
          ) : (
            <Link key={option.platform} href={option.href}>
              {button}
            </Link>
          );
        })}
      </div>
      {version && <p className="text-sm text-muted">{version}</p>}
    </div>
  );
}
