// app/products/lib/contractor.ts
import {
  Briefcase,
  WalletCards,
  FileSignature,
  Clock,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import type { Product } from "./productTypes";

export const contractorProduct: Product = {
  slug: "contractor",
  title: "Contractor Management",
  shortTitle: "Contractors",
  description: "Onboard, pay, and manage global contractors at scale.",
  longDescription:
    "GridWage centralizes agreements, invoices, and payouts so you can manage contractors compliantly in every country with a single system.",
  category: "Global Contractors",
  emoji: "🧑‍💻",
  heroImage: "/images/products/contractor-hero.png",
  cta: {
    primary: "Start managing contractors",
    secondary: "View workflows",
  },
  cards: [
    {
      title: "Centralized onboarding",
      description: "Standardize how you collect documents and agreements.",
      icon: Briefcase,
    },
    {
      title: "Global payouts",
      description: "Pay in local currencies with flexible schedules.",
      icon: WalletCards,
    },
    {
      title: "Smart contracts",
      description: "Template and track contractor agreements in one place.",
      icon: FileSignature,
    },
    {
      title: "Automated reminders",
      description: "Never miss invoices, renewals, or compliance dates.",
      icon: Clock,
    },
    {
      title: "Work from anywhere",
      description: "Support contractors in dozens of countries seamlessly.",
      icon: Globe2,
    },
    {
      title: "Compliance guardrails",
      description: "Reduce misclassification risk with built‑in checks.",
      icon: ShieldCheck,
    },
  ],
  sections: [
    {
      title: "One workspace for every contractor",
      description:
        "Collect onboarding details, documents, and banking info with self‑serve flows tailored to contractor work.",
      image: "/images/products/contractor-1.png",
      ctaLabel: "See contractor flows",
      ctaHref: "/contact",
    },
    {
      title: "Global payouts made simple",
      description:
        "Automate recurring payouts, handle currency conversion, and keep every contractor paid on time.",
      image: "/images/products/contractor-2.png",
    },
    {
      title: "Stay ahead of misclassification",
      description:
        "Use risk signals and guidelines to ensure contractors are engaged compliantly in each jurisdiction.",
      image: "/images/products/contractor-3.png",
    },
  ],
};
