"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import TextReveal from "@/app/Components/UI/TextReveal";
import MagneticButton from "@/app/Components/UI/MagneticButton";

export default function HeroLeft() {
  const { isLoading } = useLoading();
  const descriptionRef = useRef(null);
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && mounted) {
      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 1.8, ease: "power3.out" }
        );
      }

      // Animate input
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 2.2, ease: "power3.out" }
        );
      }
    }
  }, [isLoading, mounted]);

  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div>
      {/* Small Title */}
      <TextReveal
        className="b4 text-[var(--brand-600)]  lg:mb-0 mb-[2vw]"
        delay={1.2}
        duration={0.6}
        lineHeight="1.4"
        triggerOnLoad={true}
      >
        Welcome To GridWage
      </TextReveal>

      {/* Main Heading */}
      <TextReveal
        className="h4 font-medium text-[var(--text)]  "
        delay={0.5}
        stagger={0.15}
        lineHeight="1.25"
        triggerOnLoad={true}
      >
        The Power <span className="text-[var(--brand-700)]">Gird</span> for Global{" "}
        <span className="text-[var(--brand-700)]">Wages</span>
      </TextReveal>

      {/* Description - Simple fade up, no line splitting */}
      <p
        ref={descriptionRef}
        className="b3 text-[var(--gray-0)] lg:mt-[1vw] mt-[6vw] lg:mb-[3vw] mb-[8vw] leading-[1.6] lg:max-w-[80%] opacity-0"
      >
        GridWage simplifies global hiring and payroll with seamless, compliant EOR
        solutions—helping you build and manage teams anywhere with ease.
      </p>

      {/* Email Input */}
      <div 
        ref={inputRef} 
        className="flex items-center gap-[0.5vw] lg:mb-[4vw] mb-[8vw] opacity-0 border-[0.12vw] border-[var(--brand-600)]/30 rounded-full lg:p-[0.2vw] p-[1vw] bg-[var(--white)] focus-within:border-[var(--brand-600)]/100 transition-all duration-300 lg:max-w-[30vw]"
      >
        <input
          type="email"
          placeholder="Enter Email"
          className="b3 flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--brand-100)] rounded-full border-none outline-none px-[2vw] pl-[1.5vw] py-[0.7vw]"
        />
        <MagneticButton variant="primary">Request Demo</MagneticButton>
      </div>

      {/* Trusted By Title */}
      <TextReveal
        className="b4 text-[var(--gray-0)] lg:mb-[1.5vw] mb-[5.5vw]"
        delay={2.4}
        duration={0.6}
        triggerOnLoad={true}
      >
        Trusted by 10+ companies
      </TextReveal>

      {/* Company Names */}
      <div className="flex items-center flex-wrap gap-[3vw]">
        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2.6}
          duration={0.5}
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">TechCrunch</span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2.7}
          duration={0.5}
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">WSJ</span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2.8}
          duration={0.5}
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">Financial Times</span>
        </TextReveal>

        <TextReveal
          className="flex items-center h-[2vw]"
          delay={2.9}
          duration={0.5}
          triggerOnLoad={true}
        >
          <span className="b3 font-bold text-[var(--text)] opacity-60">NBC</span>
        </TextReveal>
      </div>
    </div>
  );
}
