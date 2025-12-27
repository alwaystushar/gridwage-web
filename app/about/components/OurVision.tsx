"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import TextReveal from "@/app/Components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const OurVision = () => {
  const imageMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageMaskRef.current) return;

    // Set initial state - hidden on right
    gsap.set(imageMaskRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 1,
    });

    // Create circular reveal animation
    gsap.to(imageMaskRef.current, {
      clipPath: "circle(100% at 50% 50%)",
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
    <section className="w-full bg-[var(--brand-900)]  overflow-hidden">
      <div className="grid-container md:pt-0 pt-[12vw]">
        {/* Left Column - Text Content */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-start">
          {/* Section Tag */}
          <TextReveal>
            <span className="b3 text-white/80 font-medium">
              Our Vision
            </span>
          </TextReveal>

          {/* Main Heading */}
          <TextReveal className="h3 md:h2 text-white font-medium mb-[4vw] md:mb-[1.5vw] leading-[1.2]">
            Empowering Global Growth
          </TextReveal>

          {/* Description */}
          <div className="mb-[6vw] md:mb-[3vw]">
            <TextReveal className="b3 text-white/90" lineHeight="1.7">
              A borderless world of work, where companies can hire globally and
              people can work from anywhere—confidently, compliantly, and
              connected.
            </TextReveal>
          </div>

          {/* CTA Button */}
                        <MagneticButton
                          variant="outline"
                          className="border-white text-white  hover:text-white hover:bg-white px-[7.2vw] md:px-[4vw] py-[1.98vw] md:py-[1.1vw] rounded-[9vw] md:rounded-[5vw]"
                        >
                          Get Started
                        </MagneticButton>
        </div>

        {/* Right Column - Image in Circle */}
        <div className="col-span-12 md:col-span-6 relative md:h-[35vw] h-[78vw] flex items-center justify-center">
          <div
            ref={imageMaskRef}
            className="absolute right-[-7vw] w-[100vw] h-[78vw] md:w-[45vw] md:h-[35vw] rounded-l-full overflow-hidden bg-white/10"
          >
            <Image
              src="/about/vision.jpg"
              alt="GridWage vision - professional woman"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
