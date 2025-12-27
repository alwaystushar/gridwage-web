"use client";

import { useLoading } from "@/app/Components/UI/LoadingContext";
import HeroLeft from "./lib/heroleft";
import HeroRight from "./lib/heroright";

export default function Hero() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return null;
  }

  return (
    <main className="flex   lg:pt-[8vw] pt-[25vw] bg-purple-50  md:px-0 overflow-x-hidden">
      <div className="grid-container  ">
        {/* Left Content */}
        <div className="col-span-12 lg:col-span-6 mb-[8vw] lg:mb-0">
          <HeroLeft />
        </div>

        {/* Right Content - Placeholder for cards */}
        <div className="col-span-12 lg:col-span-6">
          <HeroRight />
        </div>
      </div>
    </main>
  );
}
