"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useLoading } from "@/app/Components/UI/LoadingContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface ProgressItemProps {
  icon: React.ReactNode;
  label: string;
  percentage: number;
  color: string;
  delay: number;
}

function ProgressItem({
  icon,
  label,
  percentage,
  color,
  delay,
}: ProgressItemProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (progressRef.current && numberRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${percentage}%`,
          duration: 1.2,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        numberRef.current,
        { innerText: 0 },
        {
          innerText: percentage,
          duration: 1.2,
          delay: delay,
          ease: "power3.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: numberRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            if (numberRef.current) {
              numberRef.current.innerText =
                Math.round(parseFloat(numberRef.current.innerText)) + "%";
            }
          },
        }
      );
    }
  }, [percentage, delay]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-between transition-all duration-300 p-[1.536vw] md:p-[0.4vw] md:rounded-[0.4vw] cursor-pointer rounded-lg"
      style={{
        backgroundColor: isHovered ? `${color}15` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-[1.536vw] md:gap-[0.64vw] flex-1">
        <div
          className="flex items-center justify-center w-[4.096vw] h-[4.096vw] md:w-[1.44vw] md:h-[1.44vw] transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {icon}
        </div>

        <div className="flex-1">
          <span className="text-[2.048vw] md:text-[0.8vw] text-[var(--text)] font-medium block mb-[0.512vw] md:mb-[0.24vw]">
            {label}
          </span>

          <div className="w-full bg-gray-200 rounded-full h-[1.024vw] md:h-[0.32vw] overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor: color,
                width: "0%",
                boxShadow: isHovered ? `0 0 0.512vw ${color}` : "none",
              }}
            />
          </div>
        </div>
      </div>

      <span
        ref={numberRef}
        className="text-[2.048vw] md:text-[0.8vw] font-semibold text-[var(--text)] ml-[2.048vw] md:ml-[0.8vw] transition-all duration-300"
        style={{
          color: isHovered ? color : "var(--text)",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        0%
      </span>
    </div>
  );
}

export default function AnalysisCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && mounted && cardRef.current) {
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
    }
  }, [isLoading, mounted]);

  if (isLoading || !mounted) {
    return null;
  }

  const chartOptions: any = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: ["Transactions", "Invoice", "Other"],
    colors: ["#7C3AED", "#FCD34D", "#34D399"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "1.28vw",
              fontWeight: 500,
              color: "#1F2937",
              formatter: function () {
                return "Last Month";
              },
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: "1.024vw",
              fontWeight: 500,
              color: "#10B981",
              formatter: function () {
                return "$3,620";
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "3.072vw",
                  },
                  total: {
                    fontSize: "1.536vw",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = [50, 30, 20];

  return (
    <div
      ref={cardRef}
      className="bg-[var(--white)] rounded-[2.048vw] md:rounded-[1.44vw] p-[3.072vw] md:p-[1.2vw] opacity-0 w-[46.08vw] md:w-[22vw]"
      style={{ boxShadow: "0 0.256vw 1.024vw rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex items-center justify-between mb-[2.56vw] md:mb-[1.2vw] pb-[0.64vw] border-b border-black/5">
        <h3 className="text-[3.072vw] md:text-[1.12vw] font-semibold text-[var(--text)]">
          Analysis
        </h3>
        <div>
          <img
            src="/heroSection/pie_chart.svg"
            className="w-[3.072vw] h-[3.072vw] md:w-[1.6vw] md:h-[1.6vw]"
            alt="Chart icon"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-[2.048vw] md:mb-[0.96vw]">
        <button className="p-[1.024vw] md:p-[0.32vw] hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-[2.56vw] h-[2.56vw] md:w-[1.04vw] md:h-[1.04vw]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="text-center min-w-[12.8vw] md:min-w-[12vw]">
          <h2 className="text-[3.584vw] md:text-[1.6vw] font-semibold text-[var(--text)]">
            August
          </h2>
          <p className="text-[2.048vw] md:text-[0.8vw] text-[var(--gray-0)]">2026</p>
        </div>

        <button className="p-[1.024vw] md:p-[0.32vw] hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-[2.56vw] h-[2.56vw] md:w-[1.04vw] md:h-[1.04vw]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="mx-auto w-[35.84vw] h-[35.84vw] md:w-[14.4vw] md:h-[14.4vw] mb-[2.56vw] md:mb-[1.2vw]">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height="100%"
          width="100%"
        />
      </div>

      <div className="pt-[2.048vw] md:pt-[0.96vw] border-t-[0.2048vw] md:border-t-[0.08vw] border-gray-200">
        <div className="flex items-center justify-between mb-[2.048vw] md:mb-[0.8vw]">
          <p className="text-[2.048vw] md:text-[0.8vw] text-[var(--gray-0)]">
            Compared to
            <br />
            <span className="font-semibold text-[var(--text)]">
              Last month spending
            </span>
          </p>
          <button className="hover:bg-gray-100 rounded transition-colors p-[0.768vw] md:p-[0.24vw]">
            <img
              src="/heroSection/menu_icon.svg"
              className="w-[2.56vw] h-[2.56vw] md:w-[1.6vw] md:h-[1.6vw]"
              alt="Menu"
            />
          </button>
        </div>

        <div className="flex flex-col gap-[1.536vw] md:gap-[0.64vw]">
          <ProgressItem
            icon={
              <img
                src="/heroSection/payments.svg"
                className="w-full h-full"
                alt="Payments icon"
              />
            }
            label="Transactions"
            percentage={50}
            color="#7C3AED"
            delay={0.3}
          />

          <ProgressItem
            icon={
              <img
                src="/heroSection/receipt.svg"
                className="w-full h-full"
                alt="Receipt icon"
              />
            }
            label="Invoice"
            percentage={30}
            color="#FCD34D"
            delay={0.5}
          />

          <ProgressItem
            icon={
              <img
                src="/heroSection/texture.svg"
                className="w-full h-full"
                alt="Other icon"
              />
            }
            label="Other"
            percentage={20}
            color="#34D399"
            delay={0.7}
          />
        </div>
      </div>
    </div>
  );
}
