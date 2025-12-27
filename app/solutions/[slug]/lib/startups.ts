// app/solutions/lib/startups.ts
import type { Solution } from "./solutionTypes";

export const startupsSolution: Solution = {
  slug: "startups",
  title: "Solutions for Startups",
  shortTitle: "Startups",
  description: "Scale your team globally without the overhead.",
  longDescription:
    "From your first international hire to building distributed teams, GridWage helps startups expand globally with compliant hiring, payroll, and benefits—all in one platform.",
  category: "For Startups",
  heroImage: "/images/solutions/startups-hero.png",
  cta: {
    primary: "Get started",
    secondary: "See how it works",
  },
  cards: [
    {
      title: "Hire anywhere",
      description: "Employ full-time talent in 150+ countries without setting up entities.",
      icon: "Globe2",
    },
    {
      title: "Stay lean",
      description: "Avoid the cost and complexity of multiple HR and legal vendors.",
      icon: "TrendingDown",
    },
    {
      title: "Move fast",
      description: "Onboard international hires in days, not months.",
      icon: "Zap",
    },
    {
      title: "Founder-friendly",
      description: "Simple pricing and transparent processes built for early-stage teams.",
      icon: "Heart",
    },
    {
      title: "Equity made easy",
      description: "Grant stock options to global employees with built-in equity tools.",
      icon: "TrendingUp",
    },
    {
      title: "Expert support",
      description: "Get answers from HR and compliance specialists when you need them.",
      icon: "Users",
    },
  ],
sections: [
  {
    title: "Quick Global Expansion",
    description:
      "Expand into new markets at lightning speed with GridWage. Our EOR and payroll infrastructure help startups and scaleups hire employees or contractors globally—without setting up entities or dealing with complex local laws. Focus on growing your business while we manage compliance, payroll, and onboarding behind the scenes.",
    image: "/homepageService/eor.png",
    ctaLabel: "Start Expansion Demo",
    ctaHref: "/demo",
  },
  {
    title: "Cost-Effective Hiring",
    description:
      "Reduce hiring and operational costs while accessing world-class talent. GridWage eliminates the need for expensive legal setups and third-party intermediaries, helping startups hire globally with transparent pricing, automated workflows, and zero hidden fees.",
    image: "/homepageService/eor.png",
    ctaLabel: "Explore Hiring Demo",
    ctaHref: "/demo",
  },
  {
    title: "Rapid Team Scaling",
    description:
      "Build and manage distributed teams at startup speed. GridWage’s all-in-one global employment platform lets you onboard, pay, and manage talent anywhere—instantly and compliantly. Scale your workforce globally without slowing down innovation.",
    image: "/homepageService/eor.png",
    ctaLabel: "View Scaling Demo",
    ctaHref: "/demo",
  },
],

};
