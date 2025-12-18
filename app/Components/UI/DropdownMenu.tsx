"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";

interface DropdownItem {
  title: string;
  description: string;
  slug: string;
  icon?: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownItem[];
  baseUrl: string;
  gridCols?: number;
  width?: string;
}

export default function DropdownMenu({
  isOpen,
  items,
  baseUrl,
  gridCols = 2,
  width = "50vw",
}: DropdownMenuProps) {
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-1/2 -translate-x-1/2 bg-[var(--white)] shadow-2xl grid overflow-hidden"
          style={{
            top: "3vw",
            width: width,
            borderRadius: "1.2vw",
            padding: "2vw",
            gap: "1vw",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            border: "0.05vw solid rgba(0, 0, 0, 0.08)",
          }}
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={`${baseUrl}/${item.slug}`}
                className="block group relative overflow-hidden"
                style={{ padding: "1.2vw", borderRadius: "0.8vw" }}
              >
                <motion.div
                  className="absolute inset-0 bg-[var(--brand-0)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    borderRadius: "0.8vw",
                    transformOrigin: "center",
                  }}
                />

                <div className="relative z-10">
                  {item.icon && (
                    <motion.div
                      className="mb-[0.8vw]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span style={{ fontSize: "2vw" }}>{item.icon}</span>
                    </motion.div>
                  )}

                  <motion.h3
                    className="b2 font-semibold text-[var(--text)] group-hover:text-[var(--brand-600)]"
                    style={{ marginBottom: "0.5vw" }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>

                  <p className="b4 text-[var(--gray-0)] group-hover:text-[var(--text)] transition-colors">
                    {item.description}
                  </p>

                  <motion.div
                    className="absolute top-[1.2vw] right-[1.2vw]"
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      style={{ width: "1vw", height: "1vw" }}
                      fill="none"
                      stroke="var(--brand-600)"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
