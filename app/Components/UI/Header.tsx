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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const pathname = usePathname();
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLElement | null>>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveRef = useRef<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();
  const lastScrollY = useRef(0);

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate header visibility
  useEffect(() => {
    if (headerRef.current && !isLoading) {
      gsap.to(headerRef.current, {
        y: isHeaderVisible ? 0 : -130,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHeaderVisible, isLoading]);

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

    const activeKey = Object.entries(navRefs.current).find(([key]) =>
      pathname.startsWith(`/${key.toLowerCase()}`)
    )?.[0];

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

            timeline.set(currentElement, {
              left: newLeft + newWidth / 2,
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

      const activeKey = Object.entries(navRefs.current).find(([key]) =>
        pathname.startsWith(`/${key.toLowerCase()}`)
      )?.[0];

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
        { x: "0%", duration: 0.8, ease: "power3.out" }
      );

      const validItems = mobileItemsRef.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

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

  const handleTryDemo = () => {
    // Replace with your demo page route
    window.location.href = "/demo"; // or router.push("/demo")
    handleMobileMenuToggle();
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileActiveMenu(mobileActiveMenu === menu ? null : menu);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xs border-b border-white/20 z-50"
      >
<nav className="grid-container items-center lg:py-[1vw] py-[3vw]">
          {/* Logo */}
          <div className="col-span-2">
            <Link href="/">
              <div>
                <img src="/logo.svg" className="md:size-[3.5vw]" alt="Logo" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex col-span-8 justify-end items-center relative"
            style={{ gap: "3vw" }}
          >
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
                style={{ gap: "0.5vw" }}
              >
                {DROPDOWN_MENUS.products.label}
                <motion.svg
                  style={{ width: "1vw", height: "1vw" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    rotate:
                      activeMenu === DROPDOWN_MENUS.products.key ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
                style={{ gap: "0.5vw" }}
              >
                {DROPDOWN_MENUS.solutions.label}
                <motion.svg
                  style={{ width: "1vw", height: "1vw" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    rotate:
                      activeMenu === DROPDOWN_MENUS.solutions.key ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
              style={{
                bottom: "-1.5vw",
                height: "0.2vw",
                width: 0,
                opacity: 0,
                left: 0,
              }}
            />
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex col-span-2 justify-end">
            <MagneticButton 
              variant="secondary" 
              onClick={() => window.location.href = "/demo"}
            >
              Try demo
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden col-span-10 justify-end">
            <button
              onClick={handleMobileMenuToggle}
              className="flex flex-col justify-center items-center"
              style={{ width: "8vw", height: "8vw", gap: "2.5vw" }}
              aria-label="Toggle navigation"
            >
              <span
                className="bg-[var(--text)] rounded-full transition-transform"
                style={{
                  width: "6vw",
                  height: "0.5vw",
                  transform: mobileMenuOpen
                    ? "rotate(45deg) translateY(2vw)"
                    : "none",
                }}
              />

              <span
                className="bg-[var(--text)] rounded-full transition-transform"
                style={{
                  width: "6vw",
                  height: "0.5vw",
                  transform: mobileMenuOpen
                    ? "rotate(-45deg) translateY(-2vw)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 w-full h-screen bg-[var(--white)] z-40 md:hidden overflow-hidden"
          style={{ transform: "translateX(100%)", paddingTop: "6vw" }}
        >
          {/* Close Button */}


          <div className="flex flex-col h-full">
            {/* Centered items - START LEFT aligned */}
            <div
              className="flex-1 overflow-y-auto flex flex-col items-start justify-start"
              style={{ padding: "15vw 4vw 10vw" }}
            >
              {/* Home */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[0] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href="/"
                  className={`h3  block py-3 px-4 rounded-xl transition-all ${
                    pathname === "/" || pathname === "/home"
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  Home
                </Link>
              </div>

              {/* About */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[1] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href={NAV_LINKS[0].href}
                  className={`h3 block py-3 px-4 rounded-xl transition-all ${
                    pathname.startsWith("/about")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  {NAV_LINKS[0].label}
                </Link>
              </div>

              {/* Products Accordion */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[2] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <button
                  onClick={() =>
                    toggleMobileSubmenu(DROPDOWN_MENUS.products.key)
                  }
                  className={`h3  flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all ${
                    mobileActiveMenu === DROPDOWN_MENUS.products.key
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                >
                  <span>Products</span>
                  <motion.svg
                    style={{ width: "0vw", height: "5vw" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{
                      rotate:
                        mobileActiveMenu === DROPDOWN_MENUS.products.key
                          ? 180
                          : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {mobileActiveMenu === DROPDOWN_MENUS.products.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden", marginTop: "3vw" }}
                    >
                      <div style={{ paddingLeft: "4vw" }}>
                        {DROPDOWN_MENUS.products.items.map((item, index) => (
                          <Link
                            key={index}
                            href={`${DROPDOWN_MENUS.products.baseUrl}/${item.slug}`}
                            className="block hover:bg-[var(--brand-0)] transition-colors text-left"
                            style={{
                              padding: "3vw",
                              borderRadius: "2vw",
                              marginBottom: "2vw",
                            }}
                            onClick={handleMobileMenuToggle}
                          >
                            <h3
                              className="b2 font-semibold text-[var(--text)]"
                              style={{ marginBottom: "1vw" }}
                            >
                              {item.title}
                            </h3>
                            <p className="b4 text-[var(--gray-0)]">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Accordion */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[3] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <button
                  onClick={() =>
                    toggleMobileSubmenu(DROPDOWN_MENUS.solutions.key)
                  }
                  className={`h3 flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all ${
                    mobileActiveMenu === DROPDOWN_MENUS.solutions.key
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                >
                  <span>Solutions</span>
                  <motion.svg
                    style={{ width: "0vw", height: "5vw" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{
                      rotate:
                        mobileActiveMenu === DROPDOWN_MENUS.solutions.key
                          ? 180
                          : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {mobileActiveMenu === DROPDOWN_MENUS.solutions.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden", marginTop: "3vw" }}
                    >
                      <div style={{ paddingLeft: "4vw" }}>
                        {DROPDOWN_MENUS.solutions.items.map((item, index) => (
                          <Link
                            key={index}
                            href={`${DROPDOWN_MENUS.solutions.baseUrl}/${item.slug}`}
                            className="block hover:bg-[var(--brand-0)] transition-colors text-left"
                            style={{
                              padding: "3vw",
                              borderRadius: "2vw",
                              marginBottom: "2vw",
                            }}
                            onClick={handleMobileMenuToggle}
                          >
                            <h3
                              className="b2 font-semibold text-[var(--text)]"
                              style={{ marginBottom: "1vw" }}
                            >
                              {item.title}
                            </h3>
                            <p className="b4 text-[var(--gray-0)]">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[4] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href={NAV_LINKS[1].href}
                  className={`h3  block py-3 px-4 rounded-xl transition-all ${
                    pathname.startsWith("/pricing")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  {NAV_LINKS[1].label}
                </Link>
              </div>

              {/* Blogs */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[5] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href={NAV_LINKS[2].href}
                  className={`h3  block py-3 px-4 rounded-xl transition-all ${
                    pathname.startsWith("/blogs")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  {NAV_LINKS[2].label}
                </Link>
              </div>
            </div>

            {/* Bottom CTA - navigates to demo page */}
            <div
              className=" bg-white"
              style={{ padding: "5vw 8vw 20vw" }}
            >
              <MagneticButton
                variant="secondary"
                className="w-full justify-center"
                onClick={handleTryDemo}
              >
                Try demo
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
