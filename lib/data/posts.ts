import type { BlogPost } from "@/types";

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "welcome-to-rustrest",
    title: "Welcome to rustrest",
    excerpt: "Why we built a faster, calmer API client.",
    content: `We built rustrest because every API client we tried felt **heavier** than the job called for.

## The problem

Modern API clients bundle an entire browser runtime just to send a GET request. That means:

- Slow startup
- High memory usage
- A UI that fights your keyboard

## What we did instead

rustrest is native, from the ground up. No Electron, no Chromium — just a fast, *focused* client that gets out of your way.

> If you've ever waited three seconds for a request tool to open, this one's for you.

Try it today with our [install script](/download).`,
    author: "rustrest Team",
    publishedAt: "2026-08-01",
    tags: ["announcement"],
    status: "published",
  },
];
