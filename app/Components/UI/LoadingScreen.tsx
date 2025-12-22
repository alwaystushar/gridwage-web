"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";
import { useLoading } from "./LoadingContext";

export default function LoadingScreen() {
  const { isLoading } = useLoading();
  const [count, setCount] = useState(0);
  const [wrapUp, setWrapUp] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Start wrap up animation after counter reaches 100
            setTimeout(() => setWrapUp(true), 300);
            return 100;
          }
          return prev + 3;
        });
      }, 15);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[var(--white)] overflow-hidden"
        >
          {/* Horizontal Grid Lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ scaleX: 0 }}
              animate={!wrapUp ? { scaleX: 1 } : { scaleX: 0 }}
              transition={
                !wrapUp
                  ? { duration: 0.5, delay: i * 0.02, ease: "easeOut" }
                  : { duration: 0.4, delay: (19 - i) * 0.015, ease: "easeIn" }
              }
              className="absolute w-full h-[0.1vw] bg-[var(--brand-200)] origin-left"
              style={{
                top: `${i * 5}%`,
                opacity: 0.5,
              }}
            />
          ))}

          {/* Vertical Grid Lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ scaleY: 0 }}
              animate={!wrapUp ? { scaleY: 1 } : { scaleY: 0 }}
              transition={
                !wrapUp
                  ? { duration: 0.5, delay: i * 0.02, ease: "easeOut" }
                  : { duration: 0.4, delay: (19 - i) * 0.015, ease: "easeIn" }
              }
              className="absolute h-full w-[0.1vw] bg-[var(--brand-200)] origin-top"
              style={{
                left: `${i * 5}%`,
                opacity: 0.5,
              }}
            />
          ))}

          {/* Bottom Left Counter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={!wrapUp ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={
              !wrapUp
                ? { duration: 0.3, delay: 0.2 }
                : { duration: 0.5, ease: "easeIn" }
            }
            className="absolute bottom-[5vw] left-[5vw] z-10"
          >
            <div className="flex items-end" style={{ gap: "1vw" }}>
              {/* Number Counter */}
              <h1
                className="font-bold text-(--brand-600)"
                style={{ fontSize: "12vw", lineHeight: "1" }}
              >
                {count}
              </h1>
              <span className="h3 font-bold text-(--brand-400) pb-[2vw]">
                %
              </span>
            </div>

            {/* Loading Text */}
            <p className="b2 text-(--gray-0) mt-[1vw]">Loading GridWage...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
