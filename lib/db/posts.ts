import "server-only";
import connectDB from "@/lib/db/mongoose";
import { PostModel } from "@/models/Post";
import { posts as fallbackPosts } from "@/lib/data/posts";
import type { BlogPost } from "@/types";

interface PostLean {
  _id: { toString(): string };
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  status: "draft" | "published";
}

function toBlogPost(post: PostLean): BlogPost {
  return {
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    tags: post.tags,
    status: post.status,
  };
}

// Falls back to the built-in sample content when the database is empty or
// unreachable, so the site always has something to show.
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const posts = await PostModel.find().sort({ publishedAt: -1 }).lean<PostLean[]>();
    if (posts.length > 0) return posts.map(toBlogPost);
  } catch {
    // fall through to the static fallback below
  }
  return fallbackPosts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id) ?? null;
}

export async function createPost(input: Omit<BlogPost, "id">): Promise<BlogPost> {
  await connectDB();
  const post = await PostModel.create(input);
  return toBlogPost(post.toObject());
}

export async function updatePost(id: string, input: Omit<BlogPost, "id">): Promise<BlogPost | null> {
  await connectDB();
  const post = await PostModel.findByIdAndUpdate(id, input, { new: true }).lean<PostLean | null>();
  return post ? toBlogPost(post) : null;
}

export async function deletePost(id: string): Promise<boolean> {
  await connectDB();
  const result = await PostModel.findByIdAndDelete(id);
  return result !== null;
}
