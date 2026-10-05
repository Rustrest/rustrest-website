import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CopyableCommand } from "@/components/marketing/copyable-command";
import { githubReleasesUrl, getPlatformBinaryLinks } from "@/lib/data/downloads";

const installCommand = `curl --proto '=https' --tlsv1.2 -LsSf https://raw.githubusercontent.com/SojebSikder/rustrest/main/install.sh | sh`;
const pinnedVersionCommand = `VERSION=v0.1.3 INSTALL_DIR="$HOME/bin" curl --proto '=https' --tlsv1.2 -LsSf https://raw.githubusercontent.com/SojebSikder/rustrest/main/install.sh | sh`;

const platformTitles: Record<string, string> = {
  mac: "macOS",
  linux: "Linux",
};

const archLabels: Record<string, Record<string, string>> = {
  mac: { aarch64: "Apple Silicon", x86_64: "Intel" },
  linux: { aarch64: "ARM64", x86_64: "x86_64" },
};

export default async function PlatformInstallPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform } = await params;
  const title = platformTitles[platform];
  if (!title) notFound();

  const binaries = await getPlatformBinaryLinks(platform as "mac" | "linux");

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-foreground">Install rustrest on {title}</h1>
      <p className="mt-3 text-muted">
        Run the install script to download the latest release, verify its checksum, and
        install the <code className="rounded bg-surface px-1.5 py-0.5 text-foreground">rustrest</code> binary
        to <code className="rounded bg-surface px-1.5 py-0.5 text-foreground">~/.local/bin</code>.
      </p>

      <CopyableCommand command={installCommand} className="mt-6 h-20" />

      <p className="mt-6 text-muted">
        Make sure <code className="rounded bg-surface px-1.5 py-0.5 text-foreground">~/.local/bin</code> is
        on your PATH, then run <code className="rounded bg-surface px-1.5 py-0.5 text-foreground">rustrest</code>.
      </p>

      <p className="mt-8 text-sm text-muted">
        You can pin a specific version or change the install directory via environment
        variables:
      </p>
      <CopyableCommand command={pinnedVersionCommand} className="mt-2 h-20" />

      <div className="mt-10 flex flex-col items-center gap-3">
        {binaries ? (
          <>
            <p className="text-sm text-muted">
              Or grab the {binaries.version} binary directly:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={binaries.primary.url}>
                <Button variant="outline">
                  Download for {archLabels[platform]?.[binaries.primary.arch] ?? binaries.primary.arch}
                </Button>
              </a>
              {binaries.alternates.map((asset) => (
                <a key={asset.name} href={asset.url}>
                  <Button variant="outline">
                    {archLabels[platform]?.[asset.arch] ?? asset.arch}
                  </Button>
                </a>
              ))}
            </div>
          </>
        ) : (
          <a href={githubReleasesUrl}>
            <Button variant="outline">Or download from GitHub</Button>
          </a>
        )}
      </div>
    </section>
  );
}
