"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import { CheckCircle, Crown } from "lucide-react";

type PricingPlan = {
  name: string;
  price: string;
  desc: string;
  summary: string;
  features: string[];
  mostPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Employer of Record",
    price: "$299",
    desc: "per employee / month",
    summary:
      "Hire full-time employees globally without setting up local entities.",
    features: [
      "Compliant local employment contracts",
      "Multi-currency payroll processing",
      "Benefits & statutory compliance",
      "Local HR & legal support",
    ],
  },
  {
    name: "Contractors",
    price: "$39",
    desc: "per contractor / month",
    summary:
      "Pay and manage international contractors with confidence and compliance.",
    features: [
      "Worker classification & risk mitigation",
      "Contractor invoicing & payments",
      "Benefits & insurance coverage",
      "24/7 local HR support",
    ],
    mostPopular: true,
  },
  {
    name: "Global Payroll",
    price: "Speak to Sales",
    desc: "pricing on request",
    summary:
      "Run payroll seamlessly across multiple countries and currencies.",
    features: [
      "Multi-country payroll processing",
      "Tax calculation & filings",
      "Payroll reports & insights",
      "Dedicated payroll specialists",
    ],
  },
  {
    name: "Immigration & Visa",
    price: "Speak to Sales",
    desc: "pricing on request",
    summary:
      "Relocate and sponsor global talent with expert-led visa solutions.",
    features: [
      "Work visa & permit support",
      "Country-specific expertise",
      "End-to-end visa management",
      "Ongoing compliance monitoring",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="">

      {/* ================= HERO ================= */}
      <section className="text-center font-medium pt-[15vw] md:pt-[8vw] px-[5vw]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h3"
        >
          Transparent pricing for global teams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="b3 text-[var(--gray-1)] max-w-[60vw] mx-auto"
        >
          Simple plans designed to scale with your business.
          No hidden fees. Cancel anytime.
        </motion.p>
      </section>

{/* ================= PRICING SECTION ================= */}
<section className="pb-[14vw] pt-[6vw]">

  <div
    className="
      flex gap-[4vw] overflow-x-auto px-[5vw]
      md:grid md:grid-cols-2 lg:grid-cols-4
      md:gap-[2vw] md:overflow-visible
      snap-x snap-mandatory
    "
  >
    {pricingPlans.map((plan, index) => (
      <motion.div
        key={plan.name}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className={`
          relative
          min-w-[85vw] sm:min-w-[70vw]
          md:min-w-0
          snap-center
          rounded-[5vw] md:rounded-[1.5vw]
          px-[7vw] py-[7vw]
          md:px-[1.8vw] md:py-[2.2vw]
          border bg-white flex flex-col justify-between
          ${
            plan.mostPopular
              ? "border-[var(--brand-600)]"
              : "border-[var(--gray-2)/0.35]"
          }
        `}
      >
        {/* MOST POPULAR (MINIMAL BADGE) */}
        {plan.mostPopular && (
          <span className="absolute top-[3vw] md:top-[1vw] right-[4vw] md:right-[1vw] b4 text-[var(--brand-600)]">
            Most popular
          </span>
        )}

        {/* ---------- CONTENT ---------- */}
        <div>
          {/* Title */}
          <h3 className="b1 font-medium text-center mb-[3vw] md:mb-[0.8vw]">
            {plan.name}
          </h3>

          {/* Summary */}
          <p className="b3 text-[var(--gray-1)] text-center mb-[6vw] md:mb-[1.2vw]">
            {plan.summary}
          </p>

          {/* Price */}
          <div className="text-center mb-[8vw] md:mb-[2vw]">
            <div className="h5 font-semibold text-[var(--brand-600)]">
              {plan.price}
            </div>
            <div className="b4 text-[var(--gray-1)]">
              {plan.desc}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--gray-2)/0.25] mb-[6vw] md:mb-[2vw]" />

          {/* Features */}
          <ul className="space-y-[3vw] md:space-y-[0.8vw] mb-[8vw] md:mb-[3vw]">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-[2vw] md:gap-[0.6vw] b3 text-[var(--gray-2)]"
              >
                <CheckCircle className="w-[4vw] h-[4vw] md:w-[0.9vw] md:h-[0.9vw] text-[var(--brand-600)] mt-[0.3vw]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- CTA ---------- */}
        <MagneticButton
          variant={plan.mostPopular ? "primary" : "secondary"}
          className="w-full justify-center"
        >
          <Link href="/demo">
            {plan.price === "Speak to Sales" ? "Contact Sales" : "Get Started"}
          </Link>
        </MagneticButton>
      </motion.div>
    ))}
  </div>

</section>




    </div>
  );
}
