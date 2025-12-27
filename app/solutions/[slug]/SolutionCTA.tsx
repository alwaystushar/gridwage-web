// app/solutions/[slug]/SolutionCTA.tsx
"use client";

import MagneticButton from "@/app/Components/UI/MagneticButton";

interface SolutionHeroCTAProps {
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  scrollToId?: string;
}

export function SolutionHeroCTA({
  primaryLabel,
  secondaryLabel,
  primaryHref = "/contact",
  secondaryHref,
  scrollToId = "cards-section",
}: SolutionHeroCTAProps) {
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
        className=""
      >
        {secondaryLabel}
      </MagneticButton>
    </div>
  );
}

interface SolutionSectionCTAProps {
  label: string;
  href: string;
}

export function SolutionSectionCTA({ label, href }: SolutionSectionCTAProps) {
  return (
    <MagneticButton
      variant="secondary"
      onClick={() => (window.location.href = href)}
      className=""
    >
      {label}
    </MagneticButton>
  );
}
