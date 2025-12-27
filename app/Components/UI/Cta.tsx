"use client";

import Image from "next/image";
import TextReveal from "@/app/Components/UI/TextReveal";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import { Counter } from "@/app/Components/UI/Counter";
import EmailCtaInput from "@/app/Components/UI/EmailCtaInput";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Detect route changes

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
        // Remove 'once: true' to allow re-triggering
      },
    });

    tl.to(
      imageMaskRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power3.inOut",
      },
      0.5
    );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === imageMaskRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <>
      {/* Purple hero section */}
      <section className="w-full bg-[var(--brand-500)] text-white py-[0vw] overflow-x-hidden">
        <div className="grid md:px-[6vw] grid-cols-12 gap-[6vw] md:gap-[4vw] items-stretch overflow-x-hidden">
          {/* LEFT: heading + CTA + counters in one column */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center md:mt-0 mt-[8vw] max-sm:px-[4vw] overflow-x-hidden">
            {/* Heading */}
            <TextReveal className="" lineHeight="1.25">
              <span className="block h4">Say Hello to</span>
              <span className="block h4">Borderless Growth</span>
            </TextReveal>

            {/* Primary CTA */}
            <div className="mt-[8vw] md:mt-[2.5vw]">
              <MagneticButton
                variant="outline"
                className="border-white text-white  hover:text-white hover:bg-white px-[7.2vw] md:px-[4vw] py-[1.98vw] md:py-[1.1vw] rounded-[9vw] md:rounded-[5vw]"
              >
                Get Started
              </MagneticButton>
            </div>

            {/* Counters */}
            <div className="mt-[12vw] md:mt-[4vw]  flex  gap-[8vw] md:gap-[4vw] text-left">
              <div className="col-span-12 md:col-span-4">
                <TextReveal className="font-medium h3" lineHeight="1.1">
                  <Counter end={150} suffix="+" />
                </TextReveal>
                <p className="mt-[1.44vw] md:mt-[0.8vw] b4 leading-[1.6] opacity-80">
                  Countries to access <br /> and employ from
                </p>
              </div>

              <div className="col-span-12 md:col-span-4">
                <TextReveal className="font-medium h3" lineHeight="1.1">
                  <Counter end={100} suffix="+" />
                </TextReveal>
                <p className="mt-[1.44vw] md:mt-[0.8vw] b4 leading-[1.6] opacity-80">
                  In-house legal <br /> and tax experts
                </p>
              </div>

              <div className="col-span-12 md:col-span-4">
                <TextReveal className="font-medium h3" lineHeight="1.1">
                  <Counter end={24} suffix="×7" />
                </TextReveal>
                <p className="mt-[1.44vw] md:mt-[0.8vw] b4 leading-[1.6] opacity-80">
                  Dedicated <br /> customer support
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: hero image with scroll-triggered left-to-right mask reveal */}
          <div
            ref={imageMaskRef}
            className="col-span-12 md:col-span-6 relative h-[90vw] md:h-[42vw] w-full md:w-[50vw] overflow-hidden overflow-x-hidden"
          >
            <Image
              src="/cta/arabic-lady.png"
              alt="Global workforce"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* White CTA stripe section */}
      <section className="w-full bg-white py-[4.5vw] md:py-[2.5vw] overflow-x-hidden">
        <div className="grid-container grid grid-cols-12 items-center gap-[5.4vw] md:gap-[3vw] overflow-x-hidden">
          {/* Left text */}
          <div className="col-span-12 md:col-span-6 text-left">
            <div className="h6 text-[var(--text)] leading-[1.6]">
              <TextReveal className="block" lineHeight="1.6">
                Watch How{" "}
                <span className="text-[var(--brand-500)] font-semibold">
                  GridWage
                </span>{" "}
                Automates
              </TextReveal>

              <TextReveal className="block" lineHeight="1.6">
                Global People Management.
              </TextReveal>
            </div>
          </div>

          {/* Right input + button */}
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row items-stretch md:items-center md:justify-end gap-[2.16vw] md:gap-[1.2vw] overflow-x-hidden">
            <EmailCtaInput />
          </div>
        </div>
      </section>
    </>
  );
}
