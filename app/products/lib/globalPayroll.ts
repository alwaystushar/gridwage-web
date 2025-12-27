// app/products/lib/globalPayroll.ts
import {
  Calculator,
  Coins,
  Globe2,
  FileSpreadsheet,
  BarChart3,
  AlarmClock,
} from "lucide-react";
import type { Product } from "./productTypes";

export const globalPayrollProduct: Product = {
  slug: "global-payroll",
  title: "Global Payroll",
  shortTitle: "Payroll",
  description: "Run accurate, compliant payroll for every country in one system.",
  longDescription:
    "GridWage connects your employment data, time, and benefits so you can process multi‑country payroll with full visibility and control.",
  category: "Payroll",
  emoji: "💸",
  heroImage: "/images/products/payroll-hero.png",
  cta: {
    primary: "See payroll in action",
    secondary: "Talk to payroll team",
  },
  cards: [
    {
      title: "Unified payroll engine",
      description: "Process payroll across entities and currencies together.",
      icon: Calculator,
    },
    {
      title: "Accurate net pay",
      description: "Apply the right taxes, social charges, and deductions.",
      icon: Coins,
    },
    {
      title: "Multi‑country coverage",
      description: "Support payroll operations in dozens of markets.",
      icon: Globe2,
    },
    {
      title: "Eliminate spreadsheets",
      description: "Centralize inputs, approvals, and runs in one system.",
      icon: FileSpreadsheet,
    },
    {
      title: "Analytics & reporting",
      description: "Drill into payroll costs by country, team, and entity.",
      icon: BarChart3,
    },
    {
      title: "On‑time every time",
      description: "Automate approvals and cutoffs so teams are paid on time.",
      icon: AlarmClock,
    },
  ],
sections: [
  {
    title: "Multi-Currency Payments",
    description:
      "Run global payroll in 140+ countries with seamless multi-currency support. GridWage automates cross-border payments, ensuring accurate conversions, zero delays, and full compliance with local banking standards. Pay your employees and contractors in their preferred currency—quickly, securely, and transparently.",
    image: "/homepageService/eor.png",
    ctaLabel: "Try Payment Demo",
    ctaHref: "/demo",
  },
  {
    title: "Tax Management",
    description:
      "Simplify international tax obligations with GridWage’s automated tax management system. We calculate, withhold, and file taxes across multiple jurisdictions, keeping your organization compliant and audit-ready while eliminating manual errors and administrative complexity.",
    image: "/homepageService/eor.png",
    ctaLabel: "Explore Tax Demo",
    ctaHref: "/demo",
  },
  {
    title: "Payroll Reports",
    description:
      "Gain real-time visibility into your payroll performance with detailed analytics and reporting. GridWage consolidates all pay data, deductions, and benefits into one intuitive dashboard—helping finance and HR teams make faster, data-driven decisions.",
    image: "/homepageService/eor.png",
    ctaLabel: "View Reports Demo",
    ctaHref: "/demo",
  },
  {
    title: "Direct Deposit",
    description:
      "Deliver instant salary payments directly to employee bank accounts worldwide. GridWage integrates with local banking networks for real-time, compliant deposits—ensuring your team gets paid accurately and on schedule every month.",
    image: "/homepageService/eor.png",
    ctaLabel: "Test Deposit Flow",
    ctaHref: "/demo",
  },
  {
    title: "Payslip Generation",
    description:
      "Automate payslip creation and delivery for your global workforce. GridWage generates digital payslips tailored to local legal requirements, ensuring transparency and compliance while saving hours of manual processing each pay cycle.",
    image: "/homepageService/eor.png",
    ctaLabel: "See Payslip Demo",
    ctaHref: "/demo",
  },
  {
    title: "Year-End Processing",
    description:
      "Close your payroll year effortlessly with GridWage’s automated year-end processing tools. We handle reconciliations, compliance checks, and tax summaries—so your global payroll is accurate, compliant, and audit-ready before deadlines.",
    image: "/homepageService/eor.png",
    ctaLabel: "Preview Year-End Tools",
    ctaHref: "/demo",
  },
],

};
