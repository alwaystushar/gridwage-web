"use client";

import { useState } from "react";
import ContactFormModal from "@/app/Components/ContactFormModal";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
];

export default function EmployeeForm() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [needsVisa, setNeedsVisa] = useState<"yes" | "no">("no");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      country: selectedCountry.name,
      needsVisa,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-[90vw] md:w-[28vw] bg-white rounded-[3vw] md:rounded-[1.5vw] p-[6vw] md:p-[2vw] shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-[6vw] md:space-y-[2vw]">
          {/* Question 1: Country Selection */}
          <div>
            <h2 className="text-[4.5vw] md:text-[1.4vw] font-medium text-gray-900 mb-[4vw] md:mb-[1.5vw] leading-tight">
              Where is your Employee <br /> Working from?
            </h2>

            {/* Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between gap-[2vw] md:gap-[0.75vw] px-[4vw] md:px-[1.5vw] py-[3vw] md:py-[1vw] bg-gray-50 rounded-full text-gray-400 text-[3.5vw] md:text-[1.1vw] hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-[2vw] md:gap-[0.75vw]">
                  <span className="text-[5vw] md:text-[1.5vw]">{selectedCountry.flag}</span>
                  <span className={selectedCountry.code === "IN" ? "text-gray-400" : "text-gray-900"}>
                    {selectedCountry.name}
                  </span>
                </div>
                <svg
                  className={`w-[3.5vw] h-[3.5vw] md:w-[1.2vw] md:h-[1.2vw] text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-[1.5vw] md:mt-[0.5vw] bg-white rounded-[3vw] md:rounded-[1.2vw] shadow-2xl border border-gray-100 max-h-[40vw] md:max-h-[16vw] overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-[2vw] md:gap-[0.75vw] px-[4vw] md:px-[1.5vw] py-[2.5vw] md:py-[0.75vw] text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedCountry.code === country.code ? "bg-purple-50" : ""
                      }`}
                    >
                      <span className="text-[5vw] md:text-[1.5vw]">{country.flag}</span>
                      <span className="text-gray-900 text-[3.5vw] md:text-[1.1vw]">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Question 2: Visa Assistance */}
          <div>
            <h3 className="text-[4vw] md:text-[1.2vw] font-normal text-gray-700 mb-[3vw] md:mb-[1vw] leading-tight">
              Do you need visa assistance for this employee?
            </h3>

            <div className="flex gap-[3vw] md:gap-[1vw]">
              {/* Yes Radio Button */}
              <button
                type="button"
                onClick={() => setNeedsVisa("yes")}
                className={`flex items-center gap-[2vw] md:gap-[0.75vw] px-[4vw] md:px-[1.5vw] py-[2.5vw] md:py-[0.75vw] rounded-full border-2 transition-all duration-200 ${
                  needsVisa === "yes"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-[3.5vw] md:text-[1.1vw] font-medium text-gray-700">Yes</span>
                <div
                  className={`w-[4vw] h-[4vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    needsVisa === "yes" ? "border-purple-500" : "border-gray-300"
                  }`}
                >
                  {needsVisa === "yes" && (
                    <div className="w-[2vw] h-[2vw] md:w-[0.75vw] md:h-[0.75vw] rounded-full bg-purple-500" />
                  )}
                </div>
              </button>

              {/* No Radio Button */}
              <button
                type="button"
                onClick={() => setNeedsVisa("no")}
                className={`flex items-center gap-[2vw] md:gap-[0.75vw] px-[4vw] md:px-[1.5vw] py-[2.5vw] md:py-[0.75vw] rounded-full border-2 transition-all duration-200 ${
                  needsVisa === "no"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-[3.5vw] md:text-[1.1vw] font-medium text-gray-700">No</span>
                <div
                  className={`w-[4vw] h-[4vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    needsVisa === "no" ? "border-purple-500" : "border-gray-300"
                  }`}
                >
                  {needsVisa === "no" && (
                    <div className="w-[2vw] h-[2vw] md:w-[0.75vw] md:h-[0.75vw] rounded-full bg-purple-500" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-[7vw] md:px-[2.5vw] py-[2.5vw] md:py-[0.75vw] bg-white text-purple-600 rounded-full border-2 border-purple-500 text-[3.5vw] md:text-[1.1vw] font-semibold hover:bg-purple-50 transition-all duration-200 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
