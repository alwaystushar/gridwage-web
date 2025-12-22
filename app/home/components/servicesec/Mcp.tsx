"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import ContactFormModal from "@/app/Components/ContactFormModal";
import TextReveal from "@/app/Components/UI/TextReveal";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import PriorityMetrics, { MetricItem } from "./lib/PriorityMetrics";
import WorldMap, { MapLocation } from "./lib/MapLocation";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DATA CONFIGURATION
// ============================================

const metricsData: MetricItem[] = [
  {
    id: "1",
    label: "Payout Speed",
    value: "High",
    priority: "high",
  },
  {
    id: "2",
    label: "Compliance",
    value: "Critical",
    priority: "critical",
  },
  {
    id: "3",
    label: "Agreements",
    value: "Medium",
    priority: "medium",
  },
];

const mapLocations: MapLocation[] = [
  {
    id: "1",
    name: "San Francisco, USA",
    x: 20,
    y: 35,
  },
  {
    id: "2",
    name: "New York, USA",
    x: 62,
    y: 32,
  },
  {
    id: "3",
    name: "Mexico City",
    x: 32,
    y: 65,
  },
  {
    id: "4",
    name: "London, UK",
    x: 53,
    y: 58,
  },
  {
    id: "5",
    name: "Singapore",
    x: 67,
    y: 48,
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

        // 4. Top Priority Metrics fade from left (1.4s)
        if (avatarsRef.current) {
          tl.fromTo(
            avatarsRef.current,
            { autoAlpha: 0, x: -30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            1.4
          );
        }

        // 5. Bottom World Map slide from left (1.6s)
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
      <section ref={sectionRef} className="w-full pt-[10vw] md:pt-[1vw]">
        <div className="grid-container items-center">
          {/* ============================================ */}
          {/* LEFT CONTENT - 6 COLUMNS */}
          {/* ============================================ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-[3vw] md:gap-[2vw]">
            <div>
              {/* Label */}
              <TextReveal
                className="b3 font-semibold text-[var(--brand-500)] uppercase tracking-wider md:mb-0 mb-[2vw]"
                delay={0}
                duration={0.6}
                stagger={0.05}
                lineHeight="1.2"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <p>Manage Contractors Payments</p>
              </TextReveal>

              {/* Heading */}
              <TextReveal
                className="h3 font-medium text-[var(--text)] md:mb-0 mb-[8vw]"
                delay={0.5}
                stagger={0.15}
                lineHeight="1.25"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <h2>
                  Global contractor <br /> Payroll, simplified.
                </h2>
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
                  Onboard independent contractors instantly, streamline
                  agreements, and enable fast, secure payments in any
                  currency—powered by{" "}
                  <span className="text-[var(--brand-500)]">
                    GridWage&apos;s
                  </span>{" "}
                  advanced contractor management engine.
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

          {/* ============================================ */}
          {/* RIGHT CONTENT - 6 COLUMNS */}
          {/* ============================================ */}
          <div className="col-span-12 lg:col-span-6 relative mt-[8vw] lg:mt-0 mb-[10vw] md:mb-[4vw]">
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
                  src="/homepageService/mcp.png"
                  alt="Contractor Management"
                  className="w-full h-[100vw] md:h-[42vw] object-cover"
                />
              </div>

              {/* Priority Metrics - Top Left */}
              <div className="absolute top-[-3vw] left-[-3vw] md:top-[3vw] md:left-[-7vw] z-10">
                <PriorityMetrics
                  metrics={metricsData}
                  metricsRef={avatarsRef}
                />
              </div>

              {/* World Map - Bottom Left */}
              <div className="absolute bottom-[-8vw] right-[-2vw] md:bottom-[3vw] md:right-[-3vw] z-10">
                <WorldMap locations={mapLocations} mapRef={statRef} />
              </div>
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
