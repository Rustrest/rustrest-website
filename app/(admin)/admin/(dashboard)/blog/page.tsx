import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/data/posts";
import type { BlogPost } from "@/types";

const columns: DataTableColumn<BlogPost>[] = [
  {
    header: "Title",
    cell: (post) => (
      <Link href={`/admin/blog/${post.id}`} className="hover:text-brand">
        {post.title}
      </Link>
    ),
  },
  { header: "Status", cell: (post) => <Badge>{post.status}</Badge> },
  { header: "Published", cell: (post) => post.publishedAt },
];

export default function AdminBlogListPage() {
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
      <DataTable columns={columns} rows={posts} />
    </div>
  );
}
