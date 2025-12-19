"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/Components/UI/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * ReceivedCard Component
 * Displays received payment information with user details and action buttons
 * 
 * Features:
 * - Profile avatar with dollar badge
 * - Animated decorative spark elements (varying sizes)
 * - Three action buttons: Send, Balance, Share
 * - Scroll-triggered fade-up animation
 * - Animated counter for amount
 * - Hover effects on buttons
 * - Fully responsive with VW units
 */
export default function ReceivedCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spark1Ref = useRef<HTMLDivElement>(null);
  const spark2Ref = useRef<HTMLDivElement>(null);
  const spark3Ref = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLHeadingElement>(null);

  /**
   * Mount Effect Hook
   * Sets mounted state after component renders on client
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Animation Effect Hook
   * Animates card, decorative sparks, and amount counter on scroll
   */
  useEffect(() => {
    if (!isLoading && mounted && cardRef.current) {
      // Animate card fade-up
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate amount counter
      if (amountRef.current) {
        gsap.fromTo(
          amountRef.current,
          { innerText: 0 },
          {
            innerText: 2618,
            duration: 1.5,
            delay: 0.8,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (amountRef.current) {
                const value = Math.round(parseFloat(amountRef.current.innerText));
                // Format number with comma
                amountRef.current.innerText = "$" + value.toLocaleString();
              }
            },
          }
        );
      }

      // Animate decorative sparks with rotation and scale
      const sparks = [
        { ref: spark1Ref.current, scale: 1, rotation: 360 },
        { ref: spark2Ref.current, scale: 1.3, rotation: -360 },
        { ref: spark3Ref.current, scale: 0.8, rotation: 360 },
      ];

      sparks.forEach((spark, index) => {
        if (spark.ref) {
          gsap.fromTo(
            spark.ref,
            { scale: 0, rotation: 0, opacity: 0 },
            {
              scale: spark.scale,
              rotation: spark.rotation,
              opacity: 1,
              duration: 1.2,
              delay: 0.5 + index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Continuous floating animation
          gsap.to(spark.ref, {
            y: "+=10",
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.8 + index * 0.15,
          });
        }
      });
    }
  }, [isLoading, mounted]);

  // Prevent rendering during loading or before mount
  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      className="bg-(--white) rounded-[4vw] md:rounded-[1.44vw] p-[6vw] md:p-[1.2vw] opacity-0 w-[72vw] md:w-[20.2vw] relative overflow-hidden"
      style={{ boxShadow: "0 0.4vw 2.6vw rgba(0, 0, 0, 0.02)" }}
    >
      {/* Card Header: Title and Menu Icon */}
      <div className="flex items-center justify-between mb-[5vw] md:mb-[1vw]">
        <h3 className="text-[4.8vw] md:text-[1.12vw] font-semibold text-(--text)">
          Received
        </h3>
        {/* Menu icon */}
        <div>
          <img 
            src="/heroSection/menu_icon.svg" 
            className="w-[4.8vw] h-[4.8vw] md:w-[1.6vw] md:h-[1.6vw]" 
            alt="Menu" 
          />
        </div>
      </div>

      {/* Decorative Spark Elements */}
      {/* Spark 1 - Top Right (Medium) */}
      <div
        ref={spark1Ref}
        className="absolute animate-ping top-[12vw] md:top-[3vw] right-[6vw] md:right-[1.8vw] w-[8vw] h-[8vw] md:w-[2vw] md:h-[2vw] opacity-0"
      >
        <img 
          src="/heroSection/spark.svg" 
          className="w-full h-full" 
          alt="Spark decoration" 
        />
      </div>

      {/* Spark 2 - Middle Right (Large) */}
      <div
        ref={spark2Ref}
        className="absolute top-[28vw] animate-ping md:top-[8vw] right-[8vw] md:right-[2.2vw] w-[10vw] h-[10vw] md:w-[2.6vw] md:h-[2.6vw] opacity-0"
      >
        <img 
          src="/heroSection/spark.svg" 
          className="w-full h-full" 
          alt="Spark decoration" 
        />
      </div>

      {/* Spark 3 - Bottom Left (Small) */}
      <div
        ref={spark3Ref}
        className="absolute bottom-[12vw] animate-ping md:bottom-[3vw] left-[6vw] md:left-[1.8vw] w-[6vw] h-[6vw] md:w-[1.6vw] md:h-[1.6vw] opacity-0"
      >
        <img 
          src="/heroSection/spark.svg" 
          className="w-full h-full" 
          alt="Spark decoration" 
        />
      </div>

      {/* Profile Section */}
      <div className="text-center mb-[5vw] md:mb-[1vw] relative z-10">
        {/* Avatar with dollar badge */}
        <div className="relative inline-block mb-[3vw] md:mb-[0.2vw]">
          {/* Avatar image */}
          <img 
            src="/heroSection/pic.png" 
            className="w-[20vw] h-[20vw] md:w-[5vw] md:h-[5vw] rounded-full object-cover" 
            alt="User avatar" 
          />
          {/* Dollar badge overlay */}
          <div className="absolute bottom-0 right-0 bg-[#7C3AED] rounded-full w-[7vw] h-[7vw] md:w-[1.8vw] md:h-[1.8vw] flex items-center justify-center border-2 border-white">
            <span className="text-white text-[4vw] md:text-[1vw] font-bold">$</span>
          </div>
        </div>

        {/* User name */}
        <h4 className="text-[4vw] md:text-[1vw] font-semibold text-(--text) mb-[1.5vw] md:mb-[0.4vw]">
          Ilya S.
        </h4>

        {/* "Sent you" text */}
        <p className="text-[3.5vw] md:text-[0.85vw] text-(--gray-0) mb-[2vw] md:mb-[0.5vw]">
          Sent you
        </p>

        {/* Amount - Animated Counter */}
        <h2 
          ref={amountRef}
          className="text-[8vw] md:text-[2vw] font-semibold text-(--text)"
        >
          $0
        </h2>
      </div>

      {/* Action Buttons with Labels */}
      <div className="flex items-center justify-center gap-[6vw] md:gap-[2vw] mb-[3vw] md:mb-[0.2vw]">
        {/* Send Button */}
        <div className="flex flex-col items-center gap-[2vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[14vw] h-[14vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img 
              src="/heroSection/send_icon.svg" 
              className="w-[6vw] h-[6vw] md:w-[1.4vw] md:h-[1.4vw]" 
              alt="Send" 
            />
          </button>
          <p className="text-[3.5vw] md:text-[0.85vw] text-(--gray-0)">Send</p>
        </div>

        {/* Balance Button */}
        <div className="flex flex-col items-center gap-[2vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[14vw] h-[14vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img 
              src="/heroSection/dollar_icon.svg" 
              className="w-[6vw] h-[6vw] md:w-[1.4vw] md:h-[1.4vw]" 
              alt="Balance" 
            />
          </button>
          <p className="text-[3.5vw] md:text-[0.85vw] text-(--gray-0)">Balance</p>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-[2vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[14vw] h-[14vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img 
              src="/heroSection/share_icon.svg" 
              className="w-[6vw] h-[6vw] md:w-[1.4vw] md:h-[1.4vw]" 
              alt="Share" 
            />
          </button>
          <p className="text-[3.5vw] md:text-[0.85vw] text-(--gray-0)">Share</p>
        </div>
      </div>
    </div>
  );
}
