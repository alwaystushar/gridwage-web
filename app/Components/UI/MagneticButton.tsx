"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string; // Added href support
  variant?: "primary" | "secondary";
  strength?: number; // Magnetic strength (0-1)
}

export default function MagneticButton({ 
  children, 
  className = "",
  onClick,
  href,
  variant = "primary",
  strength = 0.3
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    // Calculate center of element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Calculate movement strength
    const moveX = deltaX * strength;
    const moveY = deltaY * strength;
    
    // Calculate rotation based on position
    const rotateX = (deltaY / rect.height) * 10;
    const rotateY = (deltaX / rect.width) * -10;

    // Animate element
    gsap.to(element, {
      x: moveX,
      y: moveY,
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 500,
      transformOrigin: "center center",
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate text slightly more
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: moveX * 0.5,
        y: moveY * 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!elementRef.current) return;

    // Reset element to original position
    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    // Reset text
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const baseStyles = variant === "primary" 
    ? "bg-[var(--brand-500)] text-[var(--white)] hover:bg-[var(--brand-700)]"
    : "text-[var(--brand-500)] hover:bg-[var(--brand-600)] hover:text-[var(--white)]";

  const borderStyle = variant === "secondary" 
    ? { border: '0.1vw solid var(--brand-900)' }
    : {};

  const commonStyles = `b3 rounded-full transition-all lg:py-[0.7vw] py-[2vw] lg:px-[1.3vw] px-[4vw] ${baseStyles} ${className}`;
  
  const commonStyleProps = {
    ...borderStyle,
    transformStyle: 'preserve-3d' as const,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const content = (
    <span 
      ref={textRef}
      style={{ 
        display: 'inline-block',
        position: 'relative',
      }}
    >
      {children}
    </span>
  );

  // Render as Link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        ref={elementRef as any}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={commonStyles}
        style={commonStyleProps}
      >
        {content}
      </Link>
    );
  }

  // Render as button if onClick or no href
  return (
    <button
      ref={elementRef as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={commonStyles}
      style={commonStyleProps}
    >
      {content}
    </button>
  );
}
