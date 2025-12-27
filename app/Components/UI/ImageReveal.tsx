
// app/Components/UI/ImageReveal.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageReveal({ src, alt, className = "" }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </motion.div>

      {/* White mask that slides from left to right */}
      <motion.div
        initial={{ x: "0%" }}
        animate={isInView ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute inset-0 bg-white z-10"
      />
    </div>
  );
}
