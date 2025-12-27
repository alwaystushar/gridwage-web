"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/Components/UI/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Startups expanding globally",
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="currentColor" strokeWidth="2" />
        <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" />
        <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="currentColor" strokeWidth="2" />
        <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Remote-first teams managing global talent",
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "SMEs scaling across borders",
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: "Enterprises testing new markets",
  },
];

const BuiltForGrowth = () => {
  const imageMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageMaskRef.current) return;

    gsap.set(imageMaskRef.current, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 1,
    });

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
    <section className="w-full bg-white  py-[12vw] md:py-[8vw] overflow-hidden">
      <div className="grid-container">
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
          <TextReveal>
            <span className="b4 text-[var(--brand-500)] font-medium uppercase tracking-wider mb-[3vw] md:mb-[1.5vw] block">
              A New Standard in Global Employment
            </span>
          </TextReveal>

          <TextReveal className="h3 md:h2 text-[var(--text)] font-medium mb-[6vw] md:mb-[3vw] leading-[1.2]">
            Built for Every Stage of Growth
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[4vw] md:gap-[2vw]">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-[3vw] md:gap-[1vw]">
                <div className="flex-shrink-0 w-[10vw] h-[10vw] md:w-[3.5vw] md:h-[3.5vw] bg-[var(--brand-500)] rounded-[1.5vw] md:rounded-[0.8vw] flex items-center justify-center text-white p-[2vw] md:p-[0.7vw]">
                  {feature.icon}
                </div>

                <TextReveal className="b3 md:b2 text-[var(--text)] font-medium pt-[1vw] md:pt-[0.3vw]">
                  {feature.title}
                </TextReveal>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 relative h-[80vw] md:h-[35vw] mt-[8vw] md:mt-0">
          <div
            ref={imageMaskRef}
            className="relative w-full h-full rounded-[4vw] md:rounded-[2vw] overflow-hidden"
          >
            <Image
              src="/about/growth.jpg"
              alt="Modern office space with meeting room"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForGrowth;
