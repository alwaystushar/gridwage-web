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
            transform: translateY(13.5px);
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

      {/* Scale wrapper - makes everything 81% (10% smaller than 90%) */}
      <div className="scale-[0.81] origin-center">
        <div
          ref={(el) => {
            containerRef.current = el;
            if (avatarsRef && typeof avatarsRef !== 'function') {
              (avatarsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
          }}
          className="flex flex-col gap-[2.25vw] md:gap-[1vw] bg-white/10 backdrop-blur-md p-[2.7vw] md:p-[1vw] rounded-[2.7vw] md:rounded-[1.2vw] border border-[var(--brand-100)] shadow-lg"
        >
          {avatars.map((avatar, index) => (
            <div
              key={avatar.id}
              className={`avatar-card ${
                isVisible ? "gentle-fade-up" : ""
              } group bg-white/98 backdrop-blur-sm rounded-[3.6vw] md:rounded-[1.5vw] pl-[2.7vw] pr-[3.6vw] py-[2.25vw] md:pl-[1.2vw] md:pr-[1.5vw] md:py-[1vw] flex items-center gap-[2.25vw] md:gap-[1vw] shadow-[0_3.6px_18px_rgba(0,0,0,0.08)] hover:shadow-[0_5.4px_27px_rgba(0,0,0,0.15)] hover:scale-[1.02] hover:-translate-y-[0.18vw] transition-all duration-300 cursor-pointer`}
              style={{
                opacity: 0,
                transform: "translateY(13.5px)",
                animationDelay: isVisible ? `${index * 0.12}s` : "0s",
              }}
            >
              <img
                src={avatar.avatarSrc}
                alt={`${avatar.name} from ${avatar.countryName}`}
                className="w-[9vw] h-[9vw] md:w-[4vw] md:h-[4vw] rounded-full object-cover border-[0.36vw] md:border-[0.15vw] border-white group-hover:scale-110 transition-transform duration-300"
              />

              <div className="flex-1">
                <span className="text-[3.42vw] md:text-[1.1vw] font-semibold text-[#1a1a1a] whitespace-nowrap block mb-[1.35vw] md:mb-[0.5vw]">
                  {avatar.name}
                </span>
                <div className="flex flex-col gap-[1.35vw] md:gap-[0.4vw]">
                  {/* Pulsing Loading Bar 1 */}
                  <div className="h-[1.8vw] md:h-[0.6vw] w-[18vw] md:w-[9vw] rounded-full bg-gray-200 animate-pulse"></div>

                  {/* Pulsing Loading Bar 2 with delay */}
                  <div className="h-[1.8vw] md:h-[0.6vw] w-[12.6vw] md:w-[6vw] rounded-full bg-gray-200 animate-pulse [animation-delay:0.3s]"></div>
                </div>
              </div>

              <img
                src={avatar.countrySrc}
                alt={avatar.countryName}
                className="w-[5.4vw] h-[5.4vw] md:w-[2.2vw] md:h-[2.2vw] rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
