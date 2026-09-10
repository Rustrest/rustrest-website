import "server-only";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { DocPage } from "@/types";

// Docs live as real Markdown files in the repo (like a GitHub docs folder),
// not in a database — creating/editing/deleting a doc is a real file write.
const DOCS_DIR = path.join(process.cwd(), "content", "docs");

function slugToPath(slug: string): string {
  return path.join(DOCS_DIR, `${slug}.md`);
}

async function readDocFile(slug: string): Promise<DocPage | null> {
  try {
    const raw = await fs.readFile(slugToPath(slug), "utf-8");
    const { data, content } = matter(raw);
    return {
      id: slug,
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      order: typeof data.order === "number" ? data.order : 0,
      content: content.trim(),
    };
  } catch {
    return null;
  }
}

export async function getAllDocs(): Promise<DocPage[]> {
  await fs.mkdir(DOCS_DIR, { recursive: true });
  const files = await fs.readdir(DOCS_DIR);
  const slugs = files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  const docs = await Promise.all(slugs.map(readDocFile));
  return docs.filter((doc): doc is DocPage => doc !== null).sort((a, b) => a.order - b.order);
}

export async function getDocBySlug(slug: string): Promise<DocPage | null> {
  return readDocFile(slug);
}

export async function getDocById(id: string): Promise<DocPage | null> {
  return readDocFile(id);
}

export async function createDoc(input: Omit<DocPage, "id">): Promise<DocPage> {
  await fs.mkdir(DOCS_DIR, { recursive: true });
  const existing = await readDocFile(input.slug);
  if (existing) {
    throw new Error(`A doc with slug "${input.slug}" already exists`);
  }

  const file = matter.stringify(input.content, { title: input.title, order: input.order });
  await fs.writeFile(slugToPath(input.slug), file, "utf-8");
  return { id: input.slug, ...input };
}

export async function updateDoc(id: string, input: Omit<DocPage, "id">): Promise<DocPage | null> {
  const existing = await readDocFile(id);
  if (!existing) return null;

  const file = matter.stringify(input.content, { title: input.title, order: input.order });

  if (input.slug !== id) {
    await fs.rm(slugToPath(id));
  }
  await fs.writeFile(slugToPath(input.slug), file, "utf-8");
  return { id: input.slug, ...input };
}

export async function deleteDoc(id: string): Promise<boolean> {
  try {
    await fs.rm(slugToPath(id));
    return true;
  } catch {
    return false;
  }
}

export function getAdjacentDocs(docs: DocPage[], slug: string): { prev: DocPage | null; next: DocPage | null } {
  const index = docs.findIndex((doc) => doc.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  };
}
