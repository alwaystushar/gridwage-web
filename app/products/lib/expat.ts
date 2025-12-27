// app/products/lib/expat.ts
import { Plane, MapPin, ShieldCheck, FileText, Users, Globe2 } from "lucide-react";
import type { Product } from "./productTypes";

export const expatProduct: Product = {
  slug: "expat",
  title: "Expat & Relocation Management",
  shortTitle: "Expats",
  description: "Move and support employees across borders with confidence.",
  longDescription:
    "From visas to relocation benefits, GridWage helps you manage employee moves while staying compliant with local regulations.",
  category: "Mobility",
  emoji: "",
  heroImage: "/homepageService/eor.png",
  cta: {
    primary: "Plan a relocation",
    secondary: "Talk to mobility team",
  },
  cards: [
    {
      title: "Visa workflows",
      description: "Track immigration steps and documentation in one place.",
      icon: Plane,
    },
    {
      title: "Local registrations",
      description: "Coordinate local address, tax, and social registrations.",
      icon: MapPin,
    },
    {
      title: "Compliance shield",
      description: "Align assignments with tax and labor regulations.",
      icon: ShieldCheck,
    },
    {
      title: "Policy templates",
      description: "Standardize relocation and assignment policies.",
      icon: FileText,
    },
    {
      title: "Employee support",
      description: "Guide employees throughout their move and settling‑in.",
      icon: Users,
    },
    {
      title: "Global visibility",
      description: "See every active assignment and status by country.",
      icon: Globe2,
    },
  ],
sections: [
  {
    title: "Visa Support",
    description:
      "Navigate global work visas effortlessly with GridWage’s expert visa management services. We handle every aspect—from documentation and application processing to renewals and compliance—ensuring smooth cross-border mobility for your employees. Our team works directly with in-country specialists to reduce delays, minimize errors, and deliver a seamless relocation experience for global talent.",
    image: "/homepageService/eor.png",
    ctaLabel: "Start Visa Demo",
    ctaHref: "/demo",
  },
  {
    title: "Relocation Services",
    description:
      "Simplify international relocations with end-to-end relocation management from GridWage. We coordinate housing, travel logistics, and cost-of-living adjustments while ensuring compliance with local tax and labor laws. Our relocation experts make global moves stress-free, allowing your employees to settle quickly and focus on their new roles with confidence and comfort.",
    image: "/homepageService/eor.png",
    ctaLabel: "Explore Relocation Demo",
    ctaHref: "/demo",
  },
  {
    title: "Immigration Support",
    description:
      "Ensure your international workforce stays compliant and mobile with GridWage’s immigration support. We manage complex legal documentation, permits, and renewals in full coordination with local authorities. From visa sponsorships to residency compliance, GridWage helps businesses move talent across borders without risk or administrative burden.",
    image: "/homepageService/eor.png",
    ctaLabel: "View Immigration Tools",
    ctaHref: "/demo",
  },
],

};
