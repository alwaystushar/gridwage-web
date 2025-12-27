// app/solutions/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getSolutionBySlug, getAllSolutions } from "./lib/solutionsData";
import { SolutionHeroCTA, SolutionSectionCTA } from "./SolutionCTA";
import TextReveal from "@/app/Components/UI/TextReveal";
import ImageReveal from "@/app/Components/UI/ImageReveal";
import {
  Globe2,
  ShieldCheck,
  CreditCard,
  Rocket,
  FileText,
  Users,
  Briefcase,
  TrendingDown,
  Zap,
  Heart,
  TrendingUp,
  Layers,
  Shield,
  Settings,
  BarChart3,
  Headphones,
  Link,
  Coins,
  CheckSquare,
  Eye,
  type LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Globe2,
  ShieldCheck,
  CreditCard,
  Rocket,
  FileText,
  Users,
  Briefcase,
  TrendingDown,
  Zap,
  Heart,
  TrendingUp,
  Layers,
  Shield,
  Settings,
  BarChart3,
  Headphones,
  Link,
  Coins,
  CheckSquare,
  Eye,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSolutions().map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | GridWage",
      description: "The solution you're looking for could not be found.",
    };
  }

  const ogImage = solution.heroImage || "/og-default.png";
  const siteUrl = "https://gridwage.com";

  return {
    title: `${solution.title} | GridWage`,
    description: solution.description,
    keywords: [
      solution.title,
      solution.category,
      "global workforce",
      "international hiring",
      "compliance",
      "remote teams",
      "GridWage",
    ],
    authors: [{ name: "GridWage" }],
    openGraph: {
      title: `${solution.title} | GridWage`,
      description: solution.description,
      url: `${siteUrl}/solutions/${slug}`,
      siteName: "GridWage",
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: solution.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | GridWage`,
      description: solution.description,
      images: [`${siteUrl}${ogImage}`],
      creator: "@gridwage",
    },
    alternates: {
      canonical: `${siteUrl}/solutions/${slug}`,
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) notFound();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-[18vw] md:py-[6vw]">
        <div className="grid-container items-center gap-[4vw] md:gap-[3vw]">
          <div className="col-span-12 md:col-span-6 ">
            <span className="inline-flex items-center gap-[1.5vw] md:gap-[0.6vw] rounded-full bg-[var(--brand-50)] text-[var(--brand-600)]  py-[1vw] md:py-[0.5vw] text-[3vw] md:text-[0.9vw] ">
              {solution.category}
            </span>

            <TextReveal className="h4 md:text-[3.5vw] font-medium leading-[1.2] mb-[2.5vw] md:mb-[1vw]">
              {solution.title}
            </TextReveal>

            <div className="md:max-w-[80%]">
              <TextReveal
                lineHeight="1.6"
                className="b3 font-medium text-[var(--gray-0)] mb-[2vw] md:mb-[0.5vw]"
              >
                {solution.description}
              </TextReveal>

              <TextReveal
                lineHeight="1.6"
                className="b3 text-[var(--gray-0)] mb-[5vw] md:mb-[2.5vw] max-w-full md:max-w-[40vw]"
              >
                {solution.longDescription}
              </TextReveal>
            </div>

            <SolutionHeroCTA
              primaryLabel={solution.cta.primary}
              secondaryLabel={solution.cta.secondary}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            {solution.heroImage && (
              <ImageReveal
                src={solution.heroImage}
                alt={solution.title}
                className="w-full aspect-[5/4]  "
              />
            )}
          </div>
        </div>
      </section>

      {/* CARDS WITH LUCIDE ICONS */}
      <section id="cards-section" className="py-[8vw] md:py-[6vw] bg-[var(--brand-50)]">
        <div className="grid-container">
          <div className="col-span-12 text-center mb-[5vw] md:mb-0">
            <TextReveal className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-medium leading-[1.3] mb-[2.5vw] md:mb-[0.8vw] px-[4vw] md:px-0">
              Why {solution.shortTitle || solution.title} choose GridWage
            </TextReveal>
            <TextReveal className="text-[3.5vw] md:text-[1.1vw] lg:text-[0.95vw] text-[var(--gray-0)] max-w-[85vw] md:max-w-[44vw] mx-auto">
              Everything you need to build and manage a global team.
            </TextReveal>
          </div>

          {/* Mobile: Horizontal scroll | Desktop: Grid */}
          <div className="col-span-12">
            <div className="flex md:grid md:grid-cols-12 gap-[3vw] md:gap-[2vw] overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-[2vw] md:pb-0 -mx-[4vw] px-[4vw] md:mx-0 md:px-0">
              {solution.cards.map((card, index) => {
                const IconComponent = iconMap[card.icon] || Globe2;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[75vw] sm:w-[60vw] md:w-auto md:col-span-4 snap-center md:snap-align-none group"
                  >
                    <div className="relative h-full rounded-[2.5vw] md:rounded-[1vw] border border-[var(--brand-100)] bg-white p-[4vw] md:p-[1.8vw] overflow-hidden transition-all duration-300">
                      {/* Background color fill animation */}
                      <div className="absolute inset-0 bg-[var(--brand-600)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>

                      {/* Icon container */}
                      <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-[2.5vw] md:rounded-[0.5vw] bg-[var(--brand-800)] group-hover:bg-none flex items-center justify-center mb-[2.5vw] md:mb-[1vw] transition-colors duration-500 relative z-10">
                        <IconComponent className="w-[5vw] h-[5vw] md:w-[2vw] md:h-[2vw] text-[var(--brand-0)] transition-transform duration-500 group-hover:scale-110" />
                      </div>

                      {/* Title */}
                      <TextReveal className="text-[4vw] md:text-[1.2vw] lg:text-[1.05vw] font-semibold mb-[1.5vw] md:mb-[0.6vw] relative z-10 group-hover:text-white transition-colors duration-500">
                        {card.title}
                      </TextReveal>

                      {/* Description */}
                      <TextReveal className="text-[3.5vw] md:text-[1.05vw] lg:text-[0.9vw] text-[var(--gray-0)] relative z-10 group-hover:text-[var(--brand-0)] transition-colors duration-500">
                        {card.description}
                      </TextReveal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING SECTIONS */}
      <section className="py-[8vw] md:py-[6vw]">
        <div className="grid-container gap-[6vw] md:gap-[4vw]">
          {solution.sections.map((section, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="col-span-12 grid grid-cols-12 items-center gap-[5vw] md:gap-[3vw] mb-[6vw] md:mb-[4vw]"
              >
                <div
                  className={
                    isEven
                      ? "col-span-12 md:col-span-6 order-2 md:order-1"
                      : "col-span-12 md:col-span-6 order-2"
                  }
                >
                  <TextReveal className="h4 font-medium leading-[1.3] mb-[2.5vw] md:mb-[0.8vw]">
                    {section.title}
                  </TextReveal>
                  <TextReveal
                    lineHeight="1.6"
                    className="b3 text-[var(--gray-0)] mb-[4vw] md:mb-[1.5vw] max-w-full md:max-w-[36vw]"
                  >
                    {section.description}
                  </TextReveal>

                  {section.ctaLabel && section.ctaHref && (
                    <SolutionSectionCTA
                      label={section.ctaLabel}
                      href={section.ctaHref}
                    />
                  )}
                </div>

                <div
                  className={
                    isEven
                      ? "col-span-12 md:col-span-6 order-1 md:order-2"
                      : "col-span-12 md:col-span-6 order-1"
                  }
                >
                  <ImageReveal
                    src={section.image}
                    alt={section.title}
                    className="w-full aspect-[4/3] rounded-[3vw] md:rounded-[1.5vw] bg-[var(--brand-50)]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
