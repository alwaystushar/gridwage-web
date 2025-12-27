// app/solutions/lib/compliance-first.ts
import type { Solution } from "./solutionTypes";

export const ComplianceFirst: Solution = {
  slug: "compliance-first",
  title: "For Compliance-First Organizations",
  shortTitle: "Compliance",
  description:
    "Ensure global compliance, manage audits, and minimize risk with real-time control and visibility.",
  longDescription:
    "GridWage empowers compliance-driven organizations to stay ahead of global regulations. With built-in monitoring, audit support, and risk analytics, we help you manage every compliance challenge—from labor laws to data protection—with complete transparency and precision.",
  category: "For Compliance Teams",
  heroImage: "/images/solutions/compliance-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Regulatory Compliance",
      description:
        "Meet global labor, tax, and data regulations with automated updates and jurisdiction-specific expertise.",
      icon: "ShieldCheck",
    },
    {
      title: "Audit Support",
      description:
        "Stay audit-ready year-round with centralized documentation, detailed reports, and transparent tracking.",
      icon: "FileText",
    },
    {
      title: "Risk Management",
      description:
        "Identify, assess, and mitigate compliance risks across countries using real-time dashboards and alerts.",
      icon: "TrendingDown",
    },
    {
      title: "Policy Automation",
      description:
        "Standardize and enforce HR and payroll policies automatically—minimizing manual intervention and errors.",
      icon: "Settings",
    },
    {
      title: "Data Protection",
      description:
        "Ensure GDPR and SOC-2 alignment with enterprise-grade data encryption, access control, and audit trails.",
      icon: "Shield",
    },
    {
      title: "Global Oversight",
      description:
        "Gain end-to-end visibility into compliance, payroll, and documentation across all international entities.",
      icon: "Eye",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "Regulatory Compliance",
      description:
        "Stay compliant across every region with GridWage’s automated regulatory engine. We handle country-specific labor laws, tax filings, and employment documentation so your organization operates confidently and without interruption.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Compliance Engine",
      ctaHref: "/demo",
    },
    {
      title: "Audit Support",
      description:
        "Simplify audits with centralized, audit-ready documentation. GridWage automatically tracks compliance actions, stores relevant records, and generates detailed reports to support smooth internal or external audits.",
      image: "/homepageService/eor.png",
      ctaLabel: "See Audit Tools",
      ctaHref: "/demo",
    },
    {
      title: "Risk Management",
      description:
        "Mitigate risk proactively with GridWage’s real-time compliance insights. From employee classification to tax obligations, our system identifies red flags before they become liabilities—protecting your brand and bottom line.",
      image: "/homepageService/eor.png",
      ctaLabel: "Start Managing Risk",
      ctaHref: "/demo",
    },
  ],
};
