"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/Components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const WhyChoose = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    // Set initial state - closed gate (hidden from center)
    gsap.set(imageRef.current, {
      clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
      opacity: 1,
    });

    // Create opening gate animation
    gsap.to(imageRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === imageRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const features = [
    {
      icon: "/about/globe.jpg",
      title: "Global Compliance Simplified",
      description:
        "Hire and manage employees anywhere with full compliance. GridWage handles local laws, taxes, and contracts—so you stay risk-free across borders.",
    },
    {
      icon: "/about/card.jpg",
      title: "Seamless Payroll Automation",
      description:
        "Run accurate, multi-currency payroll for global teams from one intuitive platform. No errors, no delays—just on-time payments every time.",
    },
    {
      icon: "/about/person.jpg",
      title: "One Platform for All",
      description:
        "From onboarding to benefits, manage your global workforce in one place. GridWage connects people, processes, and payments effortlessly.",
    },
  ];

  return (
    <section className="w-full bg-white py-[12vw] md:py-[6vw] overflow-hidden">
      {/* Heading with expanding image */}
      <div className="grid-container mb-[10vw] md:mb-[5vw]">
        <div className="col-span-12 flex flex-wrap items-center justify-center gap-[2vw] md:gap-[1vw]">
          <TextReveal className="h3 md:h2 text-[var(--text)] font-medium">
            Why Choose
          </TextReveal>

          {/* Opening Gate Image */}
          <div
            ref={imageRef}
            className="relative w-[12vw] h-[12vw] md:w-[16vw] md:h-[6vw] rounded-[2vw] md:rounded-full overflow-hidden"
          >
            <Image
              src="/about/pill.png"
              alt="GridWage icon"
              fill
              className="object-cover"
            />
          </div>

          <TextReveal className="h3 md:h2 text-[var(--text)] font-medium">
            GridWage?
          </TextReveal>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid-container">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-span-12 md:col-span-4 flex flex-col items-center text-center"
          >
            {/* SVG Icon */}
            <div className="relative w-[12vw] h-[12vw] md:w-[5vw] md:h-[5vw] mb-[3vw] md:mb-[1.5vw]">
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Title */}
            <TextReveal className="h6 md:h5 text-[var(--text)] font-semibold mb-[2vw] md:mb-[1vw]">
              {feature.title}
            </TextReveal>

            {/* Description */}
            <TextReveal
              className="b3 text-[var(--gray-0)] leading-[1.6]"
              lineHeight="1.6"
            >
              {feature.description}
            </TextReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
