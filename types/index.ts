// Shared domain types for the marketing site and the admin panel.

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: "month" | "year" | "forever";
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  status: "draft" | "published";
}

export interface DocPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  publishedAt: string;
  tag: "added" | "fixed" | "improved" | "removed";
}

