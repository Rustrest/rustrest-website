import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    billingPeriod: "forever",
    description: "For individuals getting started with API testing.",
    features: ["Unlimited requests", "1 workspace", "Local collections"],
  },
  {
    id: "team",
    name: "Team",
    price: "$14",
    billingPeriod: "month",
    description: "For teams that collaborate on APIs every day.",
    features: [
      "Everything in Free",
      "Shared workspaces",
      "Environment syncing",
      "Role-based access",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    billingPeriod: "year",
    description: "For organizations with advanced security needs.",
    features: [
      "Everything in Team",
      "SSO / SAML",
      "Audit logs",
      "Dedicated support",
    ],
  },
];
