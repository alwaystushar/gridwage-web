// app/Components/UI/EmailCtaInput.tsx
"use client";

import { useRef, useEffect } from "react";
import MagneticButton from "@/app/Components/UI/MagneticButton";

interface EmailCtaInputProps {
  placeholder?: string;
  buttonLabel?: string;
}

export default function EmailCtaInput({
  placeholder = "Enter Email",
  buttonLabel = "Request Demo",
}: EmailCtaInputProps) {
  const inputRef = useRef<HTMLDivElement | null>(null);

  // simple fade-in if you were using opacity-0
  useEffect(() => {
    if (!inputRef.current) return;
    requestAnimationFrame(() => {
      inputRef.current?.classList.remove("opacity-0");
      inputRef.current?.classList.add("opacity-100");
    });
  }, []);

  return (
    <div
      ref={inputRef}
      className="flex items-center gap-[0.5vw]  opacity-0 border-[0.12vw] border-[var(--brand-600)]/30 rounded-full lg:px-[0.3vw] lg:py-[0.2vw] px-[1vw] py-[1vw] bg-[var(--white)] focus-within:border-[var(--brand-600)]/100 transition-all duration-300 lg:max-w-[30vw]"
    >
      <input
        type="email"
        placeholder={placeholder}
        className="b3 flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--brand-100)] rounded-full border-none outline-none px-[2vw] pl-[1.5vw] py-[0.7vw]"
      />
      <MagneticButton variant="primary">{buttonLabel}</MagneticButton>
    </div>
  );
}
