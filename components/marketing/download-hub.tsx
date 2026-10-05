"use client";

import { useState } from "react";
import { Apple, Grid2x2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/platform";
import type { DownloadsData } from "@/lib/data/downloads";

type KnownPlatform = Exclude<Platform, "unknown">;

const PLATFORM_ORDER: KnownPlatform[] = ["windows", "mac", "linux"];

const PLATFORM_ICONS: Record<KnownPlatform, typeof Grid2x2> = {
  windows: Grid2x2,
  mac: Apple,
  linux: Monitor,
};

export function DownloadHub({
  data,
  detectedPlatform,
}: {
  data: DownloadsData;
  detectedPlatform: Platform;
}) {
  const [active, setActive] = useState<KnownPlatform>(
    detectedPlatform === "unknown" ? "windows" : detectedPlatform
  );

  const activeData = data.platforms.find((p) => p.platform === active);
  const heroAsset = activeData?.assets.find((asset) => asset.recommended) ?? activeData?.assets[0];

  return (
    <div>
      <p className="text-center text-muted">Available for Windows, macOS and Linux.</p>

      <div className="mt-8 flex flex-col items-center">
        {heroAsset ? (
          <>
            <a href={heroAsset.url}>
              <Button size="lg">Download for {activeData?.label}</Button>
            </a>
            <p className="mt-3 text-sm text-muted">
              Standard installer for {heroAsset.archLabel}.
              {data.version && ` Version ${data.version}.`}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted">Downloads are temporarily unavailable.</p>
        )}

        <div className="mt-6 flex items-center gap-3">
          {PLATFORM_ORDER.map((platform) => {
            const Icon = PLATFORM_ICONS[platform];
            const isActive = platform === active;
            return (
              <button
                key={platform}
                type="button"
                aria-pressed={isActive}
                aria-label={data.platforms.find((p) => p.platform === platform)?.label ?? platform}
                onClick={() => setActive(platform)}
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl border bg-background transition-colors",
                  isActive ? "border-foreground" : "border-border hover:bg-surface"
                )}
              >
                <Icon className="h-6 w-6 text-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-[200px_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-foreground">rustrest for desktop.</h2>
          <p className="mt-1 text-sm text-muted">{activeData?.label} installers.</p>
        </div>

        <div className="divide-y divide-border">
          {activeData && activeData.assets.length > 0 ? (
            activeData.assets.map((asset) => (
              <div
                key={asset.url}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{asset.label}</span>
                  {asset.recommended && <Badge>Recommended</Badge>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted">
                    {asset.fileType} · {asset.archLabel}
                  </span>
                  <a href={asset.url}>
                    <Button size="sm" variant={asset.recommended ? "primary" : "outline"}>
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-muted">No downloads available for this platform yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
