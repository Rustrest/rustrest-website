import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServerPlatform } from "@/lib/server-platform";
import { downloadOptions } from "@/lib/data/downloads";

export async function PlatformDownloadList() {
  const platform = await getServerPlatform();

  return (
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
  );
}
