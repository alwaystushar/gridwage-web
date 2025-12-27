// app/solutions/lib/smes-growing-businesses.ts
import type { Solution } from "./solutionTypes";

export const SMEsGrowingBusinesses: Solution = {
  slug: "smes-growing-businesses",
  title: "For SMEs & Growing Businesses",
  shortTitle: "SMEs",
  description:
    "Expand globally with simplified hiring, payroll, and compliance support.",
  longDescription:
    "GridWage helps small and mid-sized businesses scale internationally without the complexity of local entity setup. From hiring and payroll to compliance and market entry, we provide the infrastructure and expertise that growing companies need to succeed on a global stage.",
  category: "For SMEs",
  heroImage: "/images/solutions/sme-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "International Growth",
      description:
        "Scale your business globally with full legal, HR, and payroll support in 150+ countries.",
      icon: "Globe2",
    },
    {
      title: "Compliance Support",
      description:
        "Stay compliant with local labor laws, payroll regulations, and tax frameworks everywhere you operate.",
      icon: "ShieldCheck",
    },
    {
      title: "Market Entry Strategy",
      description:
        "Enter new markets strategically with data-driven insights, cost analysis, and risk management.",
      icon: "BarChart3",
    },
    {
      title: "Payroll Simplified",
      description:
        "Run error-free, multi-currency payroll for global employees and contractors with real-time reporting.",
      icon: "CreditCard",
    },
    {
      title: "Entity-Free Expansion",
      description:
        "Hire full-time international employees without setting up local entities through GridWage’s EOR infrastructure.",
      icon: "Briefcase",
    },
    {
      title: "Localized Expertise",
      description:
        "Leverage in-country experts for HR, compliance, and taxation—ensuring every move is fully compliant.",
      icon: "Users",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "International Growth",
      description:
        "Expand globally with confidence. GridWage enables SMEs to hire talent, run payroll, and manage compliance across 150+ countries—so you can scale your business faster while we handle the complexities of international employment.",
      image: "/homepageService/eor.png",
      ctaLabel: "Start Growing Globally",
      ctaHref: "/demo",
    },
    {
      title: "Compliance Support",
      description:
        "Stay compliant in every region with automated updates to labor, payroll, and tax regulations. GridWage ensures your business meets all statutory requirements while minimizing risk and avoiding costly penalties.",
      image: "/homepageService/eor.png",
      ctaLabel: "See Compliance Tools",
      ctaHref: "/demo",
    },
    {
      title: "Market Entry Strategy",
      description:
        "Expand into new markets with precision. GridWage provides actionable insights and regional expertise to help you identify opportunities, forecast costs, and navigate complex regulations before expanding operations.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore Market Strategy",
      ctaHref: "/demo",
    },
  ],
};
