"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import AnalysisCard from "./analysisCard";
import ReceivedCard from "./receivedCard";
import ActivityCard from "./activityCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroRight Component
 * Right side of hero section containing Analysis and Received cards
 * Features: Scroll-triggered animations and decorative background
 */
export default function HeroRight() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);
  const receivedRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /**
   * Mount Effect Hook
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Animation Effect Hook
   * Animates background and both cards independently
   */
  useEffect(() => {
    if (!isLoading && mounted) {
      // Animate background
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bgRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate Analysis Card
      if (analysisRef.current) {
        gsap.fromTo(
          analysisRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: analysisRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate Received Card
      if (receivedRef.current) {
        gsap.fromTo(
          receivedRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: receivedRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate Activity Card
      if (activityRef.current) {
        gsap.fromTo(
          activityRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: activityRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, mounted]);

  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div className="relative grid grid-cols-12 gap-[3vw] md:gap-[1.5vw]">
      {/* Background SVG */}
      <div
        ref={bgRef}
        className="absolute w-[120vw] md:w-[70vw] h-[80vw] md:h-[40vw] right-[-30vw] md:right-[-24vw] top-[-10vw] md:top-0 pointer-events-none bg-contain bg-center bg-no-repeat z-[-1] opacity-0"
        style={{ backgroundImage: "url('/heroSection/bg.svg')" }}
      />

      {/* Analysis Card - Left Side */}
      <div
        ref={analysisRef}
        className="col-span-12 md:col-span-7 top-[3vw] left-[-2vw] absolute opacity-0"
      >
        <AnalysisCard />
      </div>

      {/* Received Card - Right Side */}
      <div
        ref={receivedRef}
        className="col-span-12 md:col-span-5 opacity-0 top-[3vw] right-[1vw] absolute"
      >
        <ReceivedCard />
      </div>

      {/* Activity Card - Bottom */}
      <div
        ref={activityRef}
        className="col-span-12 opacity-0 top-[42vw] md:top-[29vw] right-[1vw] absolute"
      >
        <ActivityCard />
      </div>
    </div>
  );
}
