"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import ContactFormModal from "@/app/Components/ContactFormModal";
import TextReveal from "@/app/Components/UI/TextReveal";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import PayrollOverview, { PayrollData } from "./lib/PayrollOverview";
import PayrollCycleCard, { CycleStep } from "./lib/PayrollCycleCard ";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DATA CONFIGURATION
// ============================================

const payrollData: PayrollData[] = [
  {
    id: "1",
    country: "USA",
    flagSrc: "/homepageService/us.png",
    employees: 12,
    amount: 83000,
    currency: "$",
  },
  {
    id: "2",
    country: "South Africa",
    flagSrc: "/homepageService/Africa.png",
    employees: 8,
    amount: 42000,
    currency: "R ",
  },
  {
    id: "3",
    country: "India",
    flagSrc: "/homepageService/india.png",
    employees: 21,
    amount: 1890000,
    currency: "₹",
  },
  {
    id: "4",
    country: "Singapore",
    flagSrc: "/homepageService/singapur.png",
    employees: 5,
    amount: 28000,
    currency: "S$ ",
  },
];

const cycleSteps: CycleStep[] = [
  {
    id: "1",
    label: "Data Collection",
    status: "completed",
  },
  {
    id: "2",
    label: "Tax Calculation",
    status: "auto",
  },
  {
    id: "3",
    label: "Cross-border Transfers",
    status: "in-progress",
  },
  {
    id: "4",
    label: "Payslips",
    status: "scheduled",
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function ServiceSection() {
  // ============================================
  // STATE
  // ============================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLoading } = useLoading();

  // ============================================
  // REFS
  // ============================================
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  // ============================================
  // EFFECTS
  // ============================================

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP Animation effect
  useEffect(() => {
    if (!mounted || isLoading || !sectionRef.current) return;

    const setupTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // 1. Image fade in (0.3s)
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: "power3.out" },
            0.3
          );
        }

        // 2. Image mask reveal (0.5s)
        if (imageMaskRef.current) {
          tl.fromTo(
            imageMaskRef.current,
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.2,
              ease: "power3.inOut",
            },
            0.5
          );
        }

        // 3. Buttons fade up (1.2s)
        if (buttonsRef.current) {
          tl.fromTo(
            buttonsRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
            1.2
          );
        }

        // 4. Payroll Overview fade from right (1.4s)
        if (avatarsRef.current) {
          tl.fromTo(
            avatarsRef.current,
            { autoAlpha: 0, x: 30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            1.4
          );
        }

        // 5. Payroll Cycle Card slide from left (1.6s)
        if (statRef.current) {
          tl.fromTo(
            statRef.current,
            { autoAlpha: 0, x: -30, scale: 0.9 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            1.6
          );
        }
      }, sectionRef);

      return () => {
        clearTimeout(setupTimer);
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(setupTimer);
  }, [mounted, isLoading]);

  // ============================================
  // LOADING STATE
  // ============================================
  if (!mounted || isLoading) {
    return (
      <section className="w-full py-[10vw] md:py-[1vw] from-gray-50 to-white">
        <div className="grid-container items-center">
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-[3vw] md:gap-[1.5vw]">
            <div className="h-[2vw] md:h-[1vw] bg-gray-200 animate-pulse rounded w-[40%]"></div>
            <div className="h-[8vw] md:h-[4vw] bg-gray-200 animate-pulse rounded w-[90%]"></div>
            <div className="h-[6vw] md:h-[3vw] bg-gray-200 animate-pulse rounded w-[80%]"></div>
            <div className="h-[4vw] md:h-[2vw] bg-gray-200 animate-pulse rounded w-[95%]"></div>
          </div>
          <div className="col-span-12 lg:col-span-7 mt-[8vw] lg:mt-0">
            <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-[2.5vw] md:rounded-[1.2vw]"></div>
          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <section ref={sectionRef} className="w-full py-[10vw] md:py-[5vw]">
        <div className="grid-container items-center">
          {/* ============================================ */}
          {/* LEFT CONTENT - 6 COLUMNS (Order 1 mobile) */}
          {/* ============================================ */}
          <div className="col-span-12 lg:col-span-6 relative mt-[8vw] lg:mt-0 mb-[10vw] md:mb-[4vw] order-1">
            {/* Image Container */}
            <div
              ref={imageRef}
              className="relative rounded-[2.5vw] md:rounded-[1.2vw] overflow-visible"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {/* Image with Mask */}
              <div
                className="rounded-[2.5vw] md:rounded-[1.2vw] overflow-hidden"
                ref={imageMaskRef}
                style={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/homepageService/gp.png"
                  alt="Global Payroll"
                  className="w-full h-[35vw] md:h-[42vw] object-cover"
                />
              </div>

              {/* Payroll Overview - Top Right */}
              <div className="absolute top-[3vw] right-[3vw] md:top-[-3vw] md:right-[-3vw] z-10">
                <PayrollOverview payrollData={payrollData} payrollRef={avatarsRef} />
              </div>

              {/* Payroll Cycle Card - Bottom Left */}
              <div className="absolute bottom-[-8vw] left-[5vw] md:bottom-[2vw] md:left-[-4vw] z-10">
                <PayrollCycleCard
                  title="Payroll Cycle — Automated"
                  steps={cycleSteps}
                  cycleRef={statRef}
                />
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT CONTENT - 6 COLUMNS (Order 2 mobile) */}
          {/* ============================================ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-[3vw] md:gap-[2vw] order-2">
            <div>
              {/* Label */}
              <TextReveal
                className="text-[3.5vw] md:text-[0.85vw] font-semibold text-[var(--brand-500)] uppercase tracking-wider"
                delay={0}
                duration={0.6}
                stagger={0.05}
                lineHeight="1.2"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <p>Global Payroll</p>
              </TextReveal>

              {/* Heading */}
              <TextReveal
                className="h4 font-medium text-[var(--text)]"
                delay={0.5}
                stagger={0.15}
                lineHeight="1.25"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <h1>
                  International <br /> payroll made easy.
                </h1>
              </TextReveal>

              {/* Description */}
              <TextReveal
                className="text-[4vw] md:text-[1.05vw] text-[var(--gray-0)] leading-[1.65] max-w-[90vw] md:max-w-[32vw] mt-[2vw] md:mt-[1vw]"
                delay={1}
                duration={1.8}
                stagger={0.03}
                lineHeight="1.65"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <p>
                  Run accurate, compliant, multi-currency payroll across 140+ countries through{" "}
                  <span className="text-[var(--brand-500)]">GridWage&apos;s</span> intelligent
                  platform—built to eliminate manual work, errors, and regional complexity.
                </p>
              </TextReveal>
            </div>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-[3vw] md:gap-[1.2vw] mt-[2vw] md:mt-[1vw]"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <MagneticButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
              >
                Get Started
              </MagneticButton>

              <MagneticButton href="/learn-more" variant="secondary">
                Learn More
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MODAL */}
      {/* ============================================ */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
