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
    
    if (onSubmit) {
      onSubmit({ country: selectedCountry, needsVisa });
    }
  };

  return (
    <div className="w-[46.656vw] md:w-[20vw] bg-white rounded-[1.555vw] md:rounded-[1.2vw] p-[3.11vw] md:p-[1.6vw] shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-[3.11vw] md:space-y-[1.6vw]">
        {/* Question 1: Country Selection */}
        <div>
          <h2 className="text-[2.333vw] md:text-[1.12vw] font-medium text-gray-900 mb-[2.074vw] md:mb-[1.2vw] leading-tight">
            Where is your Employee <br /> Working from?
          </h2>

          {/* Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-[1.037vw] md:gap-[0.6vw] px-[2.074vw] md:px-[1.2vw] py-[1.555vw] md:py-[0.8vw] bg-gray-50 rounded-full text-gray-400 text-[1.814vw] md:text-[0.88vw] hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-[1.037vw] md:gap-[0.6vw]">
                <img
                  src={selectedCountry.flagSrc}
                  alt={selectedCountry.name}
                  className="w-[2.592vw] h-[2.592vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full object-cover"
                />
                <span className={selectedCountry.code === "IN" ? "text-gray-400" : "text-gray-900"}>
                  {selectedCountry.name}
                </span>
              </div>
              <svg
                className={`w-[1.814vw] h-[1.814vw] md:w-[0.96vw] md:h-[0.96vw] text-gray-400 transition-transform duration-200 ${
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
              <div className="absolute z-10 w-full mt-[0.778vw] md:mt-[0.4vw] bg-white rounded-[1.555vw] md:rounded-[0.96vw] shadow-2xl border border-gray-100 max-h-[20.736vw] md:max-h-[12.8vw] overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-[1.037vw] md:gap-[0.6vw] px-[2.074vw] md:px-[1.2vw] py-[1.296vw] md:py-[0.6vw] text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-[1.555vw] first:md:rounded-t-[0.96vw] last:rounded-b-[1.555vw] last:md:rounded-b-[0.96vw] ${
                      selectedCountry.code === country.code ? "bg-purple-50" : ""
                    }`}
                  >
                    <img
                      src={country.flagSrc}
                      alt={country.name}
                      className="w-[2.592vw] h-[2.592vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full object-cover"
                    />
                    <span className="text-gray-900 text-[1.814vw] md:text-[0.88vw]">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Question 2: Visa Assistance */}
        <div>
          <h3 className="text-[2.074vw] md:text-[0.96vw] font-normal text-gray-700 mb-[1.555vw] md:mb-[0.8vw] leading-tight">
            Do you need visa assistance for this employee?
          </h3>

          <div className="flex gap-[1.555vw] md:gap-[0.8vw] mb-[1.944vw]">
            {/* Yes Radio Button */}
            <button
              type="button"
              onClick={() => setNeedsVisa("yes")}
              className={`flex items-center gap-[1.037vw] md:gap-[0.6vw] px-[2.074vw] md:px-[1.2vw] py-[1.296vw] md:py-[0.1vw] rounded-full md:border-[0.1vw] border-[0.2vw] transition-all duration-200 ${
                needsVisa === "yes"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-[1.814vw] md:text-[0.88vw] font-medium text-gray-700">Yes</span>
              <div
                className={`w-[2.074vw] h-[2.074vw] md:w-[1.3vw] md:h-[1.2vw] rounded-full md:border-[0.1vw] border-[0.2vw] flex items-center justify-center transition-all duration-200 ${
                  needsVisa === "yes" ? "border-purple-500" : "border-gray-300"
                }`}
              >
                {needsVisa === "yes" && (
                  <div className="w-[1.037vw] h-[1.037vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-500" />
                )}
              </div>
            </button>

            {/* No Radio Button */}
            <button
              type="button"
              onClick={() => setNeedsVisa("no")}
              className={`flex items-center gap-[1.037vw] md:gap-[0.6vw] px-[2.074vw] md:px-[1.2vw] py-[1.296vw] md:py-[0.6vw] rounded-full md:border-[0.1vw] border-[0.2vw] transition-all duration-200 ${
                needsVisa === "no"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-[1.814vw] md:text-[0.88vw] font-medium text-gray-700">No</span>
              <div
                className={`w-[2.074vw] h-[2.074vw] md:w-[1.2vw] md:h-[1.2vw] rounded-full md:border-[0.1vw] border-[0.2vw] flex items-center justify-center transition-all duration-200 ${
                  needsVisa === "no" ? "border-purple-500" : "border-gray-300"
                }`}
              >
                {needsVisa === "no" && (
                  <div className="w-[0.9vw] h-[0.9vw] md:w-[0.6vw] md:h-[0.6vw] rounded-full bg-purple-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-[3.629vw] md:px-[2vw] py-[1.296vw] md:py-[0.5vw] bg-white text-purple-600 rounded-full md:border-[0.1vw] border-[0.2vw] border-purple-500 text-[1.814vw] md:text-[0.88vw] font-semibold hover:bg-purple-50 transition-all duration-200 hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
