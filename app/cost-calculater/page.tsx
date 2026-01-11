"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Country = "USA" | "India" | "UK";
type Currency = "USD" | "INR" | "EUR";

/* ---------------- TAX RULES ---------------- */
const TAX_RULES: Record<Country, (salary: number) => number> = {
  USA: s => (s <= 50000 ? s * 0.12 : s <= 100000 ? s * 0.18 : s * 0.24),
  India: s =>
    s <= 300000 ? 0 :
    s <= 600000 ? s * 0.05 :
    s <= 900000 ? s * 0.1 :
    s <= 1200000 ? s * 0.15 :
    s * 0.2,
  UK: s => (s <= 50270 ? s * 0.2 : s <= 125140 ? s * 0.4 : s * 0.45),
};

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
};

/* ---------------- CUSTOM DROPDOWN ---------------- */
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: any) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-[2.4vw]">
      <label className="b3 text-[var(--gray-1)] block mb-[0.6vw]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-white/30 rounded-[1vw] px-[1.6vw] py-[1.2vw] flex justify-between items-center bg-white/40 backdrop-blur-[0.8vw]"
      >
        <span className="b3">
          {options.find(o => o.value === value)?.label}
        </span>
        <span className="b3">⌄</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-10 w-full mt-[0.6vw] bg-white/70 backdrop-blur-[1vw] border border-white/30 rounded-[1vw] overflow-hidden"
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full text-left px-[1.6vw] py-[1.2vw] hover:bg-white/40 b3"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function CostCalculatorPage() {
  const [salary, setSalary] = useState<number>(0);
  const [country, setCountry] = useState<Country>("USA");
  const [currency, setCurrency] = useState<Currency>("USD");

  const tax = TAX_RULES[country](salary);
  const net = salary - tax;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-white/70 backdrop-blur-[0.4vw]">

        {/* HERO */}
        <section className="text-center pt-[6vw] px-[5vw]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h3 mb-[1vw]"
          >
            Salary & Tax Calculator
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="b3 text-[var(--gray-1)] max-w-[60vw] mx-auto"
          >
            Estimate taxes and take-home pay instantly for different countries.
          </motion.p>
        </section>

        {/* CALCULATOR */}
        <section className="px-[5vw] pb-[12vw]">
          <div className="max-w-[70vw] mx-auto grid md:grid-cols-2 gap-[4vw]">

            {/* INPUT CARD */}
            <div className="border border-white/30 rounded-[2vw] p-[4vw] bg-white/40 backdrop-blur-[1vw] shadow-[0_1vw_3vw_rgba(0,0,0,0.08)]">
              <h3 className="b2 font-semibold mb-[2vw]">
                Employee Details
              </h3>

              <div className="mb-[2vw]">
                <label className="b3 block mb-[0.6vw] text-[var(--gray-1)]">
                  Annual Salary
                </label>
                <input
                  type="number"
                  className="w-full border border-white/30 rounded-[1vw] px-[1.6vw] py-[1.2vw] bg-white/50 backdrop-blur-[0.6vw]"
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>

              <Dropdown
                label="Currency"
                value={currency}
                onChange={setCurrency}
                options={[
                  { value: "USD", label: "USD ($)" },
                  { value: "INR", label: "INR (₹)" },
                  { value: "EUR", label: "EUR (€)" },
                ]}
              />

              <Dropdown
                label="Country"
                value={country}
                onChange={setCountry}
                options={[
                  { value: "USA", label: "United States" },
                  { value: "India", label: "India" },
                  { value: "UK", label: "United Kingdom" },
                ]}
              />
            </div>

            {/* RESULT CARD */}
            <div className="border border-white/40 rounded-[2vw] p-[4vw] bg-white/50 backdrop-blur-[1.2vw] shadow-[0_1vw_3vw_rgba(0,0,0,0.12)]">
              <h3 className="b2 font-semibold mb-[2vw]">
                Salary Breakdown
              </h3>

              <div className="space-y-[1.6vw]">
                <div className="flex justify-between b3">
                  <span>Gross Salary</span>
                  <span>{CURRENCY_SYMBOL[currency]} {salary.toLocaleString()}</span>
                </div>

                <div className="flex justify-between b3 text-red-500">
                  <span>Estimated Tax</span>
                  <span>- {CURRENCY_SYMBOL[currency]} {tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-white/40 pt-[1.6vw] flex justify-between font-semibold">
                  <span>Net Take-Home</span>
                  <span className="text-[var(--brand-600)]">
                    {CURRENCY_SYMBOL[currency]} {net.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between b3 text-[var(--gray-1)]">
                  <span>Monthly Take-Home</span>
                  <span>
                    {CURRENCY_SYMBOL[currency]} {(net / 12).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="b3 text-[var(--gray-1)] mt-[2vw]">
                * Estimates only. Actual taxes vary by location and deductions.
              </p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
