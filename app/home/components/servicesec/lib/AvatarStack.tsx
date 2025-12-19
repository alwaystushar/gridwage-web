"use client";

import { useEffect, useRef, useState } from "react";

export interface AvatarData {
  id: string;
  avatarSrc: string;
  name: string;
  countrySrc: string;
  countryName: string;
}

interface AvatarStackProps {
  avatars: AvatarData[];
  avatarsRef?: React.RefObject<HTMLDivElement | null>;
}

export default function AvatarStack({ avatars, avatarsRef }: AvatarStackProps) {
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
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gentle-fade-up {
          animation: gentleFadeUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div
        ref={(el) => {
          containerRef.current = el;
          if (avatarsRef && typeof avatarsRef !== 'function') {
            (avatarsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
        }}
        className="flex flex-col gap-[1.6vw] md:gap-[0.64vw] bg-white/10 backdrop-blur-md p-[1.92vw] md:p-[0.64vw] rounded-[1.92vw] md:rounded-[0.8vw] border border-[var(--brand-0)] shadow-lg"
      >
        {avatars.map((avatar, index) => (
          <div
            key={avatar.id}
            className={`avatar-card ${
              isVisible ? "gentle-fade-up" : ""
            } group bg-white/98 backdrop-blur-sm rounded-[2.56vw] md:rounded-[0.96vw] pl-[1.92vw] pr-[2.56vw] py-[1.6vw] md:pl-[0.8vw] md:pr-[0.96vw] md:py-[0.64vw] flex items-center gap-[1.6vw] md:gap-[0.64vw] shadow-[0_2.4px_12.8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_19.2px_rgba(0,0,0,0.15)] hover:scale-[1.02] hover:-translate-y-[0.13vw] transition-all duration-300 cursor-pointer`}
            style={{
              opacity: 0,
              transform: "translateY(15px)",
              animationDelay: isVisible ? `${index * 0.12}s` : "0s",
            }}
          >
            <img
              src={avatar.avatarSrc}
              alt={`${avatar.name} from ${avatar.countryName}`}
              className="w-[6.4vw] h-[6.4vw] md:w-[2.56vw] md:h-[2.56vw] rounded-full object-cover border-[0.26vw] md:border-[0.1vw] border-white group-hover:scale-110 transition-transform duration-300"
            />

            <div className="flex-1">
              <span className="text-[2.4vw] md:text-[0.7vw] font-semibold text-[#1a1a1a] whitespace-nowrap block mb-[0.96vw] md:mb-[0.32vw]">
                {avatar.name}
              </span>
              <div className="flex flex-col gap-[0.96vw] md:gap-[0.26vw]">
                {/* Pulsing Loading Bar 1 */}
                <div className="h-[1.28vw] md:h-[0.38vw] w-[12.8vw] md:w-[5.76vw] rounded-full bg-gray-200 animate-pulse"></div>

                {/* Pulsing Loading Bar 2 with delay */}
                <div className="h-[1.28vw] md:h-[0.38vw] w-[8.96vw] md:w-[3.84vw] rounded-full bg-gray-200 animate-pulse [animation-delay:0.3s]"></div>
              </div>
            </div>

            <img
              src={avatar.countrySrc}
              alt={avatar.countryName}
              className="w-[3.84vw] h-[3.84vw] md:w-[1.41vw] md:h-[1.41vw] rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </>
  );
}
