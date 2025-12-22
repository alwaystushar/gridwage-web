"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/Components/UI/LoadingContext";
import AnalysisCard from "./analysisCard";
import ReceivedCard from "./receivedCard";
import ActivityCard from "./activityCard";

// Remove ScrollTrigger import and registration since we're not using scroll animations

export default function HeroRight() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);
  const receivedRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && mounted) {
      // Animate background immediately
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // Animate Analysis Card immediately
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
          }
        );
      }

      // Animate Received Card immediately
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
          }
        );
      }

      // Animate Activity Card immediately
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
          }
        );
      }
    }
  }, [isLoading, mounted]);

  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div className="relative grid grid-cols-12 gap-[3vw] md:gap-[1.5vw] md:h-[53vw] h-[130vw] ">
      {/* Background SVG */}
      <div
        ref={bgRef}
        className="absolute w-[180vw] md:w-[70vw] h-[120vw] md:h-[40vw] right-[-95vw] md:right-[-24vw] top-[-10vw] md:top-0 pointer-events-none bg-contain bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url('/heroSection/bg.svg')" }}
      />

      {/* Analysis Card - Left Side */}
      <div
        ref={analysisRef}
        className="col-span-12 md:col-span-7 md:top-[2vw] top-[2vw] md:left-[-5vw] left-[-1vw] absolute"
      >
        <AnalysisCard />
      </div>

      {/* Received Card - Right Side */}
      <div
        ref={receivedRef}
        className="col-span-12 md:col-span-5 md:top-[2vw] top-[2vw] md:right-[3vw] right-[1vw] absolute"
      >
        <ReceivedCard />
      </div>

      {/* Activity Card - Bottom */}
      <div
        ref={activityRef}
        className="col-span-12 top-[66vw] md:top-[27vw] md:right-[3vw] right-[1vw] absolute"
      >
        <ActivityCard />
      </div>
    </div>
  );
}
