"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import ContactFormModal from "@/app/Components/ContactFormModal";
import TextReveal from "@/app/Components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0
      );

      // Animate paragraph
      tl.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      );

      // Animate buttons
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        1.0
      );

      // Animate image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.3
      );

      // Animate badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.8
      );

      // Animate avatars
      const avatarCards = avatarsRef.current?.querySelectorAll(".avatar-card");
      if (avatarCards) {
        tl.fromTo(
          avatarCards,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          0.9
        );
      }

      // Animate stat card
      tl.fromTo(
        statRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        1.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full py-[10vw] md:py-[5vw] bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="grid-container items-center">
          {/* Left Content - 5 columns */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-[3vw] md:gap-[1.5vw]">
            {/* Eyebrow Text */}
            <p
              ref={eyebrowRef}
              className="text-[3.5vw] md:text-[0.85vw] font-semibold text-[var(--brand-500)] uppercase tracking-wider"
              style={{ opacity: 0 }}
            >
              Employer of Record
            </p>

            {/* Main Heading with TextReveal */}
            <TextReveal
              className="text-[9vw] md:text-[3.8vw] font-bold text-[var(--text)]"
              delay={0.2}
              duration={0.8}
              stagger={0.05}
              lineHeight="1.1"
            >
              Hire globally with
            </TextReveal>

            {/* Subheading with TextReveal */}
            <TextReveal
              className="text-[9vw] md:text-[3.8vw] font-bold text-[var(--text)]"
              delay={0.5}
              duration={0.8}
              stagger={0.05}
              lineHeight="1.1"
            >
              zero entity setup.
            </TextReveal>

            {/* Paragraph */}
            <p
              ref={paragraphRef}
              className="text-[4vw] md:text-[1.05vw] text-[var(--gray-0)] leading-[1.65] max-w-[90vw] md:max-w-[32vw] mt-[2vw] md:mt-[1vw]"
              style={{ opacity: 0 }}
            >
              GridWage's EOR infrastructure lets you onboard full-time employees anywhere, while we handle local labour laws, contracts, payroll, and taxes with absolute precision.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-[3vw] md:gap-[1.2vw] mt-[2vw] md:mt-[1vw]"
              style={{ opacity: 0 }}
            >
              <MagneticButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
              >
                Onboard employee
              </MagneticButton>

              <MagneticButton href="/learn-more" variant="secondary">
                Learn More
              </MagneticButton>
            </div>
          </div>

          {/* Right Content - 7 columns */}
          <div className="col-span-12 lg:col-span-7 relative mt-[8vw] lg:mt-0">
            {/* Main Image Container */}
            <div
              ref={imageRef}
              className="relative rounded-[2.5vw] md:rounded-[1.2vw] overflow-hidden shadow-2xl"
              style={{ opacity: 0 }}
            >
              <img
                src="/service-hero.jpg"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />

              {/* Logo Badge */}
              <div
                ref={badgeRef}
                className="absolute bottom-[5vw] left-[5vw] md:bottom-[2vw] md:left-[2vw] bg-[var(--brand-500)] text-white rounded-full w-[14vw] h-[14vw] md:w-[5vw] md:h-[5vw] flex items-center justify-center font-bold text-[5vw] md:text-[1.8vw] shadow-2xl"
                style={{ opacity: 0 }}
              >
                GW
              </div>

              {/* Avatar Cards */}
              <div
                ref={avatarsRef}
                className="absolute top-[3vw] right-[3vw] md:top-[1.5vw] md:right-[1.5vw] flex flex-col gap-[2vw] md:gap-[0.8vw]"
              >
                <div className="avatar-card bg-white/95 backdrop-blur-sm rounded-full pl-[2.5vw] pr-[3vw] py-[1.8vw] md:pl-[1vw] md:pr-[1.2vw] md:py-[0.55vw] flex items-center gap-[2vw] md:gap-[0.7vw] shadow-lg" style={{ opacity: 0 }}>
                  <img
                    src="/avatars/avatar1.png"
                    alt="Belinda"
                    className="w-[7vw] h-[7vw] md:w-[2.2vw] md:h-[2.2vw] rounded-full object-cover border-[0.3vw] md:border-[0.12vw] border-white"
                  />
                  <span className="text-[3.2vw] md:text-[0.9vw] font-semibold text-[var(--text)]">
                    Belinda
                  </span>
                  <img
                    src="/flags/australia.svg"
                    alt="Australia"
                    className="w-[5.5vw] h-[5.5vw] md:w-[1.8vw] md:h-[1.8vw] rounded-full object-cover"
                  />
                </div>

                <div className="avatar-card bg-white/95 backdrop-blur-sm rounded-full pl-[2.5vw] pr-[3vw] py-[1.8vw] md:pl-[1vw] md:pr-[1.2vw] md:py-[0.55vw] flex items-center gap-[2vw] md:gap-[0.7vw] shadow-lg" style={{ opacity: 0 }}>
                  <img
                    src="/avatars/avatar2.png"
                    alt="Belinda"
                    className="w-[7vw] h-[7vw] md:w-[2.2vw] md:h-[2.2vw] rounded-full object-cover border-[0.3vw] md:border-[0.12vw] border-white"
                  />
                  <span className="text-[3.2vw] md:text-[0.9vw] font-semibold text-[var(--text)]">
                    Belinda
                  </span>
                  <img
                    src="/flags/south-africa.svg"
                    alt="South Africa"
                    className="w-[5.5vw] h-[5.5vw] md:w-[1.8vw] md:h-[1.8vw] rounded-full object-cover"
                  />
                </div>

                <div className="avatar-card bg-white/95 backdrop-blur-sm rounded-full pl-[2.5vw] pr-[3vw] py-[1.8vw] md:pl-[1vw] md:pr-[1.2vw] md:py-[0.55vw] flex items-center gap-[2vw] md:gap-[0.7vw] shadow-lg" style={{ opacity: 0 }}>
                  <img
                    src="/avatars/avatar3.png"
                    alt="Belinda"
                    className="w-[7vw] h-[7vw] md:w-[2.2vw] md:h-[2.2vw] rounded-full object-cover border-[0.3vw] md:border-[0.12vw] border-white"
                  />
                  <span className="text-[3.2vw] md:text-[0.9vw] font-semibold text-[var(--text)]">
                    Belinda
                  </span>
                  <img
                    src="/flags/canada.svg"
                    alt="Canada"
                    className="w-[5.5vw] h-[5.5vw] md:w-[1.8vw] md:h-[1.8vw] rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Stat Card */}
              <div
                ref={statRef}
                className="absolute bottom-[-5vw] left-[25%] md:bottom-[-2.5vw] md:left-[28%] bg-white rounded-[2.5vw] md:rounded-[1.2vw] px-[5vw] py-[4vw] md:px-[2.5vw] md:py-[1.8vw] shadow-2xl"
                style={{ opacity: 0 }}
              >
                <div className="flex items-baseline gap-[1.5vw] md:gap-[0.6vw]">
                  <h3 className="text-[10vw] md:text-[3.5vw] font-bold text-[var(--text)]">
                    72
                  </h3>
                  <span className="text-[6vw] md:text-[2.2vw] font-bold text-[var(--text)]">
                    %
                  </span>
                </div>
                <p className="text-[3.5vw] md:text-[0.95vw] text-[var(--gray-0)] mt-[1.5vw] md:mt-[0.5vw] leading-[1.4]">
                  Faster expansion into new<br />regions.
                </p>
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
