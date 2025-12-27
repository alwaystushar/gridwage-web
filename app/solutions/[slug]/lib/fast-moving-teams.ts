// app/solutions/lib/fast-moving-teams.ts
import type { Solution } from "./solutionTypes";

export const FastMovingTeams: Solution = {
  slug: "fast-moving-teams",
  title: "For Fast-Moving Teams",
  shortTitle: "Fast Teams",
  description:
    "Hire, onboard, and scale your global workforce in days—not months.",
  longDescription:
    "GridWage empowers fast-moving startups and agile teams to grow across borders without delays. From rapid onboarding to flexible contracts and scalable infrastructure, we help your team move at the speed of opportunity—while staying compliant everywhere.",
  category: "For Agile Companies",
  heroImage: "/images/solutions/fast-teams-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Rapid Deployment",
      description:
        "Hire and onboard employees or contractors globally within days using GridWage’s automated workflows.",
      icon: "Rocket",
    },
    {
      title: "Flexible Contracts",
      description:
        "Easily adjust employment terms, durations, and structures to fit evolving business needs and market dynamics.",
      icon: "FileText",
    },
    {
      title: "Scalable Solutions",
      description:
        "Scale your team up or down seamlessly with GridWage’s infrastructure built for agility and compliance.",
      icon: "TrendingUp",
    },
    {
      title: "Smart Onboarding",
      description:
        "Streamline onboarding with digital contracts, local compliance, and instant documentation—all in one place.",
      icon: "Users",
    },
    {
      title: "Integrated Payroll",
      description:
        "Pay your global workforce in multiple currencies on time, every time—with automated accuracy.",
      icon: "CreditCard",
    },
    {
      title: "Compliance at Speed",
      description:
        "Move fast without risk. GridWage ensures every new hire meets local legal and tax requirements automatically.",
      icon: "ShieldCheck",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "Rapid Deployment",
      description:
        "Launch new markets and onboard employees or contractors in just days. GridWage’s fast, compliant setup process ensures your global team is ready to work without the traditional delays of entity creation or legal complexity.",
      image: "/homepageService/eor.png",
      ctaLabel: "Start Rapid Hiring",
      ctaHref: "/demo",
    },
    {
      title: "Flexible Contracts",
      description:
        "Adapt to changing business needs with flexible employment structures. GridWage enables you to modify, renew, or end contracts seamlessly while maintaining compliance and transparency in every country.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Flexibility",
      ctaHref: "/demo",
    },
    {
      title: "Scalable Solutions",
      description:
        "Grow confidently with a system built for agility. Whether you’re hiring five employees or five hundred, GridWage scales with your business—offering speed, security, and compliance at every stage of growth.",
      image: "/homepageService/eor.png",
      ctaLabel: "Scale with GridWage",
      ctaHref: "/demo",
    },
  ],
};
