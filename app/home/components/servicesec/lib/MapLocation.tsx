"use client";

import { useEffect, useRef, useState } from "react";

export interface MapLocation {
  id: string;
  name: string;
  x: number; // Percentage position from left
  y: number; // Percentage position from top
}

interface WorldMapProps {
  locations: MapLocation[];
  mapRef?: React.RefObject<HTMLDivElement | null>;
}

export default function WorldMap({ locations, mapRef }: WorldMapProps) {
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

        @keyframes blink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }

        .blinking-dot {
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div
        ref={(el) => {
          containerRef.current = el;
          if (mapRef && typeof mapRef !== "function") {
            (mapRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className={`${
          isVisible ? "gentle-fade-up" : ""
        } relative bg-white/98 backdrop-blur-sm rounded-[2.4vw] md:rounded-[0.9vw]  shadow-[0_2.4px_12px_rgba(0,0,0,0.08)] transition-all duration-300`}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        {/* Map Image */}
        <div className="relative w-[22vw]">
          <img
            src="/homepageService/map.png"
            alt="World Map"
            className="w-full h-full object-contain opacity-30"
          />

          {/* Blinking Dots */}
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="absolute"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              {/* Pulse Ring */}
              <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="pulse-ring w-[1.5vw] h-[1.5vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-500"
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
              </div>

              {/* Main Dot */}
              <div
                className="blinking-dot w-[1.5vw] h-[1.5vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-600 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-500/50"
                style={{ animationDelay: `${index * 0.3}s` }}
              />

              {/* Tooltip on Hover */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[1vw] md:mt-[0.4vw] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-[2vw] md:text-[0.7vw] px-[2vw] py-[1vw] md:px-[0.8vw] md:py-[0.4vw] rounded-[0.8vw] md:rounded-[0.3vw] whitespace-nowrap">
                  {location.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
