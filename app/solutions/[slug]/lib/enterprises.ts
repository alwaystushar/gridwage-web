// app/solutions/lib/enterprises.ts
import type { Solution } from "./solutionTypes";

export const Enterprises: Solution = {
  slug: "enterprises",
  title: "For Enterprises",
  shortTitle: "Enterprises",
  description:
    "Enterprise-grade global compliance, integrations, and dedicated support built for scale.",
  longDescription:
    "GridWage helps large organizations expand and operate seamlessly across borders. With enterprise-grade compliance, white-glove onboarding, and deep integrations, we power complex global teams with precision, security, and speed.",
  category: "For Enterprises",
  heroImage: "/images/solutions/enterprise-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Enterprise Compliance",
      description:
        "Ensure full compliance across multiple jurisdictions with advanced legal, tax, and data governance support.",
      icon: "ShieldCheck",
    },
    {
      title: "Dedicated Support",
      description:
        "Access white-glove support and in-country HR experts to guide every aspect of your global operations.",
      icon: "Headphones",
    },
    {
      title: "Custom Integrations",
      description:
        "Integrate GridWage seamlessly with your existing HRIS, ERP, or finance systems for unified management.",
      icon: "Link",
    },
    {
      title: "Scalable Infrastructure",
      description:
        "Handle thousands of employees and contractors with a robust, enterprise-ready HR and payroll engine.",
      icon: "Layers",
    },
    {
      title: "Advanced Reporting",
      description:
        "Gain deep visibility into global headcount, payroll, compliance, and performance data—all in one dashboard.",
      icon: "BarChart3",
    },
    {
      title: "Security & Data Protection",
      description:
        "Enterprise-grade encryption and GDPR-compliant frameworks to safeguard your organization’s global workforce data.",
      icon: "Shield",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "Enterprise Compliance",
      description:
        "Stay compliant in every market with confidence. GridWage provides enterprise-grade compliance management—covering global labor laws, payroll regulations, and data privacy standards. Our in-country experts ensure your operations meet every jurisdiction’s legal framework without disruption.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Compliance Suite",
      ctaHref: "/demo",
    },
    {
      title: "Dedicated Support",
      description:
        "Enjoy unmatched customer service with GridWage’s white-glove enterprise support. From implementation to ongoing operations, our dedicated specialists work hand-in-hand with your HR and finance teams to ensure smooth execution and global consistency.",
      image: "/homepageService/eor.png",
      ctaLabel: "Meet Our Experts",
      ctaHref: "/demo",
    },
    {
      title: "Custom Integrations",
      description:
        "Seamlessly integrate GridWage with your existing tools—HRIS, ERP, finance, or compliance systems. Our flexible API framework ensures data synchronization and operational efficiency across every level of your enterprise.",
      image: "/homepageService/eor.png",
      ctaLabel: "See Integration Options",
      ctaHref: "/demo",
    },
  ],
};
