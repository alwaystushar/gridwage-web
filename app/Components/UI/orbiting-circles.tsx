import React from "react";
import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  centerImage?: string;
  centerImageSize?: number;
  centerImageAlt?: string;
  gap?: number; // New prop: degrees to add between each item (default 0)
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 20,
  path = true,
  iconSize = 3,
  speed = 1,
  centerImage,
  centerImageSize = 8,
  centerImageAlt = "Center",
  gap = 0,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle))
              translateX(var(--radius)) rotate(calc(-1 * var(--angle)));
          }
          100% {
            transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg))
              translateX(var(--radius))
              rotate(calc(-1 * (var(--angle) + 360deg)));
          }
        }
        .animate-orbit {
          animation: orbit var(--duration) linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit var(--duration) linear infinite reverse;
        }
      `}</style>

      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <circle
            className="stroke-gray-300 dark:stroke-gray-700 stroke-1"
            cx="50%"
            cy="50%"
            r={`${radius}vw`}
            fill="none"
          />
        </svg>
      )}

      {/* Center Image */}
      {centerImage && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src={centerImage}
            alt={centerImageAlt}
            style={{
              width: `${centerImageSize}vw`,
              height: `${centerImageSize}vw`,
            }}
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      )}

      {React.Children.map(children, (child, index) => {
        const totalChildren = React.Children.count(children);
        // Calculate base angle with equal distribution
        const baseAngle = (360 / totalChildren) * index;
        // Add gap offset to each item
        const angle = baseAngle + gap * index;

        return (
          <div
            key={index}
            style={
              {
                "--duration": `${calculatedDuration}s`,
                "--radius": `${radius}vw`,
                "--angle": `${angle}deg`,
              } as React.CSSProperties
            }
            className={cn(
              "absolute left-1/2 top-1/2 flex items-center justify-center",
              reverse ? "animate-orbit-reverse" : "animate-orbit",
              className
            )}
            {...props}
          >
            <div
              style={{
                width: `${iconSize}vw`,
                height: `${iconSize}vw`,
              }}
              className="flex items-center justify-center rounded-full"
            >
              {child}
            </div>
          </div>
        );
      })}
    </>
  );
}
