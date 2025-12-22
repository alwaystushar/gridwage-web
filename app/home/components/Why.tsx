"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/app/Components/UI/TextReveal";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import MagneticButton from "@/app/Components/UI/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon?: string;
  image?: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    image: "/homepageService/globe.svg",
    title: "Global Reach, Local Compliance",
    description:
      "Hire and manage employees across 150+ countries with full compliance and local expertise—so your business can expand confidently without borders.",
  },
  {
    image: "/homepageService/settings.svg",
    title: "Unified People Platform",
    description:
      "Payroll, HR, benefits, and compliance—seamlessly integrated into one intelligent platform that simplifies workforce management for global teams.",
  },
  {
    image: "/homepageService/lightbulb.svg",
    title: "Automation That Scales",
    description:
      "Eliminate repetitive admin tasks with smart automation built to support fast-growing companies and streamline every step of global employment.",
  },
  {
    image: "/homepageService/lock.svg",
    title: "Trust Through Transparency",
    description:
      "Get real-time visibility, accurate payroll, and enterprise-grade data security—ensuring your people and payments are always protected.",
  },
];

export default function WhyGridWageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const { isLoading } = useLoading();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading || !sectionRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (imageRef.current) {
          gsap.set(imageRef.current, { opacity: 0, scale: 0.95 });
        }

        if (featuresRef.current) {
          const featureItems =
            featuresRef.current.querySelectorAll(".feature-item");
          gsap.set(featureItems, { opacity: 0, y: 20 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        if (imageRef.current) {
          tl.to(
            imageRef.current,
            { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
            0
          );
        }

        if (featuresRef.current) {
          const featureItems =
            featuresRef.current.querySelectorAll(".feature-item");
          tl.to(
            featureItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            },
            0.3
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, [mounted, isLoading]);

  if (!mounted || isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full py-[0vw] md:py-[5vw] bg-[var(--brand-800)] relative overflow-hidden"
    >
      {/* Scale wrapper - makes everything 90% (10% smaller) */}
      <div className="scale-90 origin-center">
        <div className="grid grid-cols-12 gap-x-[4vw] gap-y-[3vw] md:px-[6vw] items-start">
          {/* ================= LEFT TOP: Heading ================= */}
          <div className="col-span-12 lg:col-span-7 md:order-2 order-1 lg:order-1 mb-[4vw] lg:mb-0">
            <TextReveal
              className="b3 font-semibold text-white/80 uppercase tracking-wider"
              delay={0}
              duration={0.6}
              stagger={0.05}
              lineHeight="1.2"
              triggerOnLoad={false}
              scrollStart="top 85%"
            >
              <p>Why GridWage</p>
            </TextReveal>

            <TextReveal
              className="h4 font-medium text-white mt-[3vw] md:mt-0"
              delay={0.3}
              stagger={0.1}
              lineHeight="1.5"
              triggerOnLoad={false}
              scrollStart="top 85%"
            >
              <h2>Why GridWage? Because Global Should Be Simple.</h2>
            </TextReveal>
          </div>

          {/* ================= RIGHT TOP: Description + CTA ================= */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <TextReveal
              className="b2 text-white/90 leading-[1.65] mb-[6vw] md:mb-[2vw]"
              delay={0.6}
              duration={1.5}
              stagger={0.03}
              lineHeight="1.65"
              triggerOnLoad={false}
              scrollStart="top 85%"
            >
              <p>
                GridWage is the all-in-one platform for payroll, HR, and
                compliance—helping global teams hire, manage, and pay employees
                with speed and accuracy.
              </p>
            </TextReveal>

            <div className="mb-[8vw] md:mb-[4vw]">
              <MagneticButton
                variant="outline"
                className="hover:text-white"
              >
                More About Gridwage
              </MagneticButton>
            </div>
          </div>

          {/* ================= LEFT BOTTOM: Image Block ================= */}
          <div className="col-span-12 lg:col-span-7 order-3 lg:order-3 mb-[8vw] lg:mb-0">
            <div
              ref={imageRef}
              className="relative w-full mt-[6vw] md:mt-[0vw]"
            >
              <div className="relative">
                <img
                  src="/homepageService/team.png"
                  alt="GridWage Team"
                  className="w-full h-[60vw] md:h-[35vw] object-cover"
                />

                <div className="absolute top-[-8vw] left-[-4vw] md:top-[-2vw] md:left-[-2vw] bg-white rounded-[2.5vw] md:rounded-[1.2vw] p-[3vw] md:p-[1.2vw] shadow-2xl flex items-center gap-[2vw] md:gap-[1.5vw]">
                  <div className="w-[10vw] h-[10vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <img src="homepageService/avtar4.png" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[3.5vw] md:text-[1.1vw] font-semibold text-[var(--text)]">
                      Amanda Young
                    </p>
                    <p className="text-[2.8vw] md:text-[0.85vw] text-[var(--gray-0)]">
                      Expert Billing/Policy
                    </p>
                  </div>
                  <div className=" rounded-full flex items-center justify-center">
                    <img
                      src="homepageService/text.svg"
                      className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw]"
                      alt=""
                    />
                  </div>
                </div>

                <div className="absolute top-[-8vw] right-[-1vw] md:top-[2vw] md:right-[-2vw] bg-white rounded-[2.5vw] md:rounded-[1.2vw] p-[3vw] md:p-[1.2vw] shadow-2xl">
                  <p className="text-[2.8vw] md:text-[0.85vw] text-[var(--gray-0)] mb-[1vw] md:mb-[0.3vw]">
                    Total Income
                  </p>
                  <div className="flex items-center gap-[2vw] md:gap-[2vw]">
                    <p className="text-[5vw] md:text-[1.8vw] font-medium text-[var(--text)]">
                      $245.00
                    </p>
                    <img
                      src="homepageService/bar-chart.svg"
                      className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw]"
                      alt=""
                    />
                  </div>
                </div>

                <div className="absolute bottom-[-4vw] left-1/2 -translate-x-1/2 md:bottom-[-2vw] bg-white rounded-[2.5vw] md:rounded-[1.2vw] px-[4vw] py-[2.5vw] md:px-[1.5vw] md:py-[1vw] shadow-2xl flex items-center gap-[2vw] md:gap-[0.8vw]">
                  <div className="w-[6vw] h-[6vw] md:w-[2vw] md:h-[2vw] rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      src="homepageService/tick.svg"
                      className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw]"
                      alt=""
                    />
                  </div>
                  <p className="text-[3.5vw] md:text-[1.1vw] text-[var(--text)] whitespace-nowrap">
                    Money Transfer Successful
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT BOTTOM: Accordion Features ================= */}
          <div className="col-span-12 lg:col-span-5 order-4 lg:order-4">
            <div
              ref={featuresRef}
              className="space-y-[2.5vw] md:space-y-[2.5vw]"
            >
              {features.map((feature, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className={`feature-item px-0 py-[3vw] md:px-[1.8vw] md:py-0 cursor-pointer transition-colors duration-1200 ease-[cubic-bezier(0.19,0.7,0.3,1)]`}
                    onMouseEnter={() => setOpenIndex(index)}
                  >
                    <div className="flex gap-[3vw] md:gap-[1.2vw] items-center">
                      <div className="flex-shrink-0 w-[10vw] h-[10vw] md:w-[3.5vw] md:h-[3.5vw] rounded-[2vw] md:rounded-[0.8vw] bg-white/10 flex items-center justify-center overflow-hidden">
                        {feature.image ? (
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-[6vw] h-[6vw] md:w-[2.2vw] md:h-[2.2vw] object-contain"
                          />
                        ) : (
                          <span className="text-[5vw] md:text-[1.8vw]">
                            {feature.icon}
                          </span>
                        )}
                      </div>

                      <h3 className="text-[4vw] md:text-[1.3vw] font-semibold text-white flex-1">
                        {feature.title}
                      </h3>

                      <svg
                        className={`w-[4vw] h-[4vw] md:w-[1.5vw] md:h-[1.5vw] text-white transition-transform duration-700 ease-[cubic-bezier(0.19,0.7,0.3,1)] ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-800 ease-[cubic-bezier(0.19,0.7,0.3,1)] ${
                        isOpen
                          ? "max-h-[70vw] md:max-h-[12vw] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[3.5vw] md:text-[1.05vw] text-white/80 leading-[1.7] pt-[2.2vw] md:pt-[0.9vw] pl-[13vw] md:pl-[4.7vw]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
