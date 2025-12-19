"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/Components/UI/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Activity Item Interface
 * Defines structure for each transaction
 */
interface ActivityItem {
  id: number;
  name: string;
  avatar: string;
  date: string;
  amount: number;
  type: "incoming" | "top up";
  isPositive: boolean;
}

/**
 * ActivityCard Component
 * Displays recent transaction activity with animated counters
 * 
 * Features:
 * - Grouped transactions by month
 * - Avatar images for each user
 * - Animated number counters
 * - Color-coded amounts (green for positive, gray for negative)
 * - Scroll-triggered animations
 * - Fully responsive with VW units
 */
export default function ActivityCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const amount1Ref = useRef<HTMLParagraphElement>(null);
  const amount2Ref = useRef<HTMLParagraphElement>(null);
  const amount3Ref = useRef<HTMLParagraphElement>(null);

  // Activity data
  const thisMonthActivities: ActivityItem[] = [
    {
      id: 1,
      name: "Shaun B.",
      avatar: "/heroSection/avatar1.png",
      date: "8 Aug 2026",
      amount: 3500,
      type: "incoming",
      isPositive: true,
    },
    {
      id: 2,
      name: "Sam T.",
      avatar: "/heroSection/avatar2.png",
      date: "28 Jul 2026",
      amount: 80,
      type: "top up",
      isPositive: false,
    },
  ];

  const lastMonthActivities: ActivityItem[] = [
    {
      id: 3,
      name: "Sam T.",
      avatar: "/heroSection/avatar3.png",
      date: "28 Jul 2026",
      amount: 80,
      type: "top up",
      isPositive: false,
    },
  ];

  /**
   * Mount Effect Hook
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Animation Effect Hook
   * Animates card and amount counters
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

      // Animate amount counters
      const amounts = [
        { ref: amount1Ref.current, value: 3500, isPositive: true },
        { ref: amount2Ref.current, value: 80, isPositive: false },
        { ref: amount3Ref.current, value: 80, isPositive: false },
      ];

      amounts.forEach((amount, index) => {
        if (amount.ref) {
          gsap.fromTo(
            amount.ref,
            { innerText: 0 },
            {
              innerText: amount.value,
              duration: 1.2,
              delay: 0.5 + index * 0.15,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                if (amount.ref) {
                  const value = Math.round(parseFloat(amount.ref.innerText));
                  const sign = amount.isPositive ? "+" : "-";
                  amount.ref.innerText = sign + "$" + value.toLocaleString();
                }
              },
            }
          );
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
      className="bg-(--white) rounded-[4vw] md:rounded-[1.44vw] p-[6vw] md:p-[1.5vw] opacity-0 w-[72vw] md:w-[20.2vw]"
      style={{ boxShadow: "0 0.4vw 1.6vw rgba(0, 0, 0, 0.06)" }}
    >
      {/* Card Header: Title and Icon */}
      <div className="flex items-center justify-between mb-[5vw] md:mb-[1vw]">
        <h3 className="text-[4.8vw] md:text-[1.2vw] font-semibold text-(--text)">
          Activity
        </h3>
        {/* Calendar icon */}
        <div>
          <img 
            src="/heroSection/receipt_long.svg" 
            className="w-[4.8vw] h-[4.8vw] md:w-[1.2vw] md:h-[1.2vw]" 
            alt="Calendar" 
          />
        </div>
      </div>

      {/* This Month Section */}
      <div className="mb-[5vw] md:mb-[1vw]">
        <h4 className="text-[4vw] md:text-[1vw] font-semibold text-(--text) mb-[3vw] md:mb-0">
          This month
        </h4>

        {/* Activity Item 1 - Shaun B. */}
        <div className="flex items-center justify-between py-[3vw] md:py-[0.8vw] border-b-[0.3vw] md:border-b-[0.08vw] border-gray-200">
          {/* Left: Avatar and Details */}
          <div className="flex items-center gap-[3vw] md:gap-[0.8vw]">
            <img 
              src="/heroSection/avatar1.png" 
              className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover" 
              alt="Shaun B." 
            />
            <div>
              <p className="text-[3.5vw] md:text-[1vw] font-semibold text-(--text)">
                Shaun B.
              </p>
              <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">8 Aug 2026</p>
            </div>
          </div>

          {/* Right: Amount and Type */}
          <div className="text-right">
            <p 
              ref={amount1Ref}
              className="text-[3.5vw] md:text-[1vw] font-semibold text-[#10B981]"
            >
              +$0
            </p>
            <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">incoming</p>
          </div>
        </div>

        {/* Activity Item 2 - Sam T. */}
        <div className="flex items-center justify-between py-[3vw] md:py-[0.8vw]">
          {/* Left: Avatar and Details */}
          <div className="flex items-center gap-[3vw] md:gap-[0.8vw]">
            <img 
              src="/heroSection/avatar2.png" 
              className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover" 
              alt="Sam T." 
            />
            <div>
              <p className="text-[3.5vw] md:text-[1vw] font-semibold text-(--text)">
                Sam T.
              </p>
              <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">28 Jul 2026</p>
            </div>
          </div>

          {/* Right: Amount and Type */}
          <div className="text-right">
            <p 
              ref={amount2Ref}
              className="text-[3.5vw] md:text-[1vw] font-semibold text-(--text)"
            >
              -$0
            </p>
            <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">top up</p>
          </div>
        </div>
      </div>

      {/* Last Month Section */}
      <div>
        <h4 className="text-[4vw] md:text-[1vw] font-semibold text-(--text) mb-[3vw] md:mb-[1vw]">
          Last month
        </h4>

        {/* Activity Item 3 - Sam T. */}
        <div className="flex items-center justify-between py-[3vw] md:py-[0.8vw]">
          {/* Left: Avatar and Details */}
          <div className="flex items-center gap-[3vw] md:gap-[0.8vw]">
            <img 
              src="/heroSection/avatar3.png" 
              className="w-[10vw] h-[10vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover" 
              alt="Sam T." 
            />
            <div>
              <p className="text-[3.5vw] md:text-[1vw] font-semibold text-(--text)">
                Sam T.
              </p>
              <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">28 Jul 2026</p>
            </div>
          </div>

          {/* Right: Amount and Type */}
          <div className="text-right">
            <p 
              ref={amount3Ref}
              className="text-[3.5vw] md:text-[1vw] font-semibold text-(--text)"
            >
              -$0
            </p>
            <p className="text-[3vw] md:text-[0.85vw] text-(--gray-0)">top up</p>
          </div>
        </div>
      </div>
    </div>
  );
}
