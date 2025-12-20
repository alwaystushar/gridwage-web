"use client";

import { useState } from "react";

interface Country {
  code: string;
  name: string;
  flagSrc: string;
}

interface EmployeeFormProps {
  countries: Country[];
  onSubmit?: (data: { country: Country; needsVisa: "yes" | "no" }) => void;
}

export default function EmployeeForm({ countries, onSubmit }: EmployeeFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [needsVisa, setNeedsVisa] = useState<"yes" | "no">("no");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      country: selectedCountry.name,
      needsVisa,
    });
    
    // Call parent's onSubmit to open ContactFormModal
    if (onSubmit) {
      onSubmit({ country: selectedCountry, needsVisa });
    }
  };

  return (
    <div className="w-[72vw] md:w-[20vw] bg-white rounded-[2.4vw] md:rounded-[1.2vw] p-[4.8vw] md:p-[1.6vw] shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-[4.8vw] md:space-y-[1.6vw]">
        {/* Question 1: Country Selection */}
        <div>
          <h2 className="text-[3.6vw] md:text-[1.12vw] font-medium text-gray-900 mb-[3.2vw] md:mb-[1.2vw] leading-tight">
            Where is your Employee <br /> Working from?
          </h2>

          {/* Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-[1.6vw] md:gap-[0.6vw] px-[3.2vw] md:px-[1.2vw] py-[2.4vw] md:py-[0.8vw] bg-gray-50 rounded-full text-gray-400 text-[2.8vw] md:text-[0.88vw] hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-[1.6vw] md:gap-[0.6vw]">
                <img
                  src={selectedCountry.flagSrc}
                  alt={selectedCountry.name}
                  className="w-[4vw] h-[4vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full object-cover"
                />
                <span className={selectedCountry.code === "IN" ? "text-gray-400" : "text-gray-900"}>
                  {selectedCountry.name}
                </span>
              </div>
              <svg
                className={`w-[2.8vw] h-[2.8vw] md:w-[0.96vw] md:h-[0.96vw] text-gray-400 transition-transform duration-200 ${
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
              <div className="absolute z-10 w-full mt-[1.2vw] md:mt-[0.4vw] bg-white rounded-[2.4vw] md:rounded-[0.96vw] shadow-2xl border border-gray-100 max-h-[32vw] md:max-h-[12.8vw] overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-[1.6vw] md:gap-[0.6vw] px-[3.2vw] md:px-[1.2vw] py-[2vw] md:py-[0.6vw] text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-[2.4vw] first:md:rounded-t-[0.96vw] last:rounded-b-[2.4vw] last:md:rounded-b-[0.96vw] ${
                      selectedCountry.code === country.code ? "bg-purple-50" : ""
                    }`}
                  >
                    <img
                      src={country.flagSrc}
                      alt={country.name}
                      className="w-[4vw] h-[4vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full object-cover"
                    />
                    <span className="text-gray-900 text-[2.8vw] md:text-[0.88vw]">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Question 2: Visa Assistance */}
        <div>
          <h3 className="text-[3.2vw] md:text-[0.96vw] font-normal text-gray-700 mb-[2.4vw] md:mb-[0.8vw] leading-tight">
            Do you need visa assistance for this employee?
          </h3>

          <div className="flex gap-[2.4vw] md:gap-[0.8vw] mb-[3vw]">
            {/* Yes Radio Button */}
            <button
              type="button"
              onClick={() => setNeedsVisa("yes")}
              className={`flex items-center gap-[1.6vw] md:gap-[0.6vw] px-[3.2vw] md:px-[1.2vw] py-[2vw] md:py-[0.1vw] rounded-full border-2 transition-all duration-200 ${
                needsVisa === "yes"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-[2.8vw] md:text-[0.88vw] font-medium text-gray-700">Yes</span>
              <div
                className={`w-[3.2vw] h-[3.2vw] md:w-[1.3vw] md:h-[1.2vw] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  needsVisa === "yes" ? "border-purple-500" : "border-gray-300"
                }`}
              >
                {needsVisa === "yes" && (
                  <div className="w-[1.6vw] h-[1.6vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-500" />
                )}
              </div>
            </button>

            {/* No Radio Button */}
            <button
              type="button"
              onClick={() => setNeedsVisa("no")}
              className={`flex items-center gap-[1.6vw] md:gap-[0.6vw] px-[3.2vw] md:px-[1.2vw] py-[2vw] md:py-[0.6vw] rounded-full border-2 transition-all duration-200 ${
                needsVisa === "no"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-[2.8vw] md:text-[0.88vw] font-medium text-gray-700">No</span>
              <div
                className={`w-[3.2vw] h-[3.2vw] md:w-[1.3vw] md:h-[1.2vw] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  needsVisa === "no" ? "border-purple-500" : "border-gray-300"
                }`}
              >
                {needsVisa === "no" && (
                  <div className="w-[1.6vw] h-[1.6vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-[5.6vw] md:px-[2vw] py-[2vw] md:py-[0.5vw] bg-white text-purple-600 rounded-full border-2 border-purple-500 text-[2.8vw] md:text-[0.88vw] font-semibold hover:bg-purple-50 transition-all duration-200 hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
