"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/app/Components/UI/TextReveal";

const ExploreSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = async () => {
    // Safely pause preview video
    if (previewVideoRef.current) {
      try {
        await previewVideoRef.current.pause();
      } catch (error) {
        console.log("Preview pause failed:", error);
      }
    }
    setIsVideoExpanded(true);
  };

  const handleCloseVideo = () => {
    // Pause expanded video
    if (expandedVideoRef.current) {
      expandedVideoRef.current.pause();
    }
    setIsVideoExpanded(false);
    
    // Restart preview after modal closes
    setTimeout(() => {
      if (previewVideoRef.current) {
        previewVideoRef.current.play().catch((error) => {
          console.log("Preview play failed:", error);
        });
      }
    }, 400);
  };

  return (
    <section className="w-full   relative overflow-hidden">
      <div className="grid-container pt-[12vw] md:pt-[4vw]">



        <div className="col-span-12 flex flex-col justify-center">
        {/* Small Tag */}
        <div className=" flex justify-center mb-[3vw] md:mb-[0.5vw]">
          <TextReveal>
            <span className="b4 text-[var(--brand-500)] font-medium uppercase tracking-wider">
              A New Standard in Global Employment
            </span>
          </TextReveal>
        </div>

        {/* Heading */}
        <div className="col-span-12 flex justify-center mb-[4vw] md:mb-[2vw]">
          <TextReveal className="h3 md:h2 text-[var(--text)] font-semibold text-center max-w-[90%] md:max-w-[70vw]">
            Explore Global Hiring Through the GridWage Lens
          </TextReveal>
        </div>

        {/* Description */}
        <div className="col-span-12 flex justify-center mb-[8vw] md:mb-[4vw]">
          <TextReveal
            className="b2 text-[var(--gray-0)] text-center max-w-[95vw] md:max-w-[65vw] leading-[1.7]"
            lineHeight="1.7"
          >
            Experience how GridWage simplifies global hiring, payroll, and
            compliance through intelligent automation and local expertise. Our
            all-in-one platform gives you complete visibility, control, and
            confidence to grow your team anywhere in the world.
          </TextReveal>
        </div>
        </div>



      </div>


              {/* Video Preview - Playing Silently */}

              <div className="flex justify-center w-full mb-[6vw]">
        <div className="w-[80vw] h-[80vh]  flex justify-center">
          <div
            onClick={handleVideoClick}
            className="relative w-full  aspect-video  rounded-[1vw] overflow-hidden group cursor-pointer bg-gray-100"
          >
            <video
              ref={previewVideoRef}
              className="w-full h-full rounded-[1vw] object-cover transition-transform duration-500 group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/videos/gridwage.mp4" type="video/mp4" />
            </video>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 transition-all duration-300 group-hover:bg-black/20 pointer-events-none">

            </div>

            {/* Click to Expand Text */}
            <div className="absolute bottom-[4vw] md:bottom-[2vw] left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="b4 text-white font-medium px-[3vw] py-[1vw] md:px-[1.5vw] md:py-[0.5vw] bg-black/50 backdrop-blur-sm rounded-full">
                Click to expand
              </span>
            </div>
          </div>
        </div>                
              </div>


      {/* Expanded Video Modal with Sound */}
      <AnimatePresence>
        {isVideoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-[4vw]"
            onClick={handleCloseVideo}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-[4vw] right-[4vw] md:top-[2vw] md:right-[2vw] z-50 w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-[6vw] h-[6vw] md:w-[1.5vw] md:h-[1.5vw] text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Expanded Video with Controls & Sound */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-[95vw] md:max-w-[85vw] aspect-video rounded-[2vw] md:rounded-[1vw] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={expandedVideoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                preload="auto"
              >
                <source src="/videos/gridwage.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExploreSection;
