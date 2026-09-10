import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { PostForm } from "@/components/admin/post-form";
import { getPostById } from "@/lib/db/posts";

export const dynamic = "force-dynamic";

export default async function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <PageHeader title="Edit Post" />
      <PostForm post={post} />
    </div>
  );
}
