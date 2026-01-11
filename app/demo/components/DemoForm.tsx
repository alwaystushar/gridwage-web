"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

// Country data with ISO codes
const countriesData = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "Netherlands", code: "NL" },
  { name: "Belgium", code: "BE" },
  { name: "Sweden", code: "SE" },
  { name: "Norway", code: "NO" },
  { name: "Denmark", code: "DK" },
  { name: "Finland", code: "FI" },
  { name: "Ireland", code: "IE" },
  { name: "Switzerland", code: "CH" },
  { name: "Austria", code: "AT" },
  { name: "Portugal", code: "PT" },
  { name: "Poland", code: "PL" },
  { name: "Czech Republic", code: "CZ" },
  { name: "India", code: "IN" },
  { name: "Singapore", code: "SG" },
  { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" },
  { name: "China", code: "CN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Taiwan", code: "TW" },
  { name: "Malaysia", code: "MY" },
  { name: "Thailand", code: "TH" },
  { name: "Philippines", code: "PH" },
  { name: "Indonesia", code: "ID" },
  { name: "Vietnam", code: "VN" },
  { name: "UAE", code: "AE" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Brazil", code: "BR" },
  { name: "Mexico", code: "MX" },
  { name: "Argentina", code: "AR" },
  { name: "Chile", code: "CL" },
  { name: "Colombia", code: "CO" },
  { name: "South Africa", code: "ZA" },
  { name: "Nigeria", code: "NG" },
  { name: "Kenya", code: "KE" },
  { name: "Egypt", code: "EG" },
  { name: "Israel", code: "IL" },
  { name: "Turkey", code: "TR" },
  { name: "New Zealand", code: "NZ" },
  { name: "Pakistan", code: "PK" },
  { name: "Bangladesh", code: "BD" },
].sort((a, b) => a.name.localeCompare(b.name));

const companySizes = [
  { value: "1-5", label: "1-5 employees" },
  { value: "6-20", label: "6-20 employees" },
  { value: "21-50", label: "21-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

// Country Dropdown with Search in TextField and Animation
interface CountryDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function CountryDropdown({ label, value, onChange, error }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countriesData.find(c => c.name === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (country: { name: string; code: string }) => {
    onChange(country.name);
    setSearchTerm("");
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative flex items-center gap-[1.92vw] md:gap-[0.48vw]">
        {selectedCountry && !isFocused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="absolute left-0 top-[2.3vw] md:top-[0.64vw] w-[5.76vw] h-[5.76vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center"
          >
            <ReactCountryFlag
              countryCode={selectedCountry.code}
              svg
              style={{
                width: '140%',
                height: '140%',
              }}
            />
          </motion.div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={isFocused || isOpen ? searchTerm : (selectedCountry?.name || "")}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
            setSearchTerm("");
          }}
          onBlur={() => {
            if (!isOpen) {
              setIsFocused(false);
            }
          }}
          className={`peer w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all ${
            selectedCountry && !isFocused ? "pl-[7.68vw] md:pl-[1.92vw]" : ""
          } ${
            error
              ? "border-red-500"
              : isFocused || isOpen || value
              ? "border-[var(--brand-600)]"
              : "border-gray-300"
          } ${!value && !isFocused ? "text-gray-400" : "text-[var(--text)]"}`}
          placeholder={isFocused ? "Search countries..." : ""}
        />
      </div>
      
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          isFocused || isOpen || value
            ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
            : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
        }`}
      >
        {label}
      </label>

      <ChevronDown 
        className={`absolute right-0 top-[2.3vw] md:top-[0.64vw] w-[3.07vw] h-[3.07vw] md:w-[0.768vw] md:h-[0.768vw] text-gray-400 pointer-events-none transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`} 
      />

      <AnimatePresence>
        {isOpen && filteredCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-[0.96vw] md:mt-[0.32vw] bg-white border border-gray-200 rounded-[1.15vw] md:rounded-[0.32vw] shadow-xl max-h-[57.6vw] md:max-h-[16vw] overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[57.6vw] md:max-h-[16vw]">
              {filteredCountries.map((country, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  type="button"
                  onMouseDown={() => handleSelect(country)}
                  onMouseEnter={() => setHoveredOption(country.name)}
                  onMouseLeave={() => setHoveredOption(null)}
                  className={`w-full text-left px-[3.07vw] md:px-[0.96vw] py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] flex items-center gap-[1.92vw] md:gap-[0.48vw] transition-all ${
                    value === country.name 
                      ? "bg-[var(--brand-600)] text-white font-medium" 
                      : hoveredOption === country.name
                      ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                      : "hover:bg-[var(--brand-50)]"
                  }`}
                >
                  <div className={`w-[5.76vw] h-[5.76vw] md:w-[1.44vw] md:h-[1.44vw] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ${
                    value === country.name ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        width: '140%',
                        height: '140%',
                      }}
                    />
                  </div>
                  <span>{country.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
          {error}
        </p>
      )}
    </div>
  );
}

// Simple Dropdown (for Company Size) with Animation
interface SimpleDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function SimpleDropdown({ label, options, value, onChange, error }: SimpleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.label === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-left text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all ${
          error
            ? "border-red-500"
            : isOpen || value
            ? "border-[var(--brand-600)]"
            : "border-gray-300"
        } ${!value ? "text-gray-400" : "text-[var(--text)]"}`}
      >
        {selectedOption ? selectedOption.label : "Company Size"}
      </button>
      
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          isOpen || value
            ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
            : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
        }`}
      >
        {label}
      </label>

      <ChevronDown 
        className={`absolute right-0 top-[2.3vw] md:top-[0.64vw] w-[3.07vw] h-[3.07vw] md:w-[0.768vw] md:h-[0.768vw] text-gray-400 pointer-events-none transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`} 
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-[0.96vw] md:mt-[0.32vw] bg-white border border-gray-200 rounded-[1.15vw] md:rounded-[0.32vw] shadow-xl overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[46vw] md:max-h-[12.8vw]">
              {options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  type="button"
                  onClick={() => {
                    onChange(option.label);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHoveredOption(option.label)}
                  onMouseLeave={() => setHoveredOption(null)}
                  className={`w-full text-left px-[3.07vw] md:px-[0.96vw] py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] transition-all ${
                    value === option.label 
                      ? "bg-[var(--brand-600)] text-white font-medium" 
                      : hoveredOption === option.label
                      ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                      : "hover:bg-[var(--brand-50)]"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function DemoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    companySize: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.companySize) {
      newErrors.companySize = "Please select a company size";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 NEW REAL PHP BACKEND INTEGRATION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/submit-demo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name.trim(),
          email: formData.email.trim(),
          companyName: formData.companyName.trim(),
          companySize: formData.companySize,
          country: formData.country,
          message: formData.message.trim(),
        }).toString(),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        
        // Reset form after success message
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            companyName: "",
            companySize: "",
            country: "",
            message: "",
          });
          setIsSuccess(false);
          setErrors({});
        }, 4000);
      } else {
        alert(result.message || 'Please try again.');
        if (result.errors) {
          const newErrors: Record<string, string> = {};
          result.errors.forEach((error: string) => {
            if (error.includes('Name')) newErrors.name = error;
            if (error.includes('email')) newErrors.email = error;
            if (error.includes('Company')) newErrors.companyName = error;
            if (error.includes('size')) newErrors.companySize = error;
            if (error.includes('Country')) newErrors.country = error;
            if (error.includes('Message')) newErrors.message = error;
          });
          setErrors(newErrors);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Network error. Please email info@gridwage.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-[4.6vw] md:p-[1.92vw] text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-[12.3vw] h-[12.3vw] md:w-[3.2vw] md:h-[3.2vw] mx-auto mb-[2.3vw] md:mb-[0.96vw] rounded-full bg-green-50 flex items-center justify-center"
        >
          <CheckCircle className="w-[7.68vw] h-[7.68vw] md:w-[1.92vw] md:h-[1.92vw] text-green-500" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-[3.84vw] md:text-[1.152vw] font-semibold mb-[1.54vw] md:mb-[0.512vw]"
        >
          Thank You!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-[2.69vw] md:text-[0.64vw] text-[var(--gray-0)]"
        >
          We'll get back to you within 24 hours to schedule your personalized demo.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[3.84vw] md:space-y-[1.28vw]">
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all ${
            errors.name
              ? "border-red-500"
              : focusedField === "name" || formData.name
              ? "border-[var(--brand-600)]"
              : "border-gray-300"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="name"
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === "name" || formData.name
              ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
              : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
          }`}
        >
          Full Name *
        </label>
        {errors.name && (
          <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all ${
            errors.email
              ? "border-red-500"
              : focusedField === "email" || formData.email
              ? "border-[var(--brand-600)]"
              : "border-gray-300"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === "email" || formData.email
              ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
              : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
          }`}
        >
          Email *
        </label>
        {errors.email && (
          <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company Name Field */}
      <div className="relative">
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          onFocus={() => setFocusedField("companyName")}
          onBlur={() => setFocusedField(null)}
          className={`peer w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all ${
            errors.companyName
              ? "border-red-500"
              : focusedField === "companyName" || formData.companyName
              ? "border-[var(--brand-600)]"
              : "border-gray-300"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="companyName"
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === "companyName" || formData.companyName
              ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
              : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
          }`}
        >
          Company Name *
        </label>
        {errors.companyName && (
          <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Company Size Dropdown */}
      <SimpleDropdown
        label="Company Size *"
        options={companySizes}
        value={formData.companySize}
        onChange={(value) => {
          setFormData(prev => ({ ...prev, companySize: value }));
          if (errors.companySize) {
            setErrors(prev => ({ ...prev, companySize: "" }));
          }
        }}
        error={errors.companySize}
      />

      {/* Country Dropdown with Search in TextField */}
      <CountryDropdown
        label="Country *"
        value={formData.country}
        onChange={(value) => {
          setFormData(prev => ({ ...prev, country: value }));
          if (errors.country) {
            setErrors(prev => ({ ...prev, country: "" }));
          }
        }}
        error={errors.country}
      />

      {/* Message Field */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          rows={3}
          className={`peer w-full bg-transparent border-b-2 py-[2.3vw] md:py-[0.64vw] text-[3.07vw] md:text-[0.704vw] focus:outline-none transition-all resize-none ${
            errors.message
              ? "border-red-500"
              : focusedField === "message" || formData.message
              ? "border-[var(--brand-600)]"
              : "border-gray-300"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="message"
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === "message" || formData.message
              ? "top-[-1.54vw] md:top-[-0.512vw] text-[2.3vw] md:text-[0.544vw] text-[var(--brand-600)]"
              : "top-[2.3vw] md:top-[0.64vw] text-[3.07vw] md:text-[0.704vw] text-gray-400"
          }`}
        >
          Tell us about your needs *
        </label>
        {errors.message && (
          <p className="text-red-500 text-[2.3vw] md:text-[0.544vw] mt-[0.77vw] md:mt-[0.256vw]">
            {errors.message}
          </p>
        )}
      </div>


{/* Submit Button - Fixed: Right-aligned, not full width */}
<div className="pt-[2.3vw] md:pt-[0.64vw] flex justify-end">
  {isSubmitting ? (
    <div className="flex items-center bg-[var(--brand-600)] opacity-50 cursor-not-allowed py-[2.3vw] md:py-[0.64vw] px-[3.07vw] md:px-[1.92vw] rounded-full text-white font-medium text-[3.07vw] md:text-[0.704vw]">
      <svg
        className="animate-spin h-[3.07vw] w-[3.07vw] md:h-[0.768vw] md:w-[0.768vw] text-white mr-[1.54vw] md:mr-[0.512vw]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Submitting...
    </div>
  ) : (
    <MagneticButton
      variant="primary"
    >
      Submit Request
    </MagneticButton>
  )}
</div>

    </form>
  );
}
