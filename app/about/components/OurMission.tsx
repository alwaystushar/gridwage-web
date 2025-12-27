"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import TextReveal from "@/app/Components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const imageMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageMaskRef.current) return;

    // Set initial state - hidden on left
    gsap.set(imageMaskRef.current, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 1,
    });

    // Create left to right opening animation
    gsap.to(imageMaskRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageMaskRef.current,
        start: "top 80%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === imageMaskRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="grid-container">
        {/* Left Column - Text Content */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-start">
          {/* Section Tag */}
          <TextReveal>
            <span className="b3 text-[var(--brand-500)] font-medium">
              Our Mission
            </span>
          </TextReveal>

          {/* Main Heading */}
          <TextReveal className="h3 md:h2 text-[var(--text)] font-medium mb-[4vw] md:mb-[1.5vw]">
            Shaping the Future of Global Employment
          </TextReveal>

          {/* Subheading */}
          <TextReveal className="b3 text-[var(--gray-0)] font-semibold mb-[3vw] md:mb-[0.5vw]">
            To make global employment effortless and accessible for every
            business—no matter its size or location.
          </TextReveal>

          {/* Description Paragraphs */}
          <div className="mb-[6vw] md:mb-[3vw]">
            <TextReveal className="b3 text-[var(--gray-0)]" lineHeight="1.7">
              GridWage exists to remove the friction from international hiring
              by combining intelligent automation, compliance expertise, and
              human understanding. We help businesses onboard talent anywhere in
              the world—managing payroll, benefits, and taxes with precision and
              care. Our mission is simple yet powerful: enable companies to
              focus on growth while we handle the complexity of global
              employment.
            </TextReveal>
          </div>

          {/* CTA Button */}
          <MagneticButton variant="primary">Get Started</MagneticButton>
        </div>

        {/* Right Column - Image with Purple Background */}
        <div className="col-span-12 md:col-span-6 relative h-[42vw]">
          <div
            ref={imageMaskRef}
            className="absolute right-[-6vw] w-full aspect-square bg-gradient-to-br from-purple-600 to-purple-700 overflow-hidden p-[1vw] md:p-[0.5vw] flex items-center justify-center"
          >
            {/* Circular Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/about/mission.jpg"
                alt="GridWage team member"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
