// app/solutions/lib/solutionTypes.ts

export interface SolutionCard {
  title: string;
  description: string;
  icon: string; // String name of Lucide icon
}

export interface SolutionSection {
  title: string;
  description: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Solution {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  longDescription: string;
  category: string;
  heroImage?: string;
  cards: SolutionCard[];
  sections: SolutionSection[];
  cta: {
    primary: string;
    secondary: string;
  };
}
