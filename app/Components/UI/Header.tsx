"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Add useRouter
import MagneticButton from "@/app/Components/UI/MagneticButton";
import DropdownMenu, { DropdownItem } from "@/app/Components/UI/DropdownMenu";
import { useLoading } from "./LoadingContext";
import { 
  Globe, 
  Briefcase, 
  Plane, 
  DollarSign,
  Rocket,
  MonitorDot,
  TrendingUp,
  Users,
  Building2,
  Shield,
  Zap,
  Target
} from "lucide-react";

// Navigation Links
const NAV_LINKS = [
  { href: "/about", label: "About Us", key: "about" },
  { href: "/pricing", label: "Pricing", key: "pricing" },
  // { href: "/blogs", label: "Blogs", key: "blogs" },
  { href: "/cost-calculater", label: "Cost Calculater", key: "cost-calculater" },
];

// Products menu - all icons white
const PRODUCTS_MENU: DropdownItem[] = [
  {
    title: "EOR — Employer of Record",
    description: "Hire Anywhere. Stay Compliant.",
    slug: "eor",
    href: "/products/eor",
    image: "/menu/eor.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-[var(--brand-600)] rounded-[0.5vw] flex items-center justify-center">
        <Globe style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Global Hiring",
        description: "Hire employees in 150+ countries",
        image: "/menu/eor-1.jpg",
      },
      {
        title: "Compliance Management",
        description: "Stay compliant with local laws",
        image: "/menu/eor-2.jpg",
      },
      {
        title: "Payroll Processing",
        description: "Automated global payroll",
        image: "/menu/eor-3.jpg",
      },
      {
        title: "Benefits Administration",
        description: "Comprehensive benefits management",
        image: "/menu/eor-4.jpg",
      },
      {
        title: "Tax Management",
        description: "Global tax compliance",
        image: "/menu/eor-5.jpg",
      },
      {
        title: "Contract Management",
        description: "Employment contracts made easy",
        image: "/menu/eor-6.jpg",
      },
      {
        title: "Onboarding Solutions",
        description: "Seamless employee onboarding",
        image: "/menu/eor-7.jpg",
      },
    ],
  },
  {
    title: "Contractor Management",
    description: "Simplify Global Contracting.",
    slug: "contractor",
    href: "/products/contractor",
    image: "/menu/contractor.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-[var(--brand-600)] rounded-[0.5vw] flex items-center justify-center">
        <Briefcase style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Contractor Onboarding",
        description: "Quick and compliant onboarding",
        image: "/menu/contractor-1.jpg",
      },
      {
        title: "Payment Solutions",
        description: "Pay contractors worldwide",
        image: "/menu/contractor-2.jpg",
      },
      {
        title: "Invoice Management",
        description: "Automated invoicing system",
        image: "/menu/contractor-3.jpg",
      },
      {
        title: "Compliance Tracking",
        description: "Track contractor compliance",
        image: "/menu/contractor-4.jpg",
      },
    ],
  },
  {
    title: "Expat & Global Mobility",
    description: "Relocation Made Seamless.",
    slug: "expat",
    href: "/products/expat",
    image: "/menu/expat.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-[var(--brand-600)] rounded-[0.5vw] flex items-center justify-center">
        <Plane style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Visa Support",
        description: "Expert visa assistance",
        image: "/menu/expat-1.jpg",
      },
      {
        title: "Relocation Services",
        description: "Comprehensive relocation",
        image: "/menu/expat-2.jpg",
      },
      {
        title: "Immigration Support",
        description: "Immigration consulting",
        image: "/menu/expat-3.jpg",
      },
    ],
  },
  {
    title: "Global Payroll",
    description: "Pay Anyone, Anywhere.",
    slug: "global-payroll",
    href: "/products/global-payroll",
    image: "/menu/payroll.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-[var(--brand-600)] rounded-[0.5vw] flex items-center justify-center">
        <DollarSign style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Multi-Currency Payments",
        description: "Pay in local currencies",
        image: "/menu/payroll-1.jpg",
      },
      {
        title: "Tax Management",
        description: "Automated tax calculations",
        image: "/menu/payroll-2.jpg",
      },
      {
        title: "Payroll Reports",
        description: "Detailed payroll analytics",
        image: "/menu/payroll-3.jpg",
      },
      {
        title: "Direct Deposit",
        description: "Instant salary transfers",
        image: "/menu/payroll-4.jpg",
      },
      {
        title: "Payslip Generation",
        description: "Automated payslip creation",
        image: "/menu/payroll-5.jpg",
      },
      {
        title: "Year-End Processing",
        description: "Annual payroll processing",
        image: "/menu/payroll-6.jpg",
      },
    ],
  },
];


// Solutions menu - with white icons
const SOLUTIONS_MENU: DropdownItem[] = [
  {
    title: "For Startups & Scaleups",
    description: "Scale fast globally without setting up entities.",
    slug: "startups-scaleups",
    href: "/solutions/startups",
    image: "/menu/startups.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Rocket style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Quick Global Expansion",
        description: "Enter new markets rapidly",
        image: "/menu/startups-1.jpg",
      },
      {
        title: "Cost-Effective Hiring",
        description: "Reduce hiring costs",
        image: "/menu/startups-2.jpg",
      },
      {
        title: "Rapid Team Scaling",
        description: "Build teams at startup speed",
        image: "/menu/startups-3.jpg",
      },
    ],
  },
  {
    title: "For Remote-First Companies",
    description: "Build distributed teams anywhere.",
    slug: "remote-first-companies",
    href: "/solutions/remote-first-companies",
    image: "/menu/remote.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <MonitorDot style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Remote Team Management",
        description: "Manage distributed teams",
        image: "/menu/remote-1.jpg",
      },
      {
        title: "Global Collaboration",
        description: "Enable seamless collaboration",
        image: "/menu/remote-2.jpg",
      },
      {
        title: "Async Work Solutions",
        description: "Support timezone-flexible work",
        image: "/menu/remote-3.jpg",
      },
    ],
  },
  {
    title: "For SMEs & Growing Businesses",
    description: "Expand internationally with confidence.",
    slug: "smes-growing-businesses",
    href: "/solutions/smes-growing-businesses",
    image: "/menu/sme.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <TrendingUp style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "International Growth",
        description: "Scale your business globally",
        image: "/menu/sme-1.jpg",
      },
      {
        title: "Compliance Support",
        description: "Stay compliant everywhere",
        image: "/menu/sme-2.jpg",
      },
      {
        title: "Market Entry Strategy",
        description: "Enter new markets strategically",
        image: "/menu/sme-3.jpg",
      },
    ],
  },
  {
    title: "For HR & People Teams",
    description: "Simplify global workforce management.",
    slug: "hr-people-teams",
    href: "/solutions/hr-people-teams",
    image: "/menu/hr.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Users style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "HR Automation",
        description: "Automate HR processes",
        image: "/menu/hr-1.jpg",
      },
      {
        title: "People Analytics",
        description: "Data-driven insights",
        image: "/menu/hr-2.jpg",
      },
      {
        title: "Talent Management",
        description: "Attract and retain top talent",
        image: "/menu/hr-3.jpg",
      },
    ],
  },
  {
    title: "For Enterprises",
    description: "Enterprise-grade global workforce solutions.",
    slug: "enterprises",
    href: "/solutions/enterprises",
    image: "/menu/enterprise.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Building2 style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Enterprise Compliance",
        description: "Multi-jurisdiction compliance",
        image: "/menu/enterprise-1.jpg",
      },
      {
        title: "Dedicated Support",
        description: "White-glove service",
        image: "/menu/enterprise-2.jpg",
      },
      {
        title: "Custom Integrations",
        description: "Seamless system integration",
        image: "/menu/enterprise-3.jpg",
      },
    ],
  },
  {
    title: "For Compliance-First Organizations",
    description: "Built for industries with strict regulations.",
    slug: "compliance-first",
    href: "/solutions/compliance-first",
    image: "/menu/compliance.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Shield style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Regulatory Compliance",
        description: "Meet all regulatory requirements",
        image: "/menu/compliance-1.jpg",
      },
      {
        title: "Audit Support",
        description: "Audit-ready documentation",
        image: "/menu/compliance-2.jpg",
      },
      {
        title: "Risk Management",
        description: "Minimize compliance risks",
        image: "/menu/compliance-3.jpg",
      },
    ],
  },
  {
    title: "For Fast-Moving Teams",
    description: "Agile hiring for dynamic organizations.",
    slug: "fast-moving-teams",
    href: "/solutions/fast-moving-teams",
    image: "/menu/agile.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Zap style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Rapid Deployment",
        description: "Hire and onboard in days",
        image: "/menu/agile-1.jpg",
      },
      {
        title: "Flexible Contracts",
        description: "Adapt to changing needs",
        image: "/menu/agile-2.jpg",
      },
      {
        title: "Scalable Solutions",
        description: "Grow or shrink as needed",
        image: "/menu/agile-3.jpg",
      },
    ],
  },
  {
    title: "For Mission-Driven Companies",
    description: "Purpose-driven global hiring solutions.",
    slug: "mission-driven",
    href: "/solutions/mission-driven",
    image: "/menu/mission.jpg",
    icon: (
      <div className="w-[2.5vw] h-[2.5vw] bg-purple-700 rounded-[0.5vw] flex items-center justify-center">
        <Target style={{ width: "1.3vw", height: "1.3vw" }} strokeWidth={2} color="white" />
      </div>
    ),
    items: [
      {
        title: "Impact Hiring",
        description: "Hire for social impact",
        image: "/menu/mission-1.jpg",
      },
      {
        title: "Diverse Talent Pools",
        description: "Access global diversity",
        image: "/menu/mission-2.jpg",
      },
      {
        title: "Ethical Employment",
        description: "Fair and transparent practices",
        image: "/menu/mission-3.jpg",
      },
    ],
  },
];

const DROPDOWN_MENUS = {
  products: {
    key: "products",
    label: "Products",
    items: PRODUCTS_MENU,
  },
  solutions: {
    key: "solutions",
    label: "Solutions",
    items: SOLUTIONS_MENU,
    baseUrl: "/solutions",
  },
};


export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const router = useRouter(); // Add router


  const pathname = usePathname();
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLElement | null>>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveRef = useRef<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();
  const lastScrollY = useRef(0);
  const menuCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown menu when route changes
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.dropdown-menu-wrapper')) {
        setActiveMenu(null);
      }
    };


      const handleTryDemo = () => {
    router.push("/demo"); // Use router.push instead of window.location.href
    handleMobileMenuToggle();
  };


    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenu]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (menuCloseTimeout.current) {
        clearTimeout(menuCloseTimeout.current);
      }
    };
  }, []);

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
        setActiveMenu(null);
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
    if (pathname === "/" || pathname === "/home" || pathname.startsWith("/products/") || pathname.startsWith("/solutions/")) {
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

    let activeKey: string | undefined;
    activeKey = Object.entries(navRefs.current).find(([key]) =>
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
      if (pathname === "/" || pathname === "/home" || pathname.startsWith("/products/") || pathname.startsWith("/solutions/")) return;

      let activeKey: string | undefined;
      activeKey = Object.entries(navRefs.current).find(([key]) =>
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
    window.location.href = "/demo";
    handleMobileMenuToggle();
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileActiveMenu(mobileActiveMenu === menu ? null : menu);
  };

  // Menu hover handlers with delay
  const handleMenuEnter = (menuKey: string) => {
    if (menuCloseTimeout.current) {
      clearTimeout(menuCloseTimeout.current);
      menuCloseTimeout.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    menuCloseTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full backdrop-blur-xs border-b border-white/20 z-50"
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
              className="relative dropdown-container"
              onMouseEnter={() => handleMenuEnter(DROPDOWN_MENUS.products.key)}
              onMouseLeave={handleMenuLeave}
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

              <div
                onMouseEnter={() => handleMenuEnter(DROPDOWN_MENUS.products.key)}
                onMouseLeave={handleMenuLeave}
              >
                <DropdownMenu
                  isOpen={activeMenu === DROPDOWN_MENUS.products.key}
                  items={DROPDOWN_MENUS.products.items}
                />
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => handleMenuEnter(DROPDOWN_MENUS.solutions.key)}
              onMouseLeave={handleMenuLeave}
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

              <div
                onMouseEnter={() => handleMenuEnter(DROPDOWN_MENUS.solutions.key)}
                onMouseLeave={handleMenuLeave}
              >
                <DropdownMenu
                  isOpen={activeMenu === DROPDOWN_MENUS.solutions.key}
                  items={DROPDOWN_MENUS.solutions.items}
                  baseUrl={DROPDOWN_MENUS.solutions.baseUrl}
                />
              </div>
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
            {/* <Link
              href={NAV_LINKS[2].href}
              ref={(el) => {
                navRefs.current[NAV_LINKS[2].key] = el;
              }}
              className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors"
            >
              {NAV_LINKS[2].label}
            </Link> */}

                        {/* Cost Calculater Link */}
            <Link
              href={NAV_LINKS[3].href}
              ref={(el) => {
                navRefs.current[NAV_LINKS[3].key] = el;
              }}
              className="b3 text-[var(--text)] hover:text-[var(--brand-600)] transition-colors"
            >
              {NAV_LINKS[3].label}
            </Link>

            {/* Animated underline */}
            <div
              ref={underlineRef}
              className="absolute bg-[var(--brand-600)] rounded-full"
              style={{
                bottom: "-0.8vw",
                height: "0.1vw",
                width: 0,
                opacity: 0,
                left: 0,
              }}
            />
          </div>

          

{/* Desktop CTA */}
<div className="hidden md:flex col-span-2 justify-center items-center" style={{ gap: "1vw" }}>
  {/* NEW LOGIN BUTTON */}
  <a 
    href="https://app.gridwage.com/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="b3 text-[var(--brand-600)] hover:text-[var(--brand-700)] hover:underline transition-all"
  >
    Login
  </a>
  
  <Link href="/demo">
    <MagneticButton variant="secondary">
      Try demo
    </MagneticButton>
  </Link>
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
          <div className="flex flex-col h-full">
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
                  className={`h3 block py-3 px-4 rounded-xl transition-all ${
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
                  className={`h3 flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all ${
                    mobileActiveMenu === DROPDOWN_MENUS.products.key ||
                    pathname.startsWith("/products/")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                >
                  <span>Products</span>
                  <motion.svg
                    style={{ width: "5vw", height: "5vw" }}
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
                        {PRODUCTS_MENU.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href || `/products/${item.slug}`}
                            className={`group block md:border transition-all text-left ${
                              pathname === item.href
                                ? "md:bg-[var(--brand-50)] md:border-[var(--brand-300)]"
                                : "bg-white md:border-[var(--brand-100)] hover:bg-[var(--brand-50)] hover:border-[var(--brand-300)]"
                            }`}
                            style={{
                              padding: "3vw",
                              borderRadius: "2vw",
                              marginBottom: "2vw",
                            }}
                            onClick={handleMobileMenuToggle}
                          >
                            <div className="flex items-center gap-[2vw] mb-[1.5vw] hidden md:visible">
                              <div className="transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                              </div>
                            </div>
                            <h3
                              className={`b2 font-semibold transition-colors duration-300 ${
                                pathname === item.href
                                  ? "text-[var(--brand-600)]"
                                  : "text-[var(--text)] group-hover:text-[var(--brand-600)]"
                              }`}
                              style={{ marginBottom: "1vw" }}
                            >
                              {item.title}
                            </h3>
                            <p className="b4 text-[var(--gray-0)] group-hover:text-[var(--gray-1)] transition-colors duration-300">
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
                    mobileActiveMenu === DROPDOWN_MENUS.solutions.key ||
                    pathname.startsWith("/solutions/")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                >
                  <span>Solutions</span>
                  <motion.svg
                    style={{ width: "5vw", height: "5vw" }}
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
                        {SOLUTIONS_MENU.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href || `${DROPDOWN_MENUS.solutions.baseUrl}/${item.slug}`}
                            className="group block md:border border-[var(--brand-100)] hover:border-[var(--brand-300)] bg-white hover:bg-[var(--brand-50)] transition-all text-left"
                            style={{
                              padding: "3vw",
                              borderRadius: "2vw",
                              marginBottom: "2vw",
                            }}
                            onClick={handleMobileMenuToggle}
                          >
                            <div className="flex items-center gap-[2vw] mb-[1.5vw] hidden md:visible">
                              <div className="transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                              </div>
                            </div>
                            <h3
                              className="b2 font-semibold text-[var(--text)] group-hover:text-[var(--brand-600)] transition-colors duration-300"
                              style={{ marginBottom: "1vw" }}
                            >
                              {item.title}
                            </h3>
                            <p className="b4 text-[var(--gray-0)] group-hover:text-[var(--gray-1)] transition-colors duration-300">
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
                  className={`h3 block py-3 px-4 rounded-xl transition-all ${
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
              {/* <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[5] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href={NAV_LINKS[2].href}
                  className={`h3 block py-3 px-4 rounded-xl transition-all ${
                    pathname.startsWith("/blogs")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  {NAV_LINKS[2].label}
                </Link>
              </div> */}

                            {/* Cost Calculater */}
              <div
                ref={(el) => {
                  if (el) mobileItemsRef.current[6] = el;
                }}
                style={{ marginBottom: "0vw", width: "100%" }}
              >
                <Link
                  href={NAV_LINKS[3].href}
                  className={`h3 block py-3 px-4 rounded-xl transition-all ${
                    pathname.startsWith("/cost-calculater")
                      ? "text-[var(--brand-600)] bg-[var(--brand-50)]"
                      : "text-[var(--text)] hover:bg-[var(--brand-0)]"
                  }`}
                  onClick={handleMobileMenuToggle}
                >
                  {NAV_LINKS[3].label}
                </Link>
              </div>
            </div>

            {/* Bottom CTA */}
{/* Bottom CTA */}
<div className="bg-white space-y-[2vw]" style={{ padding: "5vw 8vw 20vw" }}>
  {/* NEW LOGIN BUTTON */}
  <MagneticButton
    variant="secondary"
    className="w-full justify-center"
    
  >
    <a 
      href="https://app.gridwage.com/login" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Login
    </a>
  </MagneticButton>
  
  <MagneticButton
    variant="primary"
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
