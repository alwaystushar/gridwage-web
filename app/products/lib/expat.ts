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
  emoji: "✈️",
  heroImage: "/images/products/expat-hero.png",
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
      title: "Structured relocation journeys",
      description:
        "Design clear, step‑by‑step relocation journeys so employees always know what comes next.",
      image: "/images/products/expat-1.png",
      ctaLabel: "View sample journey",
      ctaHref: "/contact",
    },
    {
      title: "Immigration and tax aligned",
      description:
        "Keep immigration, payroll, and tax teams aligned on each move to reduce risk and surprises.",
      image: "/images/products/expat-2.png",
    },
    {
      title: "A better move experience",
      description:
        "Offer employees a modern, transparent relocation experience instead of spreadsheets and email threads.",
      image: "/images/products/expat-3.png",
    },
  ],
};
