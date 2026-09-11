import Image from "next/image";
import { redirect } from "next/navigation";
// import { getSiteSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export default async function DocsIndexPage() {
  // const { docsUrl } = await getSiteSettings();
  //
  // return (
  //   <iframe
  //     src={docsUrl}
  //     title="Documentation"
  //     className="h-[calc(100dvh-4rem)] w-full border-0"
  //   />
  // );

  if (!process.env.DOCS_URI) {
    return (
      <div className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-2 text-center">
        <Image
          src="/site-images/construction2.png"
          alt="Under construction"
          width={240}
          height={240}
          className="h-auto w-48 sm:w-60"
        />
        <h1 className="text-2xl font-semibold text-foreground">Docs are under construction</h1>
        <p className="text-muted">Check back soon.</p>
      </div>
    );
  }

  redirect(process.env.DOCS_URI);
}
