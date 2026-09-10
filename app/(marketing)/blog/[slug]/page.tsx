import { notFound } from "next/navigation";
import { posts } from "@/lib/data/posts";
import { MarkdownContent } from "@/components/markdown/markdown-content";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold text-foreground">{post.title}</h1>
      <p className="mt-2 text-sm text-muted">
        {post.author} · {post.publishedAt}
      </p>
      <MarkdownContent content={post.content} className="mt-8" />
    </article>
  );
}
