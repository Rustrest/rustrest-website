import Link from "next/link";
import { posts } from "@/lib/data/posts";

export default function BlogIndexPage() {
  const published = posts.filter((post) => post.status === "published");

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-foreground">Blog</h1>
      <div className="mt-10 space-y-8">
        {published.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block">
            <h2 className="text-xl font-medium text-foreground hover:text-brand">
              {post.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{post.publishedAt}</p>
            <p className="mt-2 text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
