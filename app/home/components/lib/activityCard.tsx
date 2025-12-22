"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/Components/UI/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

interface ActivityItem {
  id: number;
  name: string;
  avatar: string;
  date: string;
  amount: number;
  type: "incoming" | "top up";
  isPositive: boolean;
}

export default function ActivityCard() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const amount1Ref = useRef<HTMLParagraphElement>(null);
  const amount2Ref = useRef<HTMLParagraphElement>(null);
  const amount3Ref = useRef<HTMLParagraphElement>(null);

  const thisMonthActivities: ActivityItem[] = [
    {
      id: 1,
      name: "Shaun B.",
      avatar: "/heroSection/avatar1.png",
      date: "8 Aug 2026",
      amount: 3500,
      type: "incoming",
      isPositive: true,
    },
    {
      id: 2,
      name: "Sam T.",
      avatar: "/heroSection/avatar2.png",
      date: "28 Jul 2026",
      amount: 80,
      type: "top up",
      isPositive: false,
    },
  ];

  const lastMonthActivities: ActivityItem[] = [
    {
      id: 3,
      name: "Sam T.",
      avatar: "/heroSection/avatar3.png",
      date: "28 Jul 2026",
      amount: 80,
      type: "top up",
      isPositive: false,
    },
  ];

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

      const amounts = [
        { ref: amount1Ref.current, value: 3500, isPositive: true },
        { ref: amount2Ref.current, value: 80, isPositive: false },
        { ref: amount3Ref.current, value: 80, isPositive: false },
      ];

      amounts.forEach((amount, index) => {
        if (amount.ref) {
          gsap.fromTo(
            amount.ref,
            { innerText: 0 },
            {
              innerText: amount.value,
              duration: 1.2,
              delay: 0.5 + index * 0.15,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                if (amount.ref) {
                  const value = Math.round(parseFloat(amount.ref.innerText));
                  const sign = amount.isPositive ? "+" : "-";
                  amount.ref.innerText = sign + "$" + value.toLocaleString();
                }
              },
            }
          );
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
      className="bg-[var(--white)] rounded-[2.268vw] md:rounded-[1.44vw] p-[3.402vw] md:p-[1.5vw] opacity-0 w-[40.824vw] md:w-[20.2vw]"
      style={{ boxShadow: "0 0.2268vw 0.9072vw rgba(0, 0, 0, 0.06)" }}
    >
      <div className="flex items-center justify-between mb-[2.835vw] md:mb-[1vw]">
        <h3 className="text-[2.7216vw] md:text-[1.2vw] font-semibold text-[var(--text)]">
          Activity
        </h3>
        <div>
          <img
            src="/heroSection/receipt_long.svg"
            className="w-[2.7216vw] h-[2.7216vw] md:w-[1.2vw] md:h-[1.2vw]"
            alt="Calendar"
          />
        </div>
      </div>

      <div className="mb-[2.835vw] md:mb-[1vw]">
        <h4 className="text-[2.268vw] md:text-[1vw] font-semibold text-[var(--text)] mb-[1.701vw] md:mb-0">
          This month
        </h4>

        <div className="flex items-center justify-between py-[1.701vw] md:py-[0.8vw] border-b-[0.1701vw] md:border-b-[0.08vw] border-gray-200">
          <div className="flex items-center gap-[1.701vw] md:gap-[0.8vw]">
            <img
              src="/heroSection/avatar1.png"
              className="w-[5.67vw] h-[5.67vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover"
              alt="Shaun B."
            />
            <div>
              <p className="text-[1.9845vw] md:text-[1vw] font-semibold text-[var(--text)]">
                Shaun B.
              </p>
              <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
                8 Aug 2026
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              ref={amount1Ref}
              className="text-[1.9845vw] md:text-[1vw] font-semibold text-[#10B981]"
            >
              +$0
            </p>
            <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
              incoming
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-[1.701vw] md:py-[0.8vw]">
          <div className="flex items-center gap-[1.701vw] md:gap-[0.8vw]">
            <img
              src="/heroSection/avatar2.png"
              className="w-[5.67vw] h-[5.67vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover"
              alt="Sam T."
            />
            <div>
              <p className="text-[1.9845vw] md:text-[1vw] font-semibold text-[var(--text)]">
                Sam T.
              </p>
              <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
                28 Jul 2026
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              ref={amount2Ref}
              className="text-[1.9845vw] md:text-[1vw] font-semibold text-[var(--text)]"
            >
              -$0
            </p>
            <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
              top up
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[2.268vw] md:text-[1vw] font-semibold text-[var(--text)] mb-[1.701vw] md:mb-[1vw]">
          Last month
        </h4>

        <div className="flex items-center justify-between py-[1.701vw] md:py-[0.8vw]">
          <div className="flex items-center gap-[1.701vw] md:gap-[0.8vw]">
            <img
              src="/heroSection/avatar3.png"
              className="w-[5.67vw] h-[5.67vw] md:w-[2.5vw] md:h-[2.5vw] rounded-full object-cover"
              alt="Sam T."
            />
            <div>
              <p className="text-[1.9845vw] md:text-[1vw] font-semibold text-[var(--text)]">
                Sam T.
              </p>
              <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
                28 Jul 2026
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              ref={amount3Ref}
              className="text-[1.9845vw] md:text-[1vw] font-semibold text-[var(--text)]"
            >
              -$0
            </p>
            <p className="text-[1.701vw] md:text-[0.85vw] text-[var(--gray-0)]">
              top up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
