// app/solutions/lib/hr-people-teams.ts
import type { Solution } from "./solutionTypes";

export const HRPeopleTeams: Solution = {
  slug: "hr-people-teams",
  title: "For HR & People Teams",
  shortTitle: "HR Teams",
  description:
    "Automate HR operations, analyze workforce data, and manage global talent effortlessly.",
  longDescription:
    "GridWage helps HR and People teams streamline operations, automate workflows, and make smarter decisions with actionable insights. From onboarding and payroll to analytics and talent management, we empower HR leaders to focus on people—not paperwork.",
  category: "For HR Teams",
  heroImage: "/images/solutions/hr-hero.png",
  cta: {
    primary: "Get Started",
    secondary: "Book a Demo",
  },

  // FEATURE CARDS
  cards: [
    {
      title: "HR Automation",
      description:
        "Automate routine HR tasks—onboarding, payroll, and reporting—so your team can focus on strategy and culture.",
      icon: "Settings",
    },
    {
      title: "People Analytics",
      description:
        "Turn workforce data into insights with analytics that improve retention, performance, and engagement.",
      icon: "BarChart3",
    },
    {
      title: "Talent Management",
      description:
        "Attract, develop, and retain top talent with a unified, data-driven HR platform.",
      icon: "Users",
    },
    {
      title: "Seamless Onboarding",
      description:
        "Deliver exceptional onboarding experiences that integrate employees quickly and compliantly.",
      icon: "Rocket",
    },
    {
      title: "Performance Insights",
      description:
        "Track and evaluate performance with smart analytics that guide leadership and employee growth.",
      icon: "TrendingUp",
    },
    {
      title: "Employee Engagement",
      description:
        "Boost satisfaction and productivity with continuous feedback and well-being tools built for modern teams.",
      icon: "Heart",
    },
  ],

  // PAGE SECTIONS
  sections: [
    {
      title: "HR Automation",
      description:
        "Eliminate repetitive HR work with intelligent automation. From onboarding to payroll and compliance, GridWage automates your global HR workflows—freeing your people team to focus on strategy, engagement, and employee experience.",
      image: "/homepageService/eor.png",
      ctaLabel: "Explore HR Automation",
      ctaHref: "/demo",
    },
    {
      title: "People Analytics",
      description:
        "Gain data-driven visibility into your workforce. GridWage’s People Analytics delivers actionable insights into employee performance, turnover, and engagement—helping you make smarter, faster talent decisions.",
      image: "/homepageService/eor.png",
      ctaLabel: "See Analytics in Action",
      ctaHref: "/demo",
    },
    {
      title: "Talent Management",
      description:
        "Build, nurture, and retain world-class teams with GridWage’s end-to-end talent management tools. From hiring to development, we help HR teams foster growth, alignment, and retention across global workforces.",
      image: "/homepageService/eor.png",
      ctaLabel: "Discover Talent Tools",
      ctaHref: "/demo",
    },
  ],
};
