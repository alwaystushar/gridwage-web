"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronRight } from "lucide-react";

export interface DropdownItem {
  title: string;
  description?: string;
  slug: string;
  href?: string;
  icon?: ReactNode;
  image?: string; // Main category image
  items?: {
    title: string;
    description?: string;
    href?: string; // Optional, if not provided will use parent href
    image?: string; // Individual item image
  }[];
}

interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownItem[];
  baseUrl?: string;
}

export default function DropdownMenu({
  isOpen,
  items,
  baseUrl = "",
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number>(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  // Menu open animation
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // Set first item as default active and load default image
  useEffect(() => {
    if (isOpen && items.length > 0) {
      setActiveSubmenu(0);
      setActiveImage(items[0]?.image || "");
    }
  }, [isOpen, items]);

  const handleCategoryMouseEnter = (index: number) => {
    setActiveSubmenu(index);
    setHoveredItem(index);
    // Set category image
    setActiveImage(items[index]?.image || "");
  };

  const handleItemMouseEnter = (itemImage?: string) => {
    if (itemImage) {
      // Animate image change
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          onComplete: () => {
            setActiveImage(itemImage);
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    // Return to category image
    if (items[activeSubmenu]?.image) {
      setActiveImage(items[activeSubmenu].image);
    }
  };

  // Calculate columns needed (max 4 items per column)
  const getColumns = (itemCount: number) => {
    return Math.ceil(itemCount / 4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dropdown menu */}
          <div
            ref={menuRef}
            className="fixed left-0 right-0 w-screen bg-white backdrop-blur-md z-50 dropdown-menu-wrapper"
            style={{
              top: "calc(100%)",
              padding: "2.5vw 8vw",
              borderRadius: "0 0 2vw 2vw",
              opacity: 0,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              maxHeight: "calc(100vh - 10vw)", // Limit height
            }}
          >
            <div className="w-full max-w-[80vw] mx-auto h-full">
              <div className="flex gap-[3vw] h-full">
                {/* Left Sidebar - Menu Categories (Scrollable) */}
                <div
                  className="flex flex-col gap-[0.8vw] overflow-y-auto"
                  style={{
                    minWidth: "18vw",
                    maxWidth: "18vw",
                    maxHeight: "calc(100vh - 15vw)",
                    paddingRight: "0.5vw",
                  }}
                >
                  <p
                    className="text-[var(--gray-0)] uppercase tracking-wider mb-[0.8vw] sticky top-0 bg-white/95 py-[0.5vw] z-10"
                    style={{ fontSize: "0.7vw", fontWeight: 600 }}
                  >
                    Categories
                  </p>
                  {items.map((item, index) => {
                    const isActive = activeSubmenu === index;
                    const isHovered = hoveredItem === index;
                    const categoryHref = item.href || `${baseUrl}/${item.slug}`;

                    return (
                      <Link
                        key={index}
                        href={categoryHref}
                        onMouseEnter={() => handleCategoryMouseEnter(index)}
                        className="cursor-pointer"
                      >
                        <div
                          className={`flex items-center gap-[0.8vw] rounded-[0.7vw] transition-all duration-300 ${
                            isActive || isHovered
                              ? "bg-[var(--brand-50)]"
                              : "bg-transparent hover:bg-[var(--brand-50)]/50"
                          }`}
                          style={{ padding: "0.7vw 0.9vw" }}
                        >
                          {/* Icon */}
                          {item.icon && (
                            <div className="flex-shrink-0 ">{item.icon}</div>
                          )}

                          {/* Content */}
                          <div className="flex-1">
                            <h3
                              className={`font-medium transition-colors ${
                                isActive || isHovered
                                  ? "text-[var(--brand-600)]"
                                  : "text-[var(--text)]"
                              }`}
                              style={{
                                fontSize: "1vw",
                                marginBottom: "0.2vw",
                              }}
                            >
                              {item.title}
                            </h3>
                            {item.description && (
                              <p
                                className="text-[var(--gray-0)]"
                                style={{ fontSize: "0.7vw", lineHeight: 1.3 }}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <ChevronRight
                            className={`flex-shrink-0 transition-all duration-300 ${
                              isActive || isHovered
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            style={{ width: "1.1vw", height: "1.1vw" }}
                            color="var(--brand-600)"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Middle - Submenu Items (Multi-column, scrollable) */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 15vw)", paddingRight: "0.5vw" }}>
                  <AnimatePresence mode="wait">
                    {items[activeSubmenu]?.items && (
                      <motion.div
                        key={activeSubmenu}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p
                          className="text-[var(--gray-0)] uppercase tracking-wider mb-[1.2vw] sticky top-0 bg-white/95 py-[0.5vw] z-10"
                          style={{ fontSize: "0.7vw", fontWeight: 600 }}
                        >
                          {items[activeSubmenu].title}
                        </p>
                        <div
                          className="grid gap-[0.8vw]"
                          style={{
                            gridTemplateColumns: `repeat(${getColumns(
                              items[activeSubmenu].items?.length || 0
                            )}, 1fr)`,
                          }}
                        >
                          {items[activeSubmenu].items?.map(
                            (subItem, subIndex) => {
                              // Use parent category href if sub-item doesn't have its own
                              const categoryHref = items[activeSubmenu].href || `${baseUrl}/${items[activeSubmenu].slug}`;
                              const subItemHref = subItem.href || categoryHref;

                              return (
                                <Link
                                  key={subIndex}
                                  href={subItemHref}
                                  onMouseEnter={() =>
                                    handleItemMouseEnter(subItem.image)
                                  }
                                  onMouseLeave={handleMouseLeave}
                                  className="group flex items-center gap-[0.8vw] bg-white/60 hover:bg-white border border-transparent hover:border-[var(--brand-200)] rounded-[0.8vw] transition-all duration-300"
                                  style={{ padding: "0.9vw 1vw" }}
                                >
                                  <div className="flex-1">
                                    <h4
                                      className="text-[var(--text)] font-medium group-hover:text-[var(--brand-600)] transition-colors"
                                      style={{
                                        fontSize: "0.9vw",
                                        marginBottom: "0.3vw",
                                      }}
                                    >
                                      {subItem.title}
                                    </h4>
                                    {subItem.description && (
                                      <p
                                        className="text-[var(--gray-0)] group-hover:text-[var(--gray-1)] transition-colors"
                                        style={{
                                          fontSize: "0.7vw",
                                          lineHeight: 1.4,
                                        }}
                                      >
                                        {subItem.description}
                                      </p>
                                    )}
                                  </div>

                                  <ChevronRight
                                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    style={{ width: "1vw", height: "1vw" }}
                                    color="var(--gray-0)"
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right - Dynamic Image */}
                <div
                  className="flex-shrink-0"
                  style={{ minWidth: "20vw", maxWidth: "20vw" }}
                >
                  <div
                    ref={imageRef}
                    className="w-full h-full rounded-[1.2vw] overflow-hidden bg-[var(--brand-50)] sticky top-0"
                    style={{ minHeight: "25vw", maxHeight: "calc(100vh - 15vw)" }}
                  >
                    {activeImage ? (
                      <img
                        src={activeImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        style={{ opacity: 1 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--gray-0)]">
                        <p style={{ fontSize: "0.9vw" }}>
                          No preview available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
