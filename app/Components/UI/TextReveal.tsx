"use client";

import { useEffect, useRef, useState } from "react";
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
  scrollStart?: string;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  triggerOnLoad = false,
  stagger = 0.1,
  lineHeight = "1.2",
  scrollStart = "top 85%"
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();
  const splitRef = useRef<SplitType | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [isReady, setIsReady] = useState(false);
  const hasAnimated = useRef(false); // Track if animation has played

  // Wait for loading to complete before marking as ready
  useEffect(() => {
    if (!isLoading) {
      // Delay to ensure DOM is fully ready and ScrollTrigger can calculate positions
      const readyTimer = setTimeout(() => {
        setIsReady(true);
        // Refresh ScrollTrigger after loading completes
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(readyTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    // Don't run if still loading or not ready
    if (isLoading || !isReady || !textRef.current || !containerRef.current) return;

    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
    }

    if (splitRef.current) {
      splitRef.current.revert();
      splitRef.current = null;
    }

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const timeoutId = requestAnimationFrame(() => {
      if (!textRef.current || !containerRef.current) return;

      try {
        // Handle spans
        const spans = textRef.current.querySelectorAll('span');
        spans.forEach((span) => {
          const spanElement = span as HTMLElement;
          spanElement.style.display = 'inline-block';
          spanElement.style.whiteSpace = 'nowrap';
        });

        // Split text into lines
        const split = new SplitType(textRef.current, {
          types: "lines",
          lineClass: "line-mask"
        });
        splitRef.current = split;

        // Wrap lines in overflow containers
        if (split.lines) {
          split.lines.forEach((line: Element) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            wrapper.style.lineHeight = lineHeight;
            const parent = line.parentNode;
            if (parent) {
              parent.insertBefore(wrapper, line);
              wrapper.appendChild(line);
            }
          });

          // Set initial position
          gsap.set(split.lines, { y: "100%" });
        }

        // Show container now that split is ready
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }

        // Small delay before animating to ensure everything is painted
        setTimeout(() => {
          if (split.lines && !hasAnimated.current) {
            if (triggerOnLoad) {
              animationRef.current = gsap.to(split.lines, {
                y: "0%",
                duration: duration,
                ease: "power3.out",
                delay: delay,
                stagger: stagger,
                onComplete: () => {
                  hasAnimated.current = true;
                }
              });
            } else {
              animationRef.current = gsap.to(split.lines, {
                y: "0%",
                duration: duration,
                ease: "power3.out",
                stagger: stagger,
                scrollTrigger: {
                  trigger: textRef.current,
                  start: scrollStart,
                  once: true, // ← PLAYS ONLY ONCE
                  onEnter: () => {
                    hasAnimated.current = true;
                  }
                },
              });
              
              // Store ScrollTrigger reference
              if (animationRef.current.scrollTrigger) {
                scrollTriggerRef.current = animationRef.current.scrollTrigger as ScrollTrigger;
              }
            }
          }
        }, 50);
      } catch (error) {
        console.error("TextReveal animation error:", error);
        // Fallback: just show the text
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }
    });

    return () => {
      cancelAnimationFrame(timeoutId);
      
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }

      // Clean up all ScrollTriggers associated with this element
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, triggerOnLoad, stagger, lineHeight, scrollStart, isLoading, isReady]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      <div ref={textRef} className={className} style={{ lineHeight }}>
        {children}
      </div>
    </div>
  );
}
