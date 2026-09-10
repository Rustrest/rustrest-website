import { redirect, notFound } from "next/navigation";
import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-dynamic";

export default async function DocsIndexPage() {
  const docs = await getAllDocs();
  const first = docs[0];
  if (!first) notFound();
  redirect(`/docs/${first.slug}`);
}
