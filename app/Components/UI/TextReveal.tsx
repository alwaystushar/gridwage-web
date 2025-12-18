"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLoading } from "./LoadingContext";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnLoad?: boolean;
  stagger?: number;
  lineHeight?: string;
}

export default function TextReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 1.2,
  triggerOnLoad = false,
  stagger = 0.1,
  lineHeight = "1.2"
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();
  const splitRef = useRef<SplitType | null>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    // Don't run animations while loading
    if (isLoading || !textRef.current || !containerRef.current) return;

    // Keep container hidden during setup
    containerRef.current.style.opacity = '0';

    // Cleanup previous split if exists
    if (splitRef.current) {
      splitRef.current.revert();
    }

    // Kill previous animation if exists
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!textRef.current || !containerRef.current) return;

      // Wrap spans to prevent splitting
      const spans = textRef.current.querySelectorAll('span');
      spans.forEach(span => {
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'nowrap';
      });

      // Split text into lines
      splitRef.current = new SplitType(textRef.current, {
        types: "lines",
        lineClass: "line-mask"
      });

      // Wrap lines in overflow containers
      splitRef.current.lines?.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.lineHeight = lineHeight;
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      // Set initial position
      gsap.set(splitRef.current.lines, { y: "100%" });
      
      // Show container now that split is ready
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }

      if (triggerOnLoad) {
        // Trigger immediately on load
        animationRef.current = gsap.to(
          splitRef.current.lines,
          {
            y: "0%",
            duration: duration,
            ease: "power3.out",
            delay: delay,
            stagger: stagger,
          }
        );
      } else {
        // Trigger on scroll
        animationRef.current = gsap.to(
          splitRef.current.lines,
          {
            y: "0%",
            duration: duration,
            ease: "power3.out",
            stagger: stagger,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      // Cleanup on unmount
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (splitRef.current) {
        splitRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, triggerOnLoad, stagger, lineHeight, isLoading]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      <div ref={textRef} className={className} style={{ lineHeight }}>
        {children}
      </div>
    </div>
  );
}
