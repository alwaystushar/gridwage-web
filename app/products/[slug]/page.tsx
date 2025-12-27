// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/app/products/lib/productsData";
import { ProductHeroCTA, ProductSectionCTA } from "./ProductCTA";
import TextReveal from "@/app/Components/UI/TextReveal";
import ImageReveal from "@/app/Components/UI/ImageReveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | GridWage" };
  }

  return {
    title: `${product.title} | GridWage`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-[18vw] md:py-[6vw]">
        <div className="grid-container items-center gap-[4vw] md:gap-[3vw]">
          <div className="col-span-12 md:col-span-6">
            <span className="inline-flex items-center gap-[1.5vw] md:gap-[0.6vw] rounded-full bg-[var(--brand-50)] text-[var(--brand-600)]  py-[1vw] md:py-[0.5vw] text-[3vw] md:text-[0.9vw] ">

              {product.category}
            </span>

            <TextReveal className="text-[6vw] md:text-[3.5vw] lg:text-[2.8vw] font-medium leading-[1.2] mb-[2.5vw] md:mb-[1vw]">
              {product.title}
            </TextReveal>

            <TextReveal className="text-[4vw] md:text-[1.4vw] lg:text-[1.1vw] font-medium text-[var(--gray-0)] mb-[2vw] md:mb-[0.5vw]">
              {product.description}
            </TextReveal>

            <TextReveal className="text-[3.5vw] md:text-[1.1vw] lg:text-[0.95vw] text-[var(--gray-0)] mb-[5vw] md:mb-[2.5vw] max-w-full md:max-w-[40vw]">
              {product.longDescription}
            </TextReveal>

            <ProductHeroCTA
              primaryLabel={product.cta.primary}
              secondaryLabel={product.cta.secondary}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            {product.heroImage && (
              <ImageReveal
                src={product.heroImage}
                alt={product.title}
                className="w-full aspect-[4/3] rounded-[3vw] md:rounded-[1.5vw] bg-[var(--brand-50)]"
              />
            )}
          </div>
        </div>
      </section>

      {/* CARDS WITH LUCIDE ICONS */}
      <section id="cards-section" className="py-[8vw] md:py-[6vw] bg-[var(--brand-50)]">
        <div className="grid-container">
          <div className="col-span-12 text-center mb-[5vw] md:mb-[3vw]">
            <TextReveal className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-medium leading-[1.3] mb-[2.5vw] md:mb-[0.8vw] px-[4vw] md:px-0">
              Key capabilities for {product.shortTitle || product.title}
            </TextReveal>
            <TextReveal className="text-[3.5vw] md:text-[1.1vw] lg:text-[0.95vw] text-[var(--gray-0)] max-w-[85vw] md:max-w-[44vw] mx-auto">
              Everything you need to run {product.shortTitle || product.title} with
              ease.
            </TextReveal>
          </div>

          {product.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 mb-[3vw] md:mb-[2vw]">
                <div className="h-full rounded-[2.5vw] md:rounded-[1vw] bg-white border border-[var(--brand-100)] p-[4vw] md:p-[1.8vw] hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] hover:-translate-y-[0.3vw] transition-all duration-300">
                  <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full bg-[var(--brand-50)] flex items-center justify-center mb-[2.5vw] md:mb-[1vw]">
                    <Icon className="w-[5vw] h-[5vw] md:w-[1.6vw] md:h-[1.6vw] text-[var(--brand-600)]" />
                  </div>

                  <TextReveal className="text-[4vw] md:text-[1.2vw] lg:text-[1.05vw] font-semibold mb-[1.5vw] md:mb-[0.6vw]">
                    {card.title}
                  </TextReveal>

                  <TextReveal className="text-[3.5vw] md:text-[1.05vw] lg:text-[0.9vw] text-[var(--gray-0)]">
                    {card.description}
                  </TextReveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ALTERNATING SECTIONS */}
      <section className="py-[8vw] md:py-[6vw]">
        <div className="grid-container gap-[6vw] md:gap-[4vw]">
          {product.sections.map((section, index) => {
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
                  <TextReveal className="text-[5.5vw] md:text-[2.5vw] lg:text-[2vw] font-medium leading-[1.3] mb-[2.5vw] md:mb-[0.8vw]">
                    {section.title}
                  </TextReveal>
                  <TextReveal className="text-[3.5vw] md:text-[1.1vw] lg:text-[0.95vw] text-[var(--gray-0)] mb-[4vw] md:mb-[1.5vw] max-w-full md:max-w-[36vw]">
                    {section.description}
                  </TextReveal>

                  {section.ctaLabel && section.ctaHref && (
                    <ProductSectionCTA
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
