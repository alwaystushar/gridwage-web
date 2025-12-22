"use client";

import { useEffect, useRef, useState } from "react";

export interface CycleStep {
  id: string;
  label: string;
  status: "completed" | "auto" | "in-progress" | "scheduled";
}

interface PayrollCycleCardProps {
  title?: string;
  steps: CycleStep[];
  cycleRef?: React.RefObject<HTMLDivElement | null>;
}

export default function PayrollCycleCard({
  title = "Payroll Cycle — Automated",
  steps,
  cycleRef,
}: PayrollCycleCardProps) {
  const [isVisible, setIsVisible] = useState(false);
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

  const getStatusStyles = (status: CycleStep["status"]) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          border: "border-green-200",
          hoverBg: "hover:bg-green-100",
        };
      case "auto":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
          hoverBg: "hover:bg-blue-100",
        };
      case "in-progress":
        return {
          bg: "bg-orange-50",
          text: "text-orange-600",
          border: "border-orange-200",
          hoverBg: "hover:bg-orange-100",
        };
      case "scheduled":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          border: "border-red-200",
          hoverBg: "hover:bg-red-100",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
          hoverBg: "hover:bg-gray-100",
        };
    }
  };

  const getStatusLabel = (status: CycleStep["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "auto":
        return "Auto";
      case "in-progress":
        return "In Progress";
      case "scheduled":
        return "Scheduled";
      default:
        return status;
    }
  };

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

        .status-badge {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .status-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div
        ref={(el) => {
          containerRef.current = el;
          if (cycleRef && typeof cycleRef !== "function") {
            (cycleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${
          isVisible ? "gentle-fade-up" : ""
        } bg-white/98 backdrop-blur-sm rounded-[2.16vw] md:rounded-[0.9vw] p-[2.7vw] md:p-[1.2vw] shadow-[0_2.16px_10.8px_rgba(0,0,0,0.08)] transition-all duration-300`}
        style={{
          opacity: 0,
          transform: "translateY(18px)",
        }}
      >
        {/* Title */}
        <h2 className="text-[2.7vw] md:text-[0.96vw] font-semibold text-[var(--text)] mb-[2.7vw] md:mb-[1.2vw]">
          {title}
        </h2>

        {/* Cycle Steps */}
        <div className="flex flex-col gap-[1.62vw] md:gap-[0.72vw]">
          {steps.map((step, index) => {
            const styles = getStatusStyles(step.status);

            return (
              <div
                key={step.id}
                className="flex items-center justify-between gap-[1.62vw] md:gap-[1.2vw]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Step Label */}
                <span className="text-[2.16vw] md:text-[0.69vw] text-[var(--text)] font-normal flex-1">
                  {step.label}
                </span>

                {/* Status Badge - Fixed width for uniformity */}
                <span
                  className={`status-badge ${styles.bg} ${styles.text} ${styles.border} ${styles.hoverBg} border px-[2.16vw] py-[0.81vw] md:px-[0.9vw] md:py-[0.3vw] rounded-full text-[1.89vw] md:text-[0.6vw] font-medium text-center min-w-[18vw] md:min-w-[7vw]`}
                >
                  {getStatusLabel(step.status)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
