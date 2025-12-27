// app/products/lib/eor.ts
import {
  Globe2,
  ShieldCheck,
  CreditCard,
  Rocket,
  FileText,
  Users,
} from "lucide-react";
import type { Product } from "./productTypes";

export const eorProduct: Product = {
  slug: "eor",
  title: "Employer of Record",
  shortTitle: "EOR",
  description: "Hire and manage full‑time employees in 150+ countries.",
  longDescription:
    "GridWage Employer of Record lets you hire, onboard, and manage global employees without opening local entities, while staying fully compliant with local laws.",
  category: "Global Employment",
  emoji: "🌍",
  heroImage: "/homepageService/eor.png",
  cta: {
    primary: "Book a demo",
    secondary: "Explore capabilities",
  },
  cards: [
    {
      title: "Global hiring",
      description: "Hire employees in 150+ countries without local entities.",
      icon: Globe2,
    },
    {
      title: "Compliance handled",
      description: "Local contracts, policies, and statutory requirements.",
      icon: ShieldCheck,
    },
    {
      title: "Payroll & benefits",
      description: "Run payroll and offer localized benefits from one place.",
      icon: CreditCard,
    },
    {
      title: "Fast onboarding",
      description: "Onboard talent in days with localized workflows.",
      icon: Rocket,
    },
    {
      title: "Local documentation",
      description: "Employment contracts and legal docs tailored per market.",
      icon: FileText,
    },
    {
      title: "HR support",
      description: "Local experts to support your distributed teams.",
      icon: Users,
    },
  ],
  sections: [
    {
      title: "Global Hiring",
      description:
        "Expand your team across 150+ countries without setting up local entities. GridWage’s Employer of Record (EOR) platform makes global hiring fast, compliant, and effortless. We handle contracts, payroll, and benefits while ensuring full compliance with local labor and tax laws—so you can build and manage a truly global workforce with confidence.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
    {
      title: "Compliance Management",
      description:
        "Stay fully compliant in every market with GridWage’s Employer of Record (EOR) platform. We manage complex labor laws, tax obligations, and data-protection requirements across 150+ countries—so you don’t have to. Our automated compliance engine continuously monitors regulatory changes, ensuring your global operations remain legally sound and audit-ready at all times.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
    {
      title: "Payroll Processing",
      description:
        "Simplify global payroll with GridWage’s Employer of Record (EOR) platform. Automate salary payments, deductions, and tax filings across multiple currencies and countries with complete accuracy. Our unified system ensures your teams are paid on time, every time—while maintaining full compliance with local payroll and tax regulations.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
        {
      title: "Benefits Administration",
      description:
        "Deliver world-class employee benefits anywhere with GridWage’s Employer of Record (EOR) platform. We manage localized benefits such as health insurance, retirement plans, and paid leave—customized to each country’s legal standards. Attract and retain top global talent with compliant, competitive, and hassle-free benefits administration.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
            {
      title: "Tax Management",
      description:
        "Simplify global tax operations with GridWage’s Employer of Record (EOR) platform. We handle accurate withholdings, filings, and remittances across multiple jurisdictions—ensuring your business stays compliant and audit-ready. With automated tax reporting and region-specific expertise, GridWage removes the complexity of international payroll taxes.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
            {
      title: "Contract Management",
      description:
        "Streamline your global employment contracts with GridWage’s Employer of Record (EOR) platform. We handle contract creation, review, and management in full compliance with each country’s labor laws. Backed by in-country legal experts, GridWage ensures every agreement is accurate, compliant, and tailored to local requirements—reducing risk while simplifying global hiring.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
            {
      title: "Onboarding Solutions",
      description:
        "Deliver a seamless onboarding experience for your global workforce with GridWage. Our digital onboarding tools manage documentation, compliance verification, and local employment setup in one unified flow. From contracts to payroll activation, new hires are fully compliant and ready to work—faster and with zero administrative hassle.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an expert",
      ctaHref: "/contact",
    },
  ],
};
