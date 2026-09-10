import type { DocPage } from "@/types";

export const docs: DocPage[] = [
  {
    id: "1",
    slug: "getting-started",
    title: "Getting Started",
    content: `rustrest is a **native, cross-platform** API testing client written in Rust.

## Install

Run the install script for your platform, then launch \`rustrest\` from your terminal.

## Why rustrest?

- Zero bloat — no bundled browser runtime
- Instant startup, even with large collections
- *Git-native*: collections live on your filesystem

See the [Collections](/docs/collections) guide next.`,
    order: 1,
  },
  {
    id: "2",
    slug: "collections",
    title: "Collections",
    content: `Collections group related requests together, just like a Postman collection.

## Creating a collection

1. Click **New Collection** in the sidebar
2. Name it and start adding requests
3. Commit the folder with Git whenever you like

Collections are stored as plain JSON files on disk, so any version control system works out of the box.`,
    order: 2,
  },
  {
    id: "3",
    slug: "environments",
    title: "Environments",
    content: `Environments hold variables you can reuse across requests, such as \`{{baseUrl}}\` or \`{{apiKey}}\`.

## Switching environments

Use the environment dropdown in the top-right of the request builder to switch between **Development**, **Staging**, and **Production** without editing a single request.`,
    order: 3,
  },
];

export function sortedDocs(): DocPage[] {
  return [...docs].sort((a, b) => a.order - b.order);
}

export function getAdjacentDocs(slug: string): { prev: DocPage | null; next: DocPage | null } {
  const ordered = sortedDocs();
  const index = ordered.findIndex((doc) => doc.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
