import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { AdminPostsTable } from "@/components/admin/admin-posts-table";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/db/posts";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        action={
          <Link href="/admin/blog/new">
            <Button size="sm">New post</Button>
          </Link>
        }
      />
      <AdminPostsTable posts={posts} />
    </div>
  );
}
