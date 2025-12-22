"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import TextReveal from "@/app/Components/UI/TextReveal";
import EmailCtaInput from "@/app/Components/UI/EmailCtaInput";

export default function HeroLeft() {
  const { isLoading } = useLoading();
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const emailWrapperRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // ensure client-only render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    const descEl = descriptionRef.current;
    const emailEl = emailWrapperRef.current;

    if (descEl) {
      gsap.fromTo(
        descEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1.2, ease: "power3.out" } // 0.6 → 1.2
      );
    }

    if (emailEl) {
      gsap.fromTo(
        emailEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1.3, ease: "power3.out" } // 0.6 → 1.2
      );
    }
  }, [mounted, isLoading]);

  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div className="lg:mt-[4vw] mt-0">
      {/* Small Title */}
      <TextReveal
        className="b4 text-[var(--brand-600)] lg:mb-0 mb-[2vw]"
        delay={1.2}
        duration={1.0} // 0.6 → 1.0
        lineHeight="1.4"
        triggerOnLoad={true}
      >
        <h1>Welcome To GridWage</h1>
      </TextReveal>

      {/* Main Heading */}
      <TextReveal
        className="h4 font-medium text-[var(--text)]"
        delay={0.5}
        stagger={0.25} // 0.15 → 0.25 (slower character stagger)
        duration={1.0} // 0.6 → 1.0
        lineHeight="1.25"
        triggerOnLoad={true}
      >
        The Power <span className="text-[var(--brand-700)]">Gird</span> for
        Global <span className="text-[var(--brand-700)]">Wages</span>
      </TextReveal>

      {/* Description */}
      <p
        ref={descriptionRef}
        className="b3 text-[var(--gray-0)] lg:mt-[1vw] mt-[6vw] lg:mb-[3vw] mb-[8vw] leading-[1.6] lg:max-w-[82%] opacity-0"
      >
        GridWage simplifies global hiring and payroll with seamless, compliant
        EOR solutions—helping you build and manage teams anywhere with ease.
      </p>

      {/* Email Input */}
      <div ref={emailWrapperRef} className="opacity-0 lg:mb-[10vw] mb-[22vw]">
        <EmailCtaInput />
      </div>

      {/* Trusted By Title */}
      <TextReveal
        className="b4 text-[var(--gray-0)] lg:mb-[1.5vw] mb-[5.5vw]"
        delay={1.4}
        duration={1.0} // 0.6 → 1.0
        triggerOnLoad={true}
      >
        Trusted by 10+ companies
      </TextReveal>

      {/* Company Names */}
      <div className="flex items-center flex-wrap gap-[3vw]">
        <TextReveal
          className="flex items-center h-[2vw]"
          delay={1.6}
          duration={0.8} // 0.5 → 0.8
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">
            TechCrunch
          </span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={1.8} // 2.7 → 2.9 (slightly slower stagger)
          duration={0.8} // 0.5 → 0.8
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">
            WSJ
          </span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2} // 2.8 → 3.2
          duration={0.8} // 0.5 → 0.8
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">
            Financial Times
          </span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2.2} // 2.9 → 3.5
          duration={0.8} // 0.5 → 0.8
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">
            NBC
          </span>
        </TextReveal>
      </div>
    </div>
  );
}
