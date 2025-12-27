// app/Components/UI/MagneticButton.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap"; // GSAP is used to animate the flair position and scale[web:160]
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  strength?: number; // kept for API compatibility, but not used in this version
}

/**
 * MagneticButton
 *
 * A button/link component that:
 * - Keeps your existing Tailwind/variant styling.
 * - Adds a GSAP‑driven "flair" circle that grows under the cursor,
 *   tracks it while hovering, and exits nicely on mouseleave.
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  // Ref to the clickable element (button or Next.js Link anchor)
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Ref to the flair wrapper (absolute overlay that GSAP moves and scales)
  const flairRef = useRef<HTMLDivElement>(null);

  // Ref to the text span (kept for potential future text animation / reset)
  const textRef = useRef<HTMLSpanElement>(null);

  /**
   * handleMouseMove
   *
   * Runs on every mousemove while hovering over the button.
   * Converts mouse position inside the button into percentage values (0–100),
   * then tweens the flair's xPercent/yPercent so the circle follows the cursor.
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current || !flairRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();

    // Build transformer functions:
    //   - mapRange: maps from pixel space (0..width/height) → 0..100
    //   - clamp: ensures result stays between 0 and 100
    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.width, 0, 100),
      gsap.utils.clamp(0, 100)
    );
    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    // Mouse position relative to the button's top‑left corner
    const x = xTransformer(e.clientX - rect.left);
    const y = yTransformer(e.clientY - rect.top);

    // Move the flair toward the cursor.
    // Increase duration (e.g. 1.4 → 2) to make the follow slower,
    // decrease to make it snappier.[web:155][web:160]
    gsap.to(flairRef.current, {
      xPercent: x,
      yPercent: y,
      duration: 1.4,
      ease: "power2",
    });
  };

  /**
   * handleMouseEnter
   *
   * When the cursor first enters the button:
   * - Place the flair directly under the cursor.
   * - Animate the flair's scale from 0 → 1 so it "grows in".
   */
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!flairRef.current || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.width, 0, 100),
      gsap.utils.clamp(0, 100)
    );
    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const x = xTransformer(e.clientX - rect.left);
    const y = yTransformer(e.clientY - rect.top);

    // Position flair under cursor instantly (no animation here)
    gsap.set(flairRef.current, {
      xPercent: x,
      yPercent: y,
    });

    // Scale flair up from 0 → 1.
    // Increase duration to slow down the "grow in" feel.
    gsap.to(flairRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  /**
   * handleMouseLeave
   *
   * When the cursor leaves the button:
   * - Kill any running tweens on the flair.
   * - Move the flair slightly "past" the edge in the direction
   *   the cursor exited, while scaling it down to 0.
   * - Reset text transforms in case they were changed in future tweaks.
   */
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!elementRef.current || !flairRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.width, 0, 100),
      gsap.utils.clamp(0, 100)
    );
    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, rect.height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const x = xTransformer(e.clientX - rect.left);
    const y = yTransformer(e.clientY - rect.top);

    // Stop any ongoing flair animation to avoid conflicts
    gsap.killTweensOf(flairRef.current);

    // Animate flair toward outside edge and shrink to 0.
    // Duration controls how long the exit takes (larger = slower).
    gsap.to(flairRef.current, {
      xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
      yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
      scale: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Reset any potential text offset.
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  /**
   * Variant‑based Tailwind classes.
   * These are unchanged from your original implementation.
   */
const baseStyles =
  variant === "primary"
    ? "bg-[var(--brand-500)] text-[var(--white)] hover:bg-[var(--brand-700)]"
    : variant === "secondary"
    ? "text-[var(--brand-500)]  hover:text-[var(--white)]"
    : "bg-transparent text-[var(--white)] hover:bg-[var(--white)] hover:text-[var(--brand-500)]";

const borderStyle =
  variant === "primary"
    ? { border: "0.12vw solid var(--brand-400)" } // primary border
    : variant === "secondary"
    ? { border: "0.1vw solid var(--brand-400)" } // secondary border (same as before)
    : { border: "0.15vw solid var(--white)" };   // outline border (same as before)


  // Shared button/link Tailwind classes
  const commonStyles = `md:text-[0.85vw] rounded-full transition-all lg:py-[0.55vw] py-[2vw] lg:px-[1.3vw] px-[4vw]  ${baseStyles} ${className}`;

  // Shared inline styles for layout/overflow
  const commonStyleProps = {
    ...borderStyle,
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  /**
   * innerContent
   *
   * Renders:
   * - The actual label (children) in a span above everything (zIndex: 2).
   * - The flair wrapper with an absolutely‑positioned circle (zIndex: 1),
   *   which GSAP animates using xPercent/yPercent and scale.
   */
  const innerContent = (
    <>
      <span
        ref={textRef}
        className="relative inline-block"
        style={{ position: "relative", zIndex: 2 }}
      >
        {children}
      </span>

      {/* Flair overlay that GSAP controls */}
      <div
        ref={flairRef}
        className="button__flair"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transformOrigin: "0 0",
          scale: 0, // start fully hidden
          willChange: "transform",
          zIndex: 1,
        }}
      >
        {/* The actual circle that visually appears under the cursor */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "170%", // big enough to cover the button
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "var(--brand-400)", // flair color
          }}
        />
      </div>
    </>
  );

  // If href is provided, render as Next.js Link
  if (href) {
    return (
      <Link
        href={href}
        ref={elementRef as any}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={commonStyles}
        style={commonStyleProps}
      >
        {innerContent}
      </Link>
    );
  }

  // Otherwise, render as a standard button
  return (
    <button
      ref={elementRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={commonStyles}
      style={commonStyleProps}
    >
      {innerContent}
    </button>
  );
}
