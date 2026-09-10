import Link from "next/link";
import { getAllPosts } from "@/lib/db/posts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const published = posts.filter((post) => post.status === "published");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-foreground">Blog</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {published.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="flex h-full flex-col transition-colors hover:border-brand">
              <p className="text-sm text-muted">{post.publishedAt}</p>
              <h2 className="mt-2 text-xl font-medium text-foreground">{post.title}</h2>
              <p className="mt-2 flex-1 text-muted">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
