"use client";

import { useEffect, useRef, useState } from "react";

export interface StatCardProps {
  value: string | number;
  unit?: string;
  description: string;
  icon?: React.ReactNode;
  statRef?: React.RefObject<HTMLDivElement | null>;
  duration?: number;
}

export default function StatCard({
  value,
  unit = "%",
  description,
  icon,
  statRef,
  duration = 2000,
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const numericValue = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easeOutExpo * numericValue);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, numericValue, duration]);

  return (
    <>
      <style jsx>{`
        @keyframes gentleFadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gentle-fade-up {
          animation: gentleFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div
        ref={(el) => {
          containerRef.current = el;
          if (statRef && typeof statRef !== "function") {
            (statRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${
          isVisible ? "gentle-fade-up" : ""
        } group relative bg-white/98 backdrop-blur-sm rounded-[2.88vw] md:rounded-[1.2vw] p-[2.88vw] md:p-[1.2vw] shadow-[0_2.88px_14.4px_rgba(0,0,0,0.08)] hover:shadow-[0_4.32px_21.6px_rgba(0,0,0,0.10)] hover:scale-[1.02] hover:-translate-y-[0.144vw] transition-all duration-300 cursor-pointer w-[50.4vw] md:w-[16vw]`}
        style={{
          opacity: 0,
          transform: "translateY(18px)",
        }}
      >
        {/* Icon Badge - Top Right */}
        {icon && (
          <div className="absolute top-[-1.44vw] right-[-1.44vw] md:top-[-1.6vw] md:right-[-1.6vw] w-[8.64vw] h-[8.64vw] md:w-[4.8vw] md:h-[4.8vw] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            {icon}
          </div>
        )}

        {/* Value and Unit */}
        <div className="flex items-baseline gap-[0.72vw] md:gap-[0.24vw] mb-[1.44vw] md:mb-[0.64vw]">
          <h3 className="text-[8.64vw] md:text-[3.6vw] font-medium text-[var(--text)] leading-none tabular-nums">
            {isVisible ? count : 0}
          </h3>
          {unit && (
            <span className="text-[4.32vw] md:text-[1.6vw] font-bold text-[var(--brand-400)]">
              {unit}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[2.52vw] md:text-[0.8vw] text-[var(--gray-0)] leading-[1.4]">
          {description}
        </p>
      </div>
    </>
  );
}
