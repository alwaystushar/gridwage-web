"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function GridwageFooter() {
  const currentYear = new Date().getFullYear();
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.classList.add("logo-mask-reveal--active");
    });
  }, []);

  return (
    <footer className="w-full bg-[var(--white)] text-[var(--text)] border-t border-[var(--brand-200)]">
      {/* Top: logo + 4 columns */}
      <div
        className="grid-container py-[5vw] md:py-[3vw]"
        style={{ columnGap: 0, rowGap: 0 }}
      >
        {/* Row 1: logo, full width */}
        <div className="col-span-12 mb-[6vw] md:mb-[4vw]">
          <Link href="/">
            <div
              ref={logoRef}
              className="logo-mask-reveal inline-block w-full max-w-[100vw] md:max-w-none"
            >
              <img
                src="/logo-full.svg"
                alt="Gridwage"
                className="w-full h-auto cursor-pointer md:w-[100vw]"
              />
            </div>
          </Link>
        </div>

        {/* Row 2: 4 link columns */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-[4vw] md:gap-[2vw] text-[var(--b3-lg)] md:text-[0.9vw] leading-[1.8] md:leading-[1.4]">
          {/* Quick Links */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="h5 mb-[2vw] md:mb-[1.5vw] font-semibold">Quick Links</h4>
            <ul className="space-y-[1.5vw] md:space-y-[1.2vw] opacity-80">
              <li>
                <Link
                  href="/"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Price
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="h5 mb-[2vw] md:mb-[1.5vw] font-semibold">Products</h4>
            <ul className="space-y-[1.5vw] md:space-y-[1.2vw] opacity-80">
              <li>
                <Link
                  href="/products/eor"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Employer of Record
                </Link>
              </li>
              <li>
                <Link
                  href="/products/global-payroll"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Global Payroll
                </Link>
              </li>
              <li>
                <Link
                  href="/products/contractors"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Manage Contractors Payments
                </Link>
              </li>
              <li>
                <Link
                  href="/products/expat-payroll"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Global Expat Hiring & Payroll
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="h5 mb-[2vw] md:mb-[1.5vw] font-semibold">Solutions</h4>
            <ul className="space-y-[1.5vw] md:space-y-[1.2vw] opacity-80">
              <li>
                <Link
                  href="/solutions/startups"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  For Startups & Scaleups
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/remote-first"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  For Remote-first Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/smes"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  For SMEs & Growing Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/contractors"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  For Companies Hiring Contractors & Freelancers
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/hr-teams"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  For HR & People Teams
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Help */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="h5 mb-[2vw] md:mb-[1.5vw] font-semibold">Get Help</h4>
            <ul className="space-y-[1.5vw] md:space-y-[1.2vw] opacity-80">
              <li>
                <Link
                  href="/help-center"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-support"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Contact support
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-sales"
                  className="block transition-colors hover:text-[var(--brand-600)]"
                >
                  Contact sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom full-width row */}
      <div className="border-t border-[var(--brand-200)] py-[4vw] md:py-[1.5vw] text-[var(--b4-sm)] md:text-[0.8vw]">
        <div className="grid-container">
          <div className="col-span-12 flex flex-col md:flex-row items-center justify-between gap-[3vw] md:gap-[1.5vw]">
            {/* Logo */}
            <span className="mb-[2vw] md:mb-0">
              <Link href="/">
                <img
                  src="/logo-full.svg"
                  className="w-[24vw] md:w-[8vw] h-auto cursor-pointer"
                  alt="Gridwage"
                />
              </Link>
            </span>

            {/* Copyright */}
            <span className="opacity-70 text-center mb-[2vw] md:mb-0 order-3 md:order-none">
              © {currentYear} Gridwage. All rights reserved.
            </span>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-[2.5vw] md:gap-[0vw] text-[var(--text)] opacity-80 order-2 md:order-none w-full md:w-auto">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="transition-colors hover:text-[var(--brand-600)] flex items-center justify-center w-[12vw] h-[12vw] md:w-[3vw] md:h-[3vw]"
              >
                <Facebook className="w-[6vw] h-[6vw] md:w-[1.1vw] md:h-[1.1vw]" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="transition-colors hover:text-[var(--brand-600)] flex items-center justify-center w-[12vw] h-[12vw] md:w-[3vw] md:h-[3vw]"
              >
                <Twitter className="w-[6vw] h-[6vw] md:w-[1.1vw] md:h-[1.1vw]" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="transition-colors hover:text-[var(--brand-600)] flex items-center justify-center w-[12vw] h-[12vw] md:w-[3vw] md:h-[3vw]"
              >
                <Instagram className="w-[6vw] h-[6vw] md:w-[1.1vw] md:h-[1.1vw]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/gridwage/"
                aria-label="LinkedIn"
                className="transition-colors hover:text-[var(--brand-600)] flex items-center justify-center w-[12vw] h-[12vw] md:w-[3vw] md:h-[3vw]"
              >
                <Linkedin className="w-[6vw] h-[6vw] md:w-[1.1vw] md:h-[1.1vw]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
