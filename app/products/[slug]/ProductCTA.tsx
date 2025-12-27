// app/products/[slug]/ProductCTA.tsx
"use client";

import MagneticButton from "@/app/Components/UI/MagneticButton";

interface ProductHeroCTAProps {
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  scrollToId?: string;
}

export function ProductHeroCTA({
  primaryLabel,
  secondaryLabel,
  primaryHref = "/contact",
  secondaryHref,
  scrollToId = "cards-section",
}: ProductHeroCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-[2.5vw] sm:gap-[2vw] md:gap-[1vw]">
      <MagneticButton
        variant="primary"
        onClick={() => (window.location.href = primaryHref)}
        className="w-full sm:w-auto"
      >
        {primaryLabel}
      </MagneticButton>

      <MagneticButton
        variant="secondary"
        onClick={() => {
          if (secondaryHref) {
            window.location.href = secondaryHref;
            return;
          }
          const el = document.getElementById(scrollToId);
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="w-full sm:w-auto"
      >
        {secondaryLabel}
      </MagneticButton>
    </div>
  );
}

interface ProductSectionCTAProps {
  label: string;
  href: string;
}

export function ProductSectionCTA({ label, href }: ProductSectionCTAProps) {
  return (
    <MagneticButton
      variant="secondary"
      onClick={() => (window.location.href = href)}
      className="w-full sm:w-auto"
    >
      {label}
    </MagneticButton>
  );
}
