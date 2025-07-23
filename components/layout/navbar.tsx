// components/layout/navbar.tsx
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { NavbarProps, NavItemProps } from "@/types/layout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Leaf, X } from "lucide-react";

const navSections = ["home", "work", "experience", "skills"];

export default function Navbar({
  activeSection: initialActiveSection = "home",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRefs = useRef<IntersectionObserver[]>([]);
  const pathname = usePathname();

  // Handle scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle intersection observers and navigation
  useEffect(() => {
    if (pathname !== "/") return;

    const handleForceUpdate = (event: CustomEvent) => {
      setActiveSection(event.detail.section);
    };

    const handleInitialHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash);
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash);
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Setup
    window.addEventListener(
      "forceNavbarUpdate",
      handleForceUpdate as EventListener
    );
    window.addEventListener("hashchange", handleHashChange);
    handleInitialHash();

    // Clean up previous observers
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    // Create intersection observers
    navSections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= 0.2 &&
              !(window as any).observersDisabled
            ) {
              setActiveSection(section);
              if (window.location.hash !== `#${section}`) {
                window.history.replaceState(null, "", `#${section}`);
              }
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(element);
      observerRefs.current.push(observer);
    });

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(
        "forceNavbarUpdate",
        handleForceUpdate as EventListener
      );
    };
  }, [pathname]);

  // Handle mobile menu keyboard controls and scroll lock
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Desktop navigation click handler
  const handleDesktopNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const hash = href.replace("/#", "");

    // Temporarily disable observers to prevent conflicts
    (window as any).observersDisabled = true;

    // Trigger manual update
    window.dispatchEvent(
      new CustomEvent("forceNavbarUpdate", {
        detail: { section: hash },
      })
    );

    // Update URL and scroll
    window.history.pushState(null, "", href);
    document.getElementById(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Re-enable observers after scroll completes
    setTimeout(() => {
      (window as any).observersDisabled = false;
    }, 1500);
  };

  // Mobile menu navigation handler
  const handleMobileNavClick = (section: string) => {
    setMobileMenuOpen(false);

    // Temporarily disable observers to prevent conflicts
    (window as any).observersDisabled = true;

    // Trigger manual update
    window.dispatchEvent(
      new CustomEvent("forceNavbarUpdate", {
        detail: { section },
      })
    );

    // Update URL and scroll
    window.history.pushState(null, "", `/#${section}`);
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Re-enable observers after scroll completes
    setTimeout(() => {
      (window as any).observersDisabled = false;
    }, 1500);
  };

  // Don't render on project pages
  if (pathname !== "/") return null;

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50">
        <div className="w-full p-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="w-fit mx-auto relative">
              {scrolled && (
                <div
                  className="absolute inset-0 backdrop-blur-md shadow-md rounded-full z-0"
                  style={{ backgroundColor: "var(--navbar-bg)" }}
                />
              )}
              <nav
                className="flex items-center justify-center relative rounded-full"
                style={{
                  gap: "1vw",
                  paddingTop: "clamp(8px, .4vw, 14px)",
                  paddingBottom: "clamp(7px, .4vw, 14px)",
                  paddingLeft: "clamp(18px, .9vw, 36px)",
                  paddingRight: "clamp(18px, .9vw, 36px)",
                }}
              >
                {navSections.map((section) => (
                  <NavItem
                    key={section}
                    href={`/#${section}`}
                    isActive={activeSection === section}
                    onClick={handleDesktopNavClick}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavItem>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Navigation Header */}
          <div className="md:hidden w-full">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full transition-all duration-300"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Leaf className="w-6 h-6 text-white" />
                )}
              </button>
              <div className="text-white font-medium text-lg">vichu.dev</div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed top-0 left-0 h-full w-60"
            style={{
              backgroundColor: "var(--navbar-bg)",
              backdropFilter: "blur(16px)",
            }}
          >
            <nav className="px-6 py-16">
              {navSections.map((section) => (
                <div
                  key={section}
                  onClick={() => handleMobileNavClick(section)}
                  className={cn(
                    "flex items-center py-4 cursor-pointer transition-colors duration-200",
                    activeSection === section
                      ? "text-[#016428]"
                      : "text-white hover:text-[var(--navbar-hover-color)]"
                  )}
                >
                  {section}
                  {activeSection === section && <Leaf className="ml-auto" />}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({
  href,
  children,
  isActive,
  onClick,
  className = "",
}: NavItemProps & {
  onClick: (e: React.MouseEvent, href: string) => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "relative font-medium group text-white transition-colors duration-200 flex items-center justify-center ",
        !isActive && "hover:text-[var(--navbar-hover-color)]",
        className
      )}
      style={{
        height: "clamp(40px, 1.6vw, 80px)",
        paddingLeft: "clamp(12px, .7vw, 100px)",
        paddingRight: "clamp(12px, .7vw, 100px)",
        fontSize: "clamp(.85rem, .65vw, 2rem)",
      }}
    >
      {isActive && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+16px)] h-full backdrop-blur-md rounded-full z-10 shadow-sm"
          style={{ backgroundColor: "var(--navbar-active-bg)" }}
        />
      )}
      <span className="relative z-20 flex items-center justify-center w-full h-full">
        {children}
      </span>
    </Link>
  );
}
