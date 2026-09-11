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

// Analytics only — never surfaced on the public site.
export interface Visit {
  id: string;
  ip: string;
  country: string | null;
  region: string | null;
  city: string | null;
  path: string;
  userAgent: string | null;
  createdAt: string;
}

