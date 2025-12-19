"use client";

import { useEffect, useRef, useState } from "react";

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  priority: "high" | "critical" | "medium" | "low";
}

interface PriorityMetricsProps {
  metrics: MetricItem[];
  metricsRef?: React.RefObject<HTMLDivElement | null>;
}

export default function PriorityMetrics({
  metrics,
  metricsRef,
}: PriorityMetricsProps) {
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

  const getPriorityStyles = (priority: MetricItem["priority"]) => {
    switch (priority) {
      case "high":
        return {
          bg: "",
          text: "text-gray-900",
        };
      case "critical":
        return {
          bg: "bg-white",
          text: "text-gray-900",
        };
      case "medium":
        return {
          bg: "bg-white",
          text: "text-gray-900",
        };
      case "low":
        return {
          bg: "bg-white",
          text: "text-gray-900",
        };
      default:
        return {
          bg: "bg-white",
          text: "text-gray-900",
        };
    }
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

        .metric-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .metric-row:hover {
          border-color: rgb(191, 219, 254) !important;
        }
      `}</style>

      <div
        ref={(el) => {
          containerRef.current = el;
          if (metricsRef && typeof metricsRef !== "function") {
            (metricsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${
          isVisible ? "gentle-fade-up" : ""
        } bg-white/98 backdrop-blur-sm rounded-[2.4vw] md:rounded-[0.9vw] p-[3vw] md:p-[0.7vw] shadow-[0_2.4px_12px_rgba(0,0,0,0.08)] transition-all duration-300`}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        {/* Metrics Items */}
        <div className="flex flex-col gap-[2.4vw] md:gap-[0.5vw]">
          {metrics.map((metric, index) => {
            const styles = getPriorityStyles(metric.priority);

            return (
              <div
                key={metric.id}
                className={`metric-row ${styles.bg} flex items-center justify-between gap-[2.4vw] md:gap-[3.2vw] px-[3.6vw] md:px-[1.6vw] py-[2.4vw] md:py-[0.7vw] rounded-full md:rounded-full hover:bg-(--brand-0)  `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Left: Label */}
                <span className="text-[2.7vw] md:text-[0.96vw] text-(--brand-700) font-semibold flex-1">
                  {metric.label}
                </span>

                {/* Right: Value */}
                <span className={`text-[2.7vw] md:text-[0.96vw] ${styles.text} font-medium`}>
                  {metric.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
