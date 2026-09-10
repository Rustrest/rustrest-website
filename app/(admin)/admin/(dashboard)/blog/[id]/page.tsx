import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { PostForm } from "@/components/admin/post-form";
import { posts } from "@/lib/data/posts";

export default async function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <div>
      <PageHeader title="Edit Post" />
      <PostForm post={post} />
    </div>
  );
}
