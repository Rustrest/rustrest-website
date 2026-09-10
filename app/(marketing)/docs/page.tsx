import { redirect } from "next/navigation";
import { sortedDocs } from "@/lib/data/docs";

export default function DocsIndexPage() {
  redirect(`/docs/${sortedDocs()[0].slug}`);
}
