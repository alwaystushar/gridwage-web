"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { productsMenu, solutionsMenu } from "@/app/data/menuData";
import MagneticButton from "@/app/Components/UI/MagneticButton";
import DropdownMenu from "@/app/Components/UI/DropdownMenu";
import { useLoading } from "./LoadingContext";

// Navigation Links
const NAV_LINKS = [
  { href: "/about", label: "About Us", key: "about" },
  { href: "/pricing", label: "Pricing", key: "pricing" },
  { href: "/blogs", label: "Blogs", key: "blogs" },
];

const DROPDOWN_MENUS = {
  products: {
    key: "products",
    label: "Products",
    items: productsMenu,
    baseUrl: "/products",
  },
  solutions: {
    key: "solutions",
    label: "Solutions",
    items: solutionsMenu,
    baseUrl: "/solutions",
  },
};

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLElement | null>>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveRef = useRef<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();

  // Header drop animation after loading
  useEffect(() => {
    if (!isLoading && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );
    }
  }, [isLoading]);

  // Function to update underline position
  const updateUnderlinePosition = (activeKey: string) => {
    const activeElement = navRefs.current[activeKey];
    
    if (activeElement && underlineRef.current) {
      const rect = activeElement.getBoundingClientRect();
      const parentElement = activeElement.parentElement;
      const parentRect = parentElement?.getBoundingClientRect();
      
      if (parentRect) {
        const newLeft = rect.left - parentRect.left;
        const newWidth = rect.width;

        gsap.set(underlineRef.current, {
          width: newWidth,
          left: newLeft,
          opacity: 1,
        });
      }
    }
  };

  // Desktop underline animation
  useEffect(() => {
    if (pathname === "/" || pathname === "/home") {
      if (underlineRef.current) {
        const currentElement = underlineRef.current;
        const currentWidth = currentElement.offsetWidth;
        const computedStyle = getComputedStyle(currentElement);
        const currentLeft = parseFloat(computedStyle.left) || 0;
        
        gsap.to(currentElement, {
          width: 0,
          left: currentLeft + currentWidth / 2,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
      prevActiveRef.current = null;
      return;
    }

    const activeKey = Object.entries(navRefs.current).find(([key]) => {
      return pathname.startsWith(`/${key.toLowerCase()}`);
    })?.[0];

    const activeElement = activeKey ? navRefs.current[activeKey] : null;

    if (activeElement && underlineRef.current) {
      const rect = activeElement.getBoundingClientRect();
      const parentElement = activeElement.parentElement;
      const parentRect = parentElement?.getBoundingClientRect();
      
      if (parentRect) {
        const newLeft = rect.left - parentRect.left;
        const newWidth = rect.width;

        if (prevActiveRef.current !== activeKey) {
          if (prevActiveRef.current === null) {
            gsap.fromTo(
              underlineRef.current,
              {
                left: newLeft + newWidth / 2,
                width: 0,
                opacity: 0,
              },
              {
                left: newLeft,
                width: newWidth,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
              }
            );
          } else {
            const currentElement = underlineRef.current;
            const computedStyle = getComputedStyle(currentElement);
            const currentLeft = parseFloat(computedStyle.left) || 0;
            const currentWidth = currentElement.offsetWidth;
            
            const timeline = gsap.timeline();
            
            timeline.to(currentElement, {
              width: 0,
              left: currentLeft + currentWidth / 2,
              duration: 0.25,
              ease: "power3.in",
            });
            
            timeline.to(currentElement, {
              left: newLeft + newWidth / 2,
              duration: 0,
            });
            
            timeline.to(currentElement, {
              width: newWidth,
              left: newLeft,
              duration: 0.25,
              ease: "power3.out",
            });
          }
          
          prevActiveRef.current = activeKey ?? null;
        }
      }
    }
  }, [pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (pathname === "/" || pathname === "/home") return;

      const activeKey = Object.entries(navRefs.current).find(([key]) => {
        return pathname.startsWith(`/${key.toLowerCase()}`);
      })?.[0];

      if (activeKey) {
        updateUnderlinePosition(activeKey);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );

      const validItems = mobileItemsRef.current.filter((item): item is HTMLDivElement => item !== null);
      
      gsap.fromTo(
        validItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setMobileMenuOpen(false),
      });
    } else {
      setMobileMenuOpen(true);
    }
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileActiveMenu(mobileActiveMenu === menu ? null : menu);
  };

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 w-full bg-[var(--white)] z-50">
        <nav className="grid-container items-center" style={{ paddingTop: '1vw', paddingBottom: '1vw' }}>
          {/* Logo */}
          <div className="col-span-2">
            <Link href="/">
              <div>
                <img src="/logo.svg" className="size-[3.5vw]" alt="Logo" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex col-span-8 justify-start items-center relative" style={{ gap: '3vw' }}>
            {/* About Us Link */}
            <Link
              href={NAV_LINKS[0].href}
              ref={(el) => {
                navRefs.current[NAV_LINKS[0].key] = el;
              }}
              className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors"
            >
              {NAV_LINKS[0].label}
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu(DROPDOWN_MENUS.products.key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                ref={(el) => {
                  navRefs.current[DROPDOWN_MENUS.products.key] = el;
                }}
                className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors flex items-center"
                style={{ gap: '0.5vw' }}
              >
                {DROPDOWN_MENUS.products.label}
                <motion.svg
                  style={{ width: '1vw', height: '1vw' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: activeMenu === DROPDOWN_MENUS.products.key ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <DropdownMenu
                isOpen={activeMenu === DROPDOWN_MENUS.products.key}
                items={DROPDOWN_MENUS.products.items}
                baseUrl={DROPDOWN_MENUS.products.baseUrl}
                gridCols={2}
                width="50vw"
              />
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu(DROPDOWN_MENUS.solutions.key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                ref={(el) => {
                  navRefs.current[DROPDOWN_MENUS.solutions.key] = el;
                }}
                className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors flex items-center"
                style={{ gap: '0.5vw' }}
              >
                {DROPDOWN_MENUS.solutions.label}
                <motion.svg
                  style={{ width: '1vw', height: '1vw' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: activeMenu === DROPDOWN_MENUS.solutions.key ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <DropdownMenu
                isOpen={activeMenu === DROPDOWN_MENUS.solutions.key}
                items={DROPDOWN_MENUS.solutions.items}
                baseUrl={DROPDOWN_MENUS.solutions.baseUrl}
                gridCols={1}
                width="40vw"
              />
            </div>

            {/* Pricing Link */}
            <Link
              href={NAV_LINKS[1].href}
              ref={(el) => {
                navRefs.current[NAV_LINKS[1].key] = el;
              }}
              className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors"
            >
              {NAV_LINKS[1].label}
            </Link>

            {/* Blogs Link */}
            <Link
              href={NAV_LINKS[2].href}
              ref={(el) => {
                navRefs.current[NAV_LINKS[2].key] = el;
              }}
              className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors"
            >
              {NAV_LINKS[2].label}
            </Link>

            {/* Animated underline */}
            <div
              ref={underlineRef}
              className="absolute bg-[var(--brand-600)] rounded-full"
              style={{ bottom: '-1.5vw', height: '0.2vw', width: 0, opacity: 0, left: 0 }}
            />
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex col-span-2 justify-end">
            <MagneticButton variant="secondary">
              Try demo
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden col-span-10 justify-end">
            <button
              onClick={handleMobileMenuToggle}
              className="flex flex-col justify-center items-center"
              style={{ width: '8vw', height: '8vw', gap: '1.5vw' }}
            >
              <span 
                className={`bg-[var(--text)] rounded-full transition-transform`}
                style={{ width: '6vw', height: '0.5vw', transform: mobileMenuOpen ? 'rotate(45deg) translateY(2vw)' : 'none' }}
              />
              <span 
                className={`bg-[var(--text)] rounded-full transition-opacity`}
                style={{ width: '6vw', height: '0.5vw', opacity: mobileMenuOpen ? 0 : 1 }}
              />
              <span 
                className={`bg-[var(--text)] rounded-full transition-transform`}
                style={{ width: '6vw', height: '0.5vw', transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-2vw)' : 'none' }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 w-full h-screen bg-[var(--white)] z-40 md:hidden overflow-y-auto"
          style={{ transform: "translateX(100%)", paddingTop: '6vw' }}
        >
          {/* Close Button */}
          <div className="absolute top-0 right-0" style={{ padding: '4vw' }}>
            <button
              onClick={handleMobileMenuToggle}
              className="flex items-center justify-center"
              style={{ width: '8vw', height: '8vw' }}
            >
              <svg style={{ width: '6vw', height: '6vw' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div style={{ padding: '8vw 6vw' }}>
            {/* About Us */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[0] = el;
              }}
              style={{ marginBottom: '4vw' }}
            >
              <Link
                href={NAV_LINKS[0].href}
                className="b1 font-semibold text-[var(--text)] block"
                onClick={handleMobileMenuToggle}
              >
                {NAV_LINKS[0].label}
              </Link>
            </div>

            {/* Products Accordion */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[1] = el;
              }}
              style={{ marginBottom: '4vw' }}
            >
              <button
                onClick={() => toggleMobileSubmenu(DROPDOWN_MENUS.products.key)}
                className="b1 font-semibold text-[var(--text)] flex items-center justify-between w-full"
              >
                {DROPDOWN_MENUS.products.label}
                <svg
                  style={{
                    width: '5vw',
                    height: '5vw',
                    transform: mobileActiveMenu === DROPDOWN_MENUS.products.key ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Products Submenu */}
              {mobileActiveMenu === DROPDOWN_MENUS.products.key && (
                <div style={{ marginTop: '3vw', paddingLeft: '4vw' }}>
                  {DROPDOWN_MENUS.products.items.map((item, index) => (
                    <Link
                      key={index}
                      href={`${DROPDOWN_MENUS.products.baseUrl}/${item.slug}`}
                      className="block hover:bg-[var(--brand-0)] transition-colors"
                      style={{ padding: '3vw', borderRadius: '2vw', marginBottom: '2vw' }}
                      onClick={handleMobileMenuToggle}
                    >
                      <h3 className="b2 font-semibold text-[var(--text)]" style={{ marginBottom: '1vw' }}>
                        {item.title}
                      </h3>
                      <p className="b4 text-[var(--gray-0)]">{item.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[2] = el;
              }}
              style={{ marginBottom: '4vw' }}
            >
              <button
                onClick={() => toggleMobileSubmenu(DROPDOWN_MENUS.solutions.key)}
                className="b1 font-semibold text-[var(--text)] flex items-center justify-between w-full"
              >
                {DROPDOWN_MENUS.solutions.label}
                <svg
                  style={{
                    width: '5vw',
                    height: '5vw',
                    transform: mobileActiveMenu === DROPDOWN_MENUS.solutions.key ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Solutions Submenu */}
              {mobileActiveMenu === DROPDOWN_MENUS.solutions.key && (
                <div style={{ marginTop: '3vw', paddingLeft: '4vw' }}>
                  {DROPDOWN_MENUS.solutions.items.map((item, index) => (
                    <Link
                      key={index}
                      href={`${DROPDOWN_MENUS.solutions.baseUrl}/${item.slug}`}
                      className="block hover:bg-[var(--brand-0)] transition-colors"
                      style={{ padding: '3vw', borderRadius: '2vw', marginBottom: '2vw' }}
                      onClick={handleMobileMenuToggle}
                    >
                      <h3 className="b2 font-semibold text-[var(--text)]" style={{ marginBottom: '1vw' }}>
                        {item.title}
                      </h3>
                      <p className="b4 text-[var(--gray-0)]">{item.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[3] = el;
              }}
              style={{ marginBottom: '4vw' }}
            >
              <Link
                href={NAV_LINKS[1].href}
                className="b1 font-semibold text-[var(--text)] block"
                onClick={handleMobileMenuToggle}
              >
                {NAV_LINKS[1].label}
              </Link>
            </div>

            {/* Blogs */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[4] = el;
              }}
              style={{ marginBottom: '4vw' }}
            >
              <Link
                href={NAV_LINKS[2].href}
                className="b1 font-semibold text-[var(--text)] block"
                onClick={handleMobileMenuToggle}
              >
                {NAV_LINKS[2].label}
              </Link>
            </div>

            {/* CTA Button */}
            <div
              ref={(el) => {
                if (el) mobileItemsRef.current[5] = el;
              }}
              style={{ marginTop: '6vw' }}
            >
              <MagneticButton variant="secondary" onClick={handleMobileMenuToggle}>
                Try demo
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
