"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useLoading } from "@/app/Components/UI/LoadingContext";

// Dynamically import ApexCharts to prevent SSR (Server-Side Rendering) issues
// This ensures the chart only loads on the client side
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Interface for Progress Item Props
 * Defines the structure of data passed to each progress bar component
 */
interface ProgressItemProps {
  icon: React.ReactNode;      // Icon component or image element
  label: string;               // Display label (e.g., "Transactions")
  percentage: number;          // Progress percentage value (0-100)
  color: string;               // Hex color code for the progress bar
  delay: number;               // Animation delay in seconds
}

/**
 * ProgressItem Component
 * Renders an interactive, animated progress bar with icon, label, and percentage
 * 
 * Features:
 * - Smooth width animation from 0% to target percentage
 * - Animated number counter from 0 to target value
 * - Hover effects: background color, icon scale, bar glow, number color change
 * - Scroll-triggered animations using GSAP ScrollTrigger
 * - Fully responsive with VW units
 */
function ProgressItem({ icon, label, percentage, color, delay }: ProgressItemProps) {
  // Refs for DOM elements to be animated
  const progressRef = useRef<HTMLDivElement>(null);      // Progress bar fill element
  const numberRef = useRef<HTMLSpanElement>(null);       // Percentage number text
  const containerRef = useRef<HTMLDivElement>(null);     // Container for hover detection
  
  // State to track hover status for interactive effects
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Animation Effect Hook
   * Runs once when component mounts
   * Sets up two synchronized animations:
   * 1. Progress bar width animation (0% → target%)
   * 2. Number counter animation (0 → target)
   * Both trigger when element scrolls into viewport
   */
  useEffect(() => {
    if (progressRef.current && numberRef.current) {
      // Animate progress bar width from 0% to target percentage
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },                              // Starting state
        {
          width: `${percentage}%`,                    // Ending state
          duration: 1.2,                              // Animation duration in seconds
          delay: delay,                               // Stagger delay for sequential animation
          ease: "power3.out",                         // Easing function for smooth deceleration
          scrollTrigger: {
            trigger: progressRef.current,             // Element to watch
            start: "top 90%",                         // Start when element is 90% in viewport
            toggleActions: "play none none reverse",  // Play on enter, reverse on leave
          },
        }
      );

      // Animate number counter from 0 to target percentage
      gsap.fromTo(
        numberRef.current,
        { innerText: 0 },                             // Start at 0
        {
          innerText: percentage,                      // Count up to target
          duration: 1.2,                              // Match progress bar duration
          delay: delay,                               // Match progress bar delay
          ease: "power3.out",                         // Match easing curve
          snap: { innerText: 1 },                     // Snap to whole numbers (no decimals)
          scrollTrigger: {
            trigger: numberRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          // Update callback to format number with % symbol on each frame
          onUpdate: function () {
            if (numberRef.current) {
              numberRef.current.innerText = Math.round(parseFloat(numberRef.current.innerText)) + "%";
            }
          },
        }
      );
    }
  }, [percentage, delay]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-between transition-all duration-300 p-[2.4vw] md:p-[0.4vw] rounded-[1.6vw] md:rounded-[0.4vw] cursor-pointer"
      style={{
        // Dynamic background color on hover (15% opacity of the bar color)
        backgroundColor: isHovered ? `${color}15` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Section: Icon and Progress Bar */}
      <div className="flex items-center gap-[2.4vw] md:gap-[0.64vw] flex-1">
        {/* Icon container with scale animation on hover */}
        <div
          className="flex items-center justify-center w-[6.4vw] h-[6.4vw] md:w-[1.44vw] md:h-[1.44vw] transition-transform duration-300"
          style={{
            // Scale up by 10% on hover
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {icon}
        </div>
        
        {/* Label and progress bar container */}
        <div className="flex-1">
          {/* Category label */}
          <span className="text-[3.2vw] md:text-[0.8vw] text-(--text) font-medium block mb-[0.8vw] md:mb-[0.24vw]">
            {label}
          </span>
          
          {/* Progress bar track (gray background) */}
          <div className="w-full bg-gray-200 rounded-full h-[1.6vw] md:h-[0.32vw] overflow-hidden">
            {/* Animated progress bar fill with dynamic color and glow effect */}
            <div
              ref={progressRef}
              className="h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor: color,                           // Dynamic color from props
                width: "0%",                                      // Initial width (animated by GSAP)
                boxShadow: isHovered ? `0 0 0.8vw ${color}` : "none", // Glow effect on hover
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Right Section: Percentage Number */}
      {/* Number changes color and scales up on hover */}
      <span
        ref={numberRef}
        className="text-[3.2vw] md:text-[0.8vw] font-semibold text-(--text) ml-[3.2vw] md:ml-[0.8vw] transition-all duration-300"
        style={{
          color: isHovered ? color : "var(--text)",            // Change to bar color on hover
          transform: isHovered ? "scale(1.1)" : "scale(1)",    // Scale up by 10% on hover
        }}
      >
        0%
      </span>
    </div>
  );
}

/**
 * AnalysisCard Component
 * Main card displaying monthly spending analysis with donut chart and progress bars
 * 
 * Features:
 * - Interactive ApexCharts donut chart with center labels
 * - Month navigation (previous/next buttons)
 * - Three animated progress bars for spending categories
 * - Scroll-triggered fade-up animation for entire card
 * - Fully responsive design with VW units
 * - Hover effects on all interactive elements
 * 
 * Data Structure:
 * - Chart shows 3 categories: Transactions (50%), Invoice (30%), Other (20%)
 * - Total spending: $3,620
 * - Comparison: 16.18% increase vs last month
 */
export default function AnalysisCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Mount Effect Hook
   * Sets mounted state to true after component renders on client
   * Prevents hydration mismatches between server and client
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Card Animation Effect Hook
   * Triggers fade-up animation when card scrolls into viewport
   * Only runs after loading is complete and component is mounted
   */
  useEffect(() => {
    if (!isLoading && mounted && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },                        // Start: 40px down, invisible
        {
          y: 0,                                       // End: original position
          opacity: 1,                                 // End: fully visible
          duration: 0.8,                              // Animation duration
          ease: "power3.out",                         // Smooth deceleration
          scrollTrigger: {
            trigger: cardRef.current,                 // Watch the card itself
            start: "top 85%",                         // Start when card is 85% in viewport
            toggleActions: "play none none reverse",  // Play on enter, reverse on leave
          },
        }
      );
    }
  }, [isLoading, mounted]);

  // Prevent rendering during loading or before client mount
  if (isLoading || !mounted) {
    return null;
  }

  /**
   * ApexCharts Configuration Object
   * Defines all chart appearance, behavior, and responsive settings
   */
  const chartOptions: any = {
    chart: {
      type: "donut",                                  // Donut chart type (circular with hole)
      animations: {
        enabled: true,                                // Enable chart animations
        easing: "easeinout",                          // Smooth acceleration/deceleration
        speed: 1200,                                  // Animation duration in ms
        animateGradually: {
          enabled: true,                              // Animate segments one by one
          delay: 150,                                 // Delay between segments
        },
        dynamicAnimation: {
          enabled: true,                              // Enable hover/interaction animations
          speed: 350,                                 // Speed of dynamic animations
        },
      },
    },
    // Labels for each chart segment
    labels: ["Transactions", "Invoice", "Other"],
    // Colors matching the progress bars
    colors: ["#7C3AED", "#FCD34D", "#34D399"],
    // Hide percentage labels on segments
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",                                // Size of donut hole (larger = smaller hole)
          labels: {
            show: true,                               // Show center labels
            name: {
              show: false,                            // Hide category name in center
            },
            // Center value label (dollar amount)
            value: {
              show: true,
              fontSize: "2vw",                        // Responsive font size (mobile) - 20% smaller
              fontWeight: 500,                        // text WEIGHT
              color: "#1F2937",                       // Dark gray color
              formatter: function () {
                return "Last Month";                      // Format as currency
              },
            },
            // Center subtitle label (comparison text)
            total: {
              show: true,
              showAlways: true,                       // Always show (even when not hovering)
              fontSize: "1.6vw",                      // Responsive font size (mobile) - 20% smaller
              fontWeight: 500,                        // Normal weight
              color: "#10B981",                       // Green color for positive change
              formatter: function () {
                return "$3,620";                  // Bottom line of subtitle
              },
            },
          },
        },
      },
    },
    // Hide default legend (we use custom progress bars instead)
    legend: {
      show: false,
    },
    // Remove borders between segments
    stroke: {
      width: 0,
    },
    // Configure hover tooltips
    tooltip: {
      enabled: true,                                  // Enable tooltips on hover
      y: {
        formatter: function (val: any) {
          return val + "%";                           // Format tooltip value with %
        },
      },
    },
    // Responsive breakpoints for different screen sizes
    responsive: [
      {
        breakpoint: 768,                              // Mobile devices (< 768px)
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: {
                    fontSize: "4.8vw",                // Larger font on mobile - 20% smaller
                  },
                  total: {
                    fontSize: "2.4vw",                // Larger subtitle on mobile - 20% smaller
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  // Chart data: percentage values for each segment (must total 100%)
  const chartSeries = [50, 30, 20];

  return (
    <div
      ref={cardRef}
      className="bg-(--white) rounded-[3.2vw] md:rounded-[1.44vw] p-[4.8vw] md:p-[1.2vw] opacity-0 w-[72vw] md:w-[22vw]"
      style={{ boxShadow: "0 0.4vw 1.6vw rgba(0, 0, 0, 0.06)" }}
    >
      {/* Card Header: Title and Icon */}
      <div className="flex items-center justify-between mb-[4vw] md:mb-[1.2vw] pb-[1vw] border-b border-black/5">
        <h3 className="text-[4.8vw] md:text-[1.12vw] font-semibold text-(--text)">
          Analysis
        </h3>
        {/* Chart icon in header */}
        <div>
          <img 
            src="/heroSection/pie_chart.svg" 
            className="w-[4.8vw] h-[4.8vw] md:w-[1.6vw] md:h-[1.6vw]" 
            alt="Chart icon" 
          />
        </div>
      </div>

      {/* Month Selector: Navigation with Previous/Next buttons */}
      <div className="flex items-center justify-center mb-[3.2vw] md:mb-[0.96vw]">
        {/* Previous month button */}
        <button className="p-[1.6vw] md:p-[0.32vw] hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-[4vw] h-[4vw] md:w-[1.04vw] md:h-[1.04vw]"
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
        
        {/* Current month and year display */}
        <div className="text-center min-w-[20vw] md:min-w-[12vw]">
          <h2 className="text-[5.6vw] md:text-[1.6vw] font-semibold text-(--text)">August</h2>
          <p className="text-[3.2vw] md:text-[0.8vw] text-(--gray-0)">2026</p>
        </div>
        
        {/* Next month button */}
        <button className="p-[1.6vw] md:p-[0.32vw] hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-[4vw] h-[4vw] md:w-[1.04vw] md:h-[1.04vw]"
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

      {/* Donut Chart - Using VW units for responsive sizing (20% smaller) */}
      <div className="mx-auto w-[56vw] h-[56vw] md:w-[14.4vw] md:h-[14.4vw] mb-[4vw] md:mb-[1.2vw]">
        <Chart 
          options={chartOptions} 
          series={chartSeries} 
          type="donut" 
          height="100%" 
          width="100%" 
        />
      </div>

      {/* Legend Section: Header and Progress Bars */}
      <div className="pt-[3.2vw] md:pt-[0.96vw] border-t-[0.32vw] md:border-t-[0.08vw] border-gray-200">
        {/* Section header with title and menu icon */}
        <div className="flex items-center justify-between mb-[3.2vw] md:mb-[0.8vw]">
          <p className="text-[3.2vw] md:text-[0.8vw] text-(--gray-0)">
            Compared to
            <br />
            <span className="font-semibold text-(--text)">Last month spending</span>
          </p>
          {/* Menu button (hamburger icon) */}
          <button className="hover:bg-gray-100 rounded transition-colors p-[1.2vw] md:p-[0.24vw]">
            <img 
              src="/heroSection/menu_icon.svg" 
              className="w-[4vw] h-[4vw] md:w-[1.6vw] md:h-[1.6vw]" 
              alt="Menu" 
            />
          </button>
        </div>

        {/* Progress Bars: Three categories with animated bars */}
        <div className="flex flex-col gap-[2.4vw] md:gap-[0.64vw]">
          {/* Transactions: 50% - Purple */}
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

          {/* Invoice: 30% - Yellow */}
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

          {/* Other: 20% - Green */}
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
