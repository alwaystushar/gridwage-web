"use client";

import { useEffect, useRef, useState } from "react";

export interface PayrollData {
  id: string;
  country: string;
  flagSrc: string;
  employees: number;
  amount: number;
  currency: string;
}

interface PayrollOverviewProps {
  payrollData: PayrollData[];
  payrollRef?: React.RefObject<HTMLDivElement | null>;
  duration?: number;
}

export default function PayrollOverview({
  payrollData,
  payrollRef,
  duration = 2000,
}: PayrollOverviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: { employees: number; amount: number } }>({});
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Counter animation for all payroll items
  useEffect(() => {
    if (!isVisible) return;

    const animationFrames: number[] = [];
    
    payrollData.forEach((item) => {
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentEmployees = Math.floor(easeOutExpo * item.employees);
        const currentAmount = Math.floor(easeOutExpo * item.amount);

        setCounts((prev) => ({
          ...prev,
          [item.id]: { employees: currentEmployees, amount: currentAmount },
        }));

        if (progress < 1) {
          const frame = requestAnimationFrame(animate);
          animationFrames.push(frame);
        } else {
          setCounts((prev) => ({
            ...prev,
            [item.id]: { employees: item.employees, amount: item.amount },
          }));
        }
      };

      const frame = requestAnimationFrame(animate);
      animationFrames.push(frame);
    });

    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [isVisible, payrollData, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <>
      <style jsx>{`
        @keyframes gentleFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
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
          if (payrollRef && typeof payrollRef !== "function") {
            (payrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${
          isVisible ? "gentle-fade-up" : ""
        } bg-white/98 backdrop-blur-sm rounded-[2.4vw] md:rounded-[0.9vw] p-[3vw] md:p-[1.2vw] shadow-[0_2.4px_12px_rgba(0,0,0,0.08)] transition-all duration-300`}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        {/* Title */}
        <h2 className="text-[3.6vw] md:text-[1.2vw] font-semibold text-[var(--text)] mb-[2.4vw] md:mb-[0.9vw]">
          Your Global Payroll Overview
        </h2>

        {/* Payroll Items */}
        <div className="flex flex-col gap-[1.8vw] md:gap-[0.72vw]">
          {payrollData.map((item, index) => {
            const currentCounts = counts[item.id] || { employees: 0, amount: 0 };

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-[1.8vw] md:gap-[0.9vw] py-[1.2vw] md:py-[0.48vw] border-b border-gray-100 last:border-0"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Left: Flag + Employees */}
                <div className="flex items-center gap-[1.8vw] md:gap-[0.6vw] flex-1">
                  {/* Flag */}
                  <img
                    src={item.flagSrc}
                    alt={item.country}
                    className="w-[6vw] h-[6vw] md:w-[2.1vw] md:h-[2.1vw] rounded-full object-cover shadow-md"
                  />

                  {/* Employees Count */}
                  <span className="text-[2.4vw] md:text-[0.72vw] text-[var(--gray-0)] tabular-nums">
                    {isVisible ? formatNumber(currentCounts.employees) : 0} Employees
                  </span>
                </div>

                {/* Right: Amount */}
                <span className="text-[2.7vw] md:text-[0.78vw] font-semibold text-[var(--text)] tabular-nums">
                  {item.currency}
                  {isVisible ? formatNumber(currentCounts.amount) : 0}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
