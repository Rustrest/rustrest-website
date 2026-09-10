"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import type { BlogPost } from "@/types";

export function AdminPostsTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();

  async function handleDelete(post: BlogPost) {
    await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
    router.refresh();
  }

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
    {
      header: "",
      cell: (post) => <ConfirmDeleteButton onConfirm={() => handleDelete(post)} />,
    },
  ];

  return <DataTable columns={columns} rows={posts} />;
}
