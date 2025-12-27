// app/products/lib/productTypes.ts
import type { LucideIcon } from "lucide-react";

export interface ProductCard {
  title: string;
  description: string;
  icon: LucideIcon; // ✅ correct type
}

export interface ProductSection {
  title: string;
  description: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Product {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  longDescription: string;
  category: string;
  emoji: string;
  heroImage?: string;
  cards: ProductCard[];
  sections: ProductSection[];
  cta: {
    primary: string;
    secondary: string;
  };
}
