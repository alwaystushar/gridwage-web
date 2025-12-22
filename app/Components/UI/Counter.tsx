// components/Counter.tsx
"use client";

import CountUp from "react-countup";

interface CounterProps {
  end: number;
  suffix?: string;
  className?: string;
}

export function Counter({ end, suffix = "", className = "" }: CounterProps) {
  return (
    <CountUp
      end={end}
      duration={2}
      enableScrollSpy
      scrollSpyOnce
      suffix={suffix}
      className={className}
    />
  );
}
