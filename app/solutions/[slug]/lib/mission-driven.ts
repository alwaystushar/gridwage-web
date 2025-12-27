// app/solutions/lib/mission-driven.ts
import type { Solution } from "./solutionTypes";

export const MissionDriven: Solution = {
  slug: "mission-driven",
  title: "For Mission-Driven Companies",
  shortTitle: "Mission-Driven",
  description:
    "Hire ethically, support diversity, and build teams that make a global impact.",
  longDescription:
    "GridWage empowers mission-driven organizations to scale their teams responsibly. From fair hiring and ethical employment to diverse global talent sourcing, we help you expand your workforce while staying true to your purpose and compliance commitments.",
  category: "For Impact-Focused Businesses",
  heroImage: "/images/solutions/mission-driven-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "Impact Hiring",
      description:
        "Hire for purpose. Build teams that align with your organization’s social, environmental, and ethical missions.",
      icon: "Heart",
    },
    {
      title: "Diverse Talent Pools",
      description:
        "Access a global network of diverse professionals, ensuring equitable opportunities and inclusive team growth.",
      icon: "Users",
    },
    {
      title: "Ethical Employment",
      description:
        "Ensure fair wages, transparent contracts, and responsible labor practices for every worker, everywhere.",
      icon: "ShieldCheck",
    },
    {
      title: "Sustainable Growth",
      description:
        "Expand responsibly with policies and practices that balance business performance and social impact.",
      icon: "TrendingUp",
    },
    {
      title: "Local Empowerment",
      description:
        "Support local economies by employing talent in emerging markets while maintaining full compliance.",
      icon: "Globe2",
    },
    {
      title: "Transparency & Reporting",
      description:
        "Track your impact with detailed ESG and diversity reports that showcase your organization’s ethical progress.",
      icon: "BarChart3",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "Impact Hiring",
      description:
        "Empower your business to hire for purpose. GridWage helps mission-driven organizations find and onboard professionals who align with their ethical and social goals—driving meaningful change while maintaining global compliance.",
      image: "/homepageService/eor.png",
      ctaLabel: "Start Impact Hiring",
      ctaHref: "/demo",
    },
    {
      title: "Diverse Talent Pools",
      description:
        "Build inclusive global teams by tapping into diverse talent from 150+ countries. GridWage ensures fair hiring practices and equitable access to opportunities—helping your organization grow with purpose and diversity at its core.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Global Talent",
      ctaHref: "/demo",
    },
    {
      title: "Ethical Employment",
      description:
        "Create a culture of fairness and transparency. With GridWage, you can ensure every hire—no matter the location—receives equitable pay, proper benefits, and compliant working conditions that reflect your organization’s values.",
      image: "/homepageService/eor.png",
      ctaLabel: "Build Ethical Teams",
      ctaHref: "/demo",
    },
  ],
};
