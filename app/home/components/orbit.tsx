"use client";

import { OrbitingCircles } from "@/app/Components/UI/orbiting-circles";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import TextReveal from "@/app/Components/UI/TextReveal";

export default function OrbitingIconsSection() {
  return (
    <section className="w-full py-[12vw] md:py-[5vw] bg-white">
      {/* Top heading section with grid-container */}
      <div className="grid-container mb-0 md:mb-[2vw]">
        {/* Left side - Heading */}
        <div className="col-span-12 md:col-span-6">
          <TextReveal
            className="h3 font-medium text-[var(--text)]"
            lineHeight="1.25" // tighter heading leading
          >
            Empower <span className="text-[var(--brand-500)]">Your Global</span>{" "}
            Workforce with Ease
          </TextReveal>
        </div>

        {/* Right side - Description and Button */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center mt-[1vw] md:mt-0">
          <TextReveal
            className="b2 text-[var(--gray-0)] mb-[4vw] md:mb-[2vw] text-left"
            lineHeight="1.6" // more relaxed paragraph leading
          >
            GridWage simplifies global team management—hire, onboard, and pay
            employees or contractors anywhere from one unified, compliant
            platform. Build borderless teams with confidence and speed.
          </TextReveal>

          <div>
            <MagneticButton variant="secondary">Get Started</MagneticButton>
          </div>
        </div>
      </div>

      {/* Orbiting circles section */}
      <div className="relative h-[100vw] max-sm:hidden md:h-[41vw] w-full flex items-center justify-center">
        {/* Outer orbit with 4 items */}
        <OrbitingCircles
          radius={20}
          iconSize={8}
          duration={30}
          centerImage="/homepageService/orbit.png"
          centerImageSize={8}
          centerImageAlt="Company Logo"
        >
          <div className="bg-white px-[3vw] py-[1.5vw] md:px-[1.2vw] md:py-[0.6vw] rounded-full shadow-md border border-purple-200 whitespace-nowrap">
            <span className="text-[3vw] md:text-[0.9vw] font-medium text-purple-600">
              Employer of Record
            </span>
          </div>

          <div className="relative">
            <img
              src="/homepageService/Africa.png"
              alt="South Africa"
              className="w-[12vw] h-[12vw] md:w-[5vw] md:h-[5vw] rounded-full object-cover shadow-lg"
            />
          </div>

          <div className="bg-white px-[3vw] py-[1.5vw] md:px-[1.2vw] md:py-[0.6vw] rounded-full shadow-md border border-purple-200 whitespace-nowrap">
            <span className="text-[3vw] md:text-[0.9vw] font-medium text-purple-600">
              Manage Contractors Payments
            </span>
          </div>

          <div className="relative">
            <img
              src="/homepageService/Ireland.png"
              alt="Ireland"
              className="w-[12vw] h-[12vw] md:w-[5vw] md:h-[5vw] rounded-full object-cover shadow-lg"
            />
          </div>
        </OrbitingCircles>

        {/* Inner orbit with 3 items */}
        <OrbitingCircles radius={12} iconSize={5} duration={20} reverse>
          <div className="bg-white px-[3vw] py-[1.5vw] md:px-[1.2vw] md:py-[0.6vw] rounded-full shadow-md border border-purple-200 whitespace-nowrap">
            <span className="text-[3vw] md:text-[0.9vw] font-medium text-purple-600">
              Global Payroll
            </span>
          </div>

          <div className="relative">
            <img
              src="/homepageService/Us.png"
              alt="USA"
              className="w-[10vw] h-[10vw] md:w-[4vw] md:h-[4vw] rounded-full object-cover shadow-lg"
            />
          </div>

          <div className="bg-white px-[3vw] py-[1.5vw] md:px-[1.2vw] md:py-[0.6vw] rounded-full shadow-md border border-purple-200 whitespace-nowrap">
            <span className="text-[3vw] md:text-[0.9vw] font-medium text-purple-600">
              Global Expat Hiring & Payroll
            </span>
          </div>
        </OrbitingCircles>
      </div>
    </section>
  );
}
