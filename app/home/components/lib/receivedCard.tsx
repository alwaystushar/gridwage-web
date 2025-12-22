"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/Components/UI/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export default function ReceivedCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spark1Ref = useRef<HTMLDivElement>(null);
  const spark2Ref = useRef<HTMLDivElement>(null);
  const spark3Ref = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLHeadingElement>(null);

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

      if (amountRef.current) {
        gsap.fromTo(
          amountRef.current,
          { innerText: 0 },
          {
            innerText: 2618,
            duration: 1.5,
            delay: 0.8,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (amountRef.current) {
                const value = Math.round(
                  parseFloat(amountRef.current.innerText)
                );
                amountRef.current.innerText = "$" + value.toLocaleString();
              }
            },
          }
        );
      }

      const sparks = [
        { ref: spark1Ref.current, scale: 1, rotation: 360 },
        { ref: spark2Ref.current, scale: 1.3, rotation: -360 },
        { ref: spark3Ref.current, scale: 0.8, rotation: 360 },
      ];

      sparks.forEach((spark, index) => {
        if (spark.ref) {
          gsap.fromTo(
            spark.ref,
            { scale: 0, rotation: 0, opacity: 0 },
            {
              scale: spark.scale,
              rotation: spark.rotation,
              opacity: 1,
              duration: 1.2,
              delay: 0.5 + index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.to(spark.ref, {
            y: "+=10",
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.8 + index * 0.15,
          });
        }
      });
    }
  }, [isLoading, mounted]);

  if (isLoading || !mounted) {
    return null;
  }

  return (
    <div
      ref={cardRef}
      className="bg-[var(--white)] rounded-[2.24vw] md:rounded-[1.44vw] p-[3.36vw] md:p-[1.2vw] opacity-0 w-[40.32vw] md:w-[20.2vw] relative overflow-hidden"
      style={{ boxShadow: "0 0.224vw 1.456vw rgba(0, 0, 0, 0.02)" }}
    >
      <div className="flex items-center justify-between mb-[2.8vw] md:mb-[1vw]">
        <h3 className="text-[2.688vw] md:text-[1.12vw] font-semibold text-[var(--text)]">
          Received
        </h3>
        <div>
          <img
            src="/heroSection/menu_icon.svg"
            className="w-[2.688vw] h-[2.688vw] md:w-[1.6vw] md:h-[1.6vw]"
            alt="Menu"
          />
        </div>
      </div>

      {/* Spark 1 - Top Right */}
      <div
        ref={spark1Ref}
        className="absolute animate-ping top-[6.72vw] md:top-[3vw] right-[3.36vw] md:right-[1.8vw] w-[4.48vw] h-[4.48vw] md:w-[2vw] md:h-[2vw] opacity-0"
      >
        <img
          src="/heroSection/spark.svg"
          className="w-full h-full"
          alt="Spark decoration"
        />
      </div>

      {/* Spark 2 - Middle Right */}
      <div
        ref={spark2Ref}
        className="absolute top-[15.68vw] md:top-[8vw] right-[4.48vw] md:right-[2.2vw] w-[5.6vw] h-[5.6vw] md:w-[2.6vw] md:h-[2.6vw] opacity-0"
      >
        <img
          src="/heroSection/spark.svg"
          className="w-full h-full"
          alt="Spark decoration"
        />
      </div>

      {/* Spark 3 - Bottom Left */}
      <div
        ref={spark3Ref}
        className="absolute bottom-[6.72vw] md:bottom-[3vw] left-[3.36vw] md:left-[1.8vw] w-[3.36vw] h-[3.36vw] md:w-[1.6vw] md:h-[1.6vw] opacity-0"
      >
        <img
          src="/heroSection/spark.svg"
          className="w-full h-full"
          alt="Spark decoration"
        />
      </div>

      <div className="text-center mb-[2.8vw] md:mb-[1vw] relative z-10">
        <div className="relative inline-block mb-[1.68vw] md:mb-[0.2vw]">
          <img
            src="/heroSection/pic.png"
            className="w-[11.2vw] h-[11.2vw] md:w-[5vw] md:h-[5vw] rounded-full object-cover"
            alt="User avatar"
          />
          <div className="absolute bottom-0 right-0 bg-[#7C3AED] rounded-full w-[3.92vw] h-[3.92vw] md:w-[1.8vw] md:h-[1.8vw] flex items-center justify-center border-2 border-white">
            <span className="text-white text-[2.24vw] md:text-[1vw] font-bold">
              $
            </span>
          </div>
        </div>

        <h4 className="text-[2.24vw] md:text-[1vw] font-semibold text-[var(--text)] mb-[0.84vw] md:mb-[0.4vw]">
          Ilya S.
        </h4>

        <p className="text-[1.96vw] md:text-[0.85vw] text-[var(--gray-0)] mb-[1.12vw] md:mb-[0.5vw]">
          Sent you
        </p>

        <h2
          ref={amountRef}
          className="text-[4.48vw] md:text-[2vw] font-semibold text-[var(--text)]"
        >
          $0
        </h2>
      </div>

      <div className="flex items-center justify-center gap-[3.36vw] md:gap-[2vw] mb-[1.68vw] md:mb-[0.2vw]">
        {/* Send Button */}
        <div className="flex flex-col items-center gap-[1.12vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[7.84vw] h-[7.84vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img
              src="/heroSection/send_icon.svg"
              className="w-[3.36vw] h-[3.36vw] md:w-[1.4vw] md:h-[1.4vw]"
              alt="Send"
            />
          </button>
          <p className="text-[1.96vw] md:text-[0.85vw] text-[var(--gray-0)]">Send</p>
        </div>

        {/* Balance Button */}
        <div className="flex flex-col items-center gap-[1.12vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[7.84vw] h-[7.84vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img
              src="/heroSection/dollar_icon.svg"
              className="w-[3.36vw] h-[3.36vw] md:w-[1.4vw] md:h-[1.4vw]"
              alt="Balance"
            />
          </button>
          <p className="text-[1.96vw] md:text-[0.85vw] text-[var(--gray-0)]">
            Balance
          </p>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-[1.12vw] md:gap-[0.6vw]">
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full w-[7.84vw] h-[7.84vw] md:w-[3.2vw] md:h-[3.2vw] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <img
              src="/heroSection/share_icon.svg"
              className="w-[3.36vw] h-[3.36vw] md:w-[1.4vw] md:h-[1.4vw]"
              alt="Share"
            />
          </button>
          <p className="text-[1.96vw] md:text-[0.85vw] text-[var(--gray-0)]">Share</p>
        </div>
      </div>
    </div>
  );
}
