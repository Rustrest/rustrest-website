import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerPlatform } from "@/lib/server-platform";
import { downloadOptions } from "@/lib/data/downloads";

export async function DownloadButton({ size = "lg" }: { size?: "sm" | "md" | "lg" }) {
  const platform = await getServerPlatform();
  const option = platform === "unknown" ? null : downloadOptions[platform];
  const label = option ? `Download for ${option.label}` : "Download for Windows, macOS, or Linux";

  if (!option) {
    return (
      <Link href="/download">
        <Button size={size}>{label}</Button>
      </Link>
    );
  }

  if (option.external) {
    return (
      <a href={option.href}>
        <Button size={size}>{label}</Button>
      </a>
    );
  }

  return (
    <Link href={option.href}>
      <Button size={size}>{label}</Button>
    </Link>
  );
}
