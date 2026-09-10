import { PageHeader } from "@/components/admin/page-header";
import { PostForm } from "@/components/admin/post-form";

export default function AdminNewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New Post" />
      <PostForm />
    </div>
  );
}
