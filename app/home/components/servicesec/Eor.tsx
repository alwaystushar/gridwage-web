"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import ContactFormModal from "@/app/Components/ContactFormModal";
import TextReveal from "@/app/Components/UI/TextReveal";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import AvatarStack, { AvatarData } from "./lib/AvatarStack";
import StatCard from "./lib/StatCard";
import { img } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

// Avatar data configuration
const avatarData: AvatarData[] = [
  {
    id: "1",
    avatarSrc: "/homepageService/avtar1.png",
    name: "Belinda",
    countrySrc: "/homepageService/Aus.png",
    countryName: "Australia",
  },
  {
    id: "2",
    avatarSrc: "/homepageService/avtar2.png",
    name: "Belinda",
    countrySrc: "/homepageService/Africa.png",
    countryName: "South Africa",
  },
  {
    id: "3",
    avatarSrc: "/homepageService/avtar3.png",
    name: "Belinda",
    countrySrc: "/homepageService/Canada.png",
    countryName: "Canada",
  },
];

const GWIcon = () => (
  <img 
    src="/homepageService/gw.svg" 
    alt="GW" 
    className="w-full h-full object-contain"
  />
);

export default function ServiceSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLoading } = useLoading();

  // Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for loading to complete and component to mount
    if (!mounted || isLoading || !sectionRef.current) return;

    // Small delay to ensure ScrollTrigger calculations are correct
    const setupTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // Animate buttons
        if (buttonsRef.current) {
          tl.fromTo(
            buttonsRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
            1.2
          );
        }

        // Animate image container
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: "power3.out" },
            0.3
          );
        }

        // Animate image mask reveal (left to right)
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

        // Animate avatar cards with stagger
        const avatarCards = avatarsRef.current?.querySelectorAll(".avatar-card");
        if (avatarCards && avatarCards.length > 0) {
          tl.fromTo(
            avatarCards,
            { autoAlpha: 0, x: 30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            },
            1.4
          );
        }

        // Animate stat card
        if (statRef.current) {
          tl.fromTo(
            statRef.current,
            { autoAlpha: 0, y: 30, scale: 0.9 },
            {
              autoAlpha: 1,
              y: 0,
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

  return (
    <>
      <section ref={sectionRef} className="w-full py-[10vw] md:py-[5vw]">
        <div className="grid-container items-center">
          {/* Left Content - 6 columns */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-[3vw] md:gap-[2vw]">
            <div>
              <TextReveal
                className="text-[3.5vw] md:text-[0.85vw] font-semibold text-[var(--brand-500)] uppercase tracking-wider"
                delay={0}
                duration={0.6}
                stagger={0.05}
                lineHeight="1.2"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <p>Employer of Record</p>
              </TextReveal>

              {/* Main Heading (H1) with TextReveal */}
              <TextReveal
                className="h4 font-medium text-[var(--text)]"
                delay={0.5}
                stagger={0.15}
                lineHeight="1.25"
                triggerOnLoad={false}
                scrollStart="top 95%"
              >
                <h1>
                  Hire globally with <br /> zero entity setup.
                </h1>
              </TextReveal>

              {/* Paragraph with TextReveal */}
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
                <span className="text-(--brand-500)">GridWage&apos;s</span>   EOR infrastructure lets you onboard full-time
                  employees anywhere, while we handle local labour laws,
                  contracts, payroll, and taxes with absolute precision.
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

          {/* Right Content - 6 columns */}
          <div className="col-span-12 lg:col-span-6 relative mt-[8vw] lg:mt-0 mb-[10vw] md:mb-[4vw]">
            {/* Main Image Container with Mask */}
            <div
              ref={imageRef}
              className="relative rounded-[2.5vw] md:rounded-[1.2vw] overflow-visible"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div
                className="rounded-[2.5vw] md:rounded-[1.2vw] overflow-hidden"
                ref={imageMaskRef}
                style={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/homepageService/eor.png"
                  alt="Team collaboration"
                  className="w-full h-[35vw] md:h-[42vw] object-cover"
                />
              </div>

              {/* Avatar Stack positioned on top right */}
              <div className="absolute top-[3vw] right-[3vw] md:top-[-3vw] md:right-[-3vw] z-10">
                <AvatarStack avatars={avatarData} avatarsRef={avatarsRef} />
              </div>

              {/* Stat Card positioned at bottom */}
              <div className="absolute bottom-[-8vw] left-[10%] md:bottom-[3vw] md:left-[-8vw] z-10">
                <StatCard
                  value="72"
                  unit="%"
                  description="Faster expansion into new regions."
                  icon={<GWIcon />}
                  statRef={statRef}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
