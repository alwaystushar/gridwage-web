// app/solutions/lib/remote-first-companies.ts
import type { Solution } from "./solutionTypes";

export const RemoteCompanies: Solution = {
  slug: "remote-first-companies",
  title: "For Remote-First Companies",
  shortTitle: "Remote Teams",
  description:
    "Empower remote teams to work, collaborate, and grow globally with full compliance.",
  longDescription:
    "GridWage helps remote-first organizations hire, pay, and manage distributed teams anywhere in the world. From automated payroll and compliance to async collaboration and benefits management, we make running global remote teams effortless and compliant.",
  category: "For Remote Companies",
  heroImage: "/images/solutions/remote-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Remote Team Management",
      description:
        "Manage distributed employees and contractors globally from a single platform.",
      icon: "Users",
    },
    {
      title: "Global Collaboration",
      description:
        "Connect and coordinate teams across borders with integrated HR and communication tools.",
      icon: "Link",
    },
    {
      title: "Async Work Solutions",
      description:
        "Support flexible, timezone-independent work with automated task and payroll sync.",
      icon: "Zap",
    },
    {
      title: "Automated Payroll",
      description:
        "Run accurate, multi-currency payroll for remote teams in over 140 countries.",
      icon: "CreditCard",
    },
    {
      title: "Compliance Confidence",
      description:
        "Stay compliant with evolving labor, tax, and privacy regulations worldwide.",
      icon: "ShieldCheck",
    },
    {
      title: "Employee Experience",
      description:
        "Offer global perks, health coverage, and mental-wellbeing benefits to remote staff.",
      icon: "Heart",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "Remote Team Management",
      description:
        "Manage every aspect of your global workforce—from onboarding to payments—in one place. GridWage’s unified platform streamlines HR, payroll, and compliance, helping remote-first teams operate efficiently and transparently across continents.",
      image: "/homepageService/eor.png",
      ctaLabel: "Manage Teams Demo",
      ctaHref: "/demo",
    },
    {
      title: "Global Collaboration",
      description:
        "Create seamless communication and collaboration for distributed teams. GridWage integrates with your favorite tools to keep projects aligned, workflows synchronized, and teams connected regardless of location or time zone.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Collaboration Demo",
      ctaHref: "/demo",
    },
    {
      title: "Async Work Solutions",
      description:
        "Support asynchronous work and productivity across time zones with automated workflows, deliverable tracking, and smart payroll scheduling. GridWage makes global teamwork flexible, efficient, and compliant.",
      image: "/homepageService/eor.png",
      ctaLabel: "Discover Async Tools",
      ctaHref: "/demo",
    },
  ],
};
