// app/products/lib/eor.ts
import {
  Globe2,
  ShieldCheck,
  CreditCard,
  Rocket,
  FileText,
  Users,
  ScrollText,
  Briefcase,
} from "lucide-react";
import type { Product } from "./productTypes";

export const eorProduct: Product = {
  slug: "eor",
  title: "Employer of Record (EOR)",
  shortTitle: "EOR",
  description:
    "Hire, pay, and manage full-time employees in 150+ countries with full compliance and no local entities required.",
  longDescription:
    "GridWage’s Employer of Record (EOR) platform empowers global companies to hire full-time employees anywhere in the world—without setting up local entities. We handle payroll, taxes, benefits, and labor compliance so you can scale internationally with confidence and precision.",
  category: "Global Employment",
  emoji: "🌍",
  heroImage: "/homepageService/eor.png",
  cta: {
    primary: "Book a Demo",
    secondary: "Explore Capabilities",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Global Hiring",
      description:
        "Hire top talent in 150+ countries—instantly and compliantly, without entity setup or local presence.",
      icon: Globe2,
    },
    {
      title: "Compliance Management",
      description:
        "Stay compliant with labor laws, taxes, and data regulations in every country with GridWage’s automated compliance engine.",
      icon: ShieldCheck,
    },
    {
      title: "Payroll Processing",
      description:
        "Automate multi-currency salary disbursements, deductions, and reporting for your global workforce.",
      icon: CreditCard,
    },
    {
      title: "Benefits Administration",
      description:
        "Offer competitive, localized benefits packages that help you attract and retain top international talent.",
      icon: Briefcase,
    },
    {
      title: "Tax Management",
      description:
        "Ensure global tax compliance with accurate withholdings, filings, and remittances—everywhere you operate.",
      icon: ScrollText,
    },
    {
      title: "Contract Management",
      description:
        "Create and manage compliant, locally tailored employment agreements backed by in-country legal experts.",
      icon: FileText,
    },
    {
      title: "Onboarding Solutions",
      description:
        "Deliver seamless digital onboarding experiences for new hires, ensuring compliance and readiness from day one.",
      icon: Rocket,
    },
    {
      title: "HR Support",
      description:
        "Gain access to dedicated local HR professionals who provide real-time support for your distributed teams.",
      icon: Users,
    },
  ],

  // DETAILED SECTIONS
  sections: [
    {
      title: "Hire Anywhere. Stay Compliant.",
      description:
        "GridWage’s Employer of Record (EOR) platform enables companies to hire full-time employees globally—without establishing local entities. We handle payroll, benefits, and labor regulations so you can focus on scaling and innovation, not administration.",
      image: "/homepageService/eor.png",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact",
    },
    {
      title: "Global Hiring Made Effortless",
      description:
        "Hire talent in 150+ countries with ease. GridWage manages employment contracts, benefits, and compliance so your business can expand across borders seamlessly—no local subsidiaries required.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Your Compliance, Fully Automated",
      description:
        "Stay aligned with every jurisdiction’s labor, tax, and data privacy requirements. GridWage’s compliance engine continuously monitors regulatory changes to safeguard your global operations.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Payroll Processing for Global Teams",
      description:
        "Automate multi-currency payroll, deductions, and statutory filings—ensuring accuracy, transparency, and timeliness across all regions.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Benefits Administration Made Simple",
      description:
        "Deliver localized employee benefits, from health insurance to retirement plans, tailored to each market’s legal framework and expectations.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Global Tax Compliance, Simplified",
      description:
        "We manage all aspects of global taxation—ensuring accurate withholdings, filings, and compliance so your business remains audit-ready.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Local Contracts, Zero Stress",
      description:
        "GridWage generates and manages fully compliant employment contracts backed by in-country legal expertise and digital signing tools.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Seamless Onboarding, Anywhere",
      description:
        "Our digital onboarding system ensures new hires are legally set up, equipped, and ready to work—faster than traditional global hiring methods.",
      image: "/homepageService/eor.png",
    },
    {
      title: "A Single Source of Truth",
      description:
        "Track headcount, payroll, compliance, and employee data across every country—all from one unified dashboard.",
      image: "/homepageService/eor.png",
    },
    {
      title: "Scale with Confidence",
      description:
        "From startups expanding internationally to enterprises growing across continents, GridWage’s EOR platform powers compliant global growth at scale.",
      image: "/homepageService/eor.png",
    },
  ],
};
