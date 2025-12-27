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
  description: "Simplify Global Contracting.",
  longDescription:
    "GridWage’s Contractor Management platform empowers businesses to onboard, pay, and manage contractors in 150+ countries — all while staying fully compliant with local regulations. Handle agreements, payments, and compliance effortlessly, and scale your global workforce with confidence.",
  category: "Global Contractors",
  emoji: "",
  heroImage: "/homepageService/eor.png",
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
    title: "Contractor Onboarding",
    description:
      "Seamlessly onboard independent contractors in over 150 countries with GridWage’s fully compliant onboarding framework. Our platform automates documentation, background verification, and worker classification—ensuring that every engagement meets local employment, tax, and labor requirements. Accelerate setup times, reduce administrative workload, and give your contractors a frictionless start to their journey.",
    image: "/homepageService/eor.png",
    ctaLabel: "Start Onboarding Demo",
    ctaHref: "/demo",
  },
  {
    title: "Payment Solutions",
    description:
      "Simplify cross-border contractor payments with GridWage’s automated global payout system. Send instant, secure payments in multiple currencies with real-time conversion and full tax compliance. Whether you’re paying one contractor or hundreds, GridWage ensures timely, transparent, and compliant disbursements—eliminating the complexity of global banking networks and foreign exchange management.",
    image: "/homepageService/eor.png",
    ctaLabel: "Try Payment Demo",
    ctaHref: "/demo",
  },
  {
    title: "Invoice Management",
    description:
      "Streamline your billing workflow with GridWage’s smart invoicing engine. Automatically generate, validate, and process contractor invoices with full visibility into approvals and payment status. Gain centralized control over all your contractor expenses while maintaining compliance with local accounting and tax regulations—saving time, reducing errors, and improving financial accuracy across your organization.",
    image: "/homepageService/eor.png",
    ctaLabel: "View Invoice Workflow",
    ctaHref: "/demo",
  },
  {
    title: "Compliance Tracking",
    description:
      "Stay globally compliant with real-time visibility into your contractor network. GridWage continuously monitors worker classification, legal changes, and tax regulations across 150+ jurisdictions. Our compliance tracking system ensures every contractor engagement meets local laws, reducing misclassification risks and keeping your business audit-ready and protected at all times.",
    image: "/homepageService/eor.png",
    ctaLabel: "Explore Compliance Tools",
    ctaHref: "/demo",
  },
],


};
