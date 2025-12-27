"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/Components/UI/TextReveal";
import MagneticButton from "@/app/Components/UI/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!imageMaskRef.current) return;

    // Reset the clip-path to initial state
    gsap.set(imageMaskRef.current, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageMaskRef.current,
        start: "top 85%",
      },
    });

    tl.to(
      imageMaskRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power3.inOut",
      },
      0.3
    );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === imageMaskRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  return (
    <section className="w-full py-[12vw] md:py-[0vw] mt-[14vw] md:mt-[8vw]  overflow-x-hidden">
      <div className="grid-container grid grid-cols-12 gap-[6vw] md:gap-[4vw] items-center">
        {/* Left: Text Content */}
        <div className="col-span-12 md:col-span-6 text-left">
          {/* Small label */}
          <TextReveal className="b3 text-[var(--brand-500)] font-medium">
            About GridWage
          </TextReveal>

          {/* Main Heading */}
          <TextReveal
            className="h3 md:h2 text-[var(--text)] font-medium mb-[4vw] md:mb-[1.5vw]"
            lineHeight="1.25"
          >
            Building the Future of Global Employment
          </TextReveal>

          <div className="w-full md:w-[37vw]">
            {/* Description Paragraph 1 */}
            <TextReveal
              className="b3 text-[var(--gray-0)] font-semibold mb-[3vw] md:mb-[0.5vw]"
              lineHeight="1.6"
            >
              GridWage simplifies global hiring so you can focus on growth—not
              compliance.
            </TextReveal>

            {/* Description Paragraph 2 */}
            <TextReveal
              className="b3 text-[var(--gray-0)] mb-[6vw] md:mb-[3vw]"
              lineHeight="1.6"
            >
              GridWage is a modern EOR and Contractor-of-Record platform that
              enables companies to hire, pay, and manage global talent—without
              local entities or compliance headaches.
            </TextReveal>
          </div>

          {/* CTA Button */}
          <MagneticButton
            variant="primary"
            className="bg-[var(--brand-500)] text-white hover:bg-[var(--brand-600)] px-[6vw] md:px-[3vw] py-[2vw] md:py-[1vw] rounded-[9vw] md:rounded-[5vw]"
          >
            Get Started
          </MagneticButton>
        </div>

        {/* Right: Image with mask reveal */}
        <div
          ref={imageMaskRef}
          className="col-span-12 md:col-span-6 relative h-[80vw] md:h-[35vw] rounded-[4vw] md:rounded-[2vw] overflow-hidden"
        >
          <Image
            src="/about/aboutHero.png"
            alt="GridWage office workspace"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
