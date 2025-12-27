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
      title: "One platform for all payrolls",
      description:
        "Bring every payroll run into a consistent workflow while keeping local nuances intact.",
      image: "/images/products/payroll-1.png",
      ctaLabel: "View workflow",
      ctaHref: "/contact",
    },
    {
      title: "Audit‑ready by default",
      description:
        "Keep a full audit trail of changes, approvals, and calculations in every cycle.",
      image: "/images/products/payroll-2.png",
            ctaLabel: "View workflow",
      ctaHref: "/contact",
    },
    {
      title: "Strategic payroll insights",
      description:
        "Turn payroll data into insights that inform headcount, expansion, and budgeting decisions.",
      image: "/images/products/payroll-3.png",
    },
  ],
};
