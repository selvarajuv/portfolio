// components/layout/navbar.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Leaf, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NavbarProps {
  activeSection?: string;
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: (e: React.MouseEvent, href: string) => void;
}

// Constants
const NAV_SECTIONS = ["home", "work", "experience", "skills"];
const SCROLL_THRESHOLD = 100;
const OBSERVER_THRESHOLD = 0.2;
const OBSERVER_DISABLE_DURATION = 1000;

// Container styles as constant
const CONTAINER_STYLES = {
  gap: "clamp(0.5rem, 1vw, 1rem)",
  paddingTop: "clamp(7px, 0.4vw, 14px)",
  paddingBottom: "clamp(7px, 0.4vw, 14px)",
  paddingLeft: "clamp(18px, 0.9vw, 36px)",
  paddingRight: "clamp(18px, 0.9vw, 36px)",
};

// Nav item styles as constant
const NAV_ITEM_STYLES = {
  height: "clamp(40px, 1.6vw, 80px)",
  paddingLeft: "clamp(12px, 0.7vw, 100px)",
  paddingRight: "clamp(12px, 0.7vw, 100px)",
  fontSize: "clamp(1.1rem, 0.65vw, 2rem)",
};

// Extend window type for our custom properties
declare global {
  interface Window {
    observersDisabled?: boolean;
  }
}

// Custom Hooks
function useScrolled(threshold: number = SCROLL_THRESHOLD) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

function useSectionObserver(
  sections: string[],
  pathname: string,
  onSectionChange: (section: string) => void
) {
  const observerRefs = useRef<IntersectionObserver[]>([]);
  const visibleSections = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (pathname !== "/") return;

    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;

            // Update visibility map
            if (entry.isIntersecting) {
              visibleSections.current.set(sectionId, entry.intersectionRatio);
            } else {
              visibleSections.current.delete(sectionId);
            }

            // Find the most visible section
            let mostVisible = { section: "", ratio: 0 };
            visibleSections.current.forEach((ratio, id) => {
              if (ratio > mostVisible.ratio) {
                mostVisible = { section: id, ratio };
              }
            });

            // Update active section if we have a clearly visible section
            if (mostVisible.section && !window.observersDisabled) {
              onSectionChange(mostVisible.section);
              if (window.location.hash !== `#${mostVisible.section}`) {
                window.history.replaceState(
                  null,
                  "",
                  `#${mostVisible.section}`
                );
              }
            }
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: "0px 0px -50% 0px", // Only consider top half of viewport
        }
      );

      observer.observe(element);
      observerRefs.current.push(observer);
    });

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, [sections, pathname, onSectionChange]);
}

// Main Component
export default function Navbar({
  activeSection: initialActiveSection = "home",
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled();

  // Handle section observer
  useSectionObserver(NAV_SECTIONS, pathname, setActiveSection);

  // Handle navigation events
  useEffect(() => {
    if (pathname !== "/") return;

    const handleForceUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ section: string }>;
      setActiveSection(customEvent.detail.section);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && NAV_SECTIONS.includes(hash)) {
        setActiveSection(hash);
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Handle initial hash
    handleHashChange();

    window.addEventListener("forceNavbarUpdate", handleForceUpdate);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("forceNavbarUpdate", handleForceUpdate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  // Navigation handler
  const handleNavigation = (section: string) => {
    window.observersDisabled = true;

    window.dispatchEvent(
      new CustomEvent("forceNavbarUpdate", {
        detail: { section },
      })
    );

    window.history.pushState(null, "", `/#${section}`);
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      window.observersDisabled = false;
    }, OBSERVER_DISABLE_DURATION);
  };

  const handleDesktopNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const section = href.replace("/#", "");
    handleNavigation(section);
  };

  // Don't render on project pages
  if (pathname !== "/") return null;

  return (
    <NavbarContent
      activeSection={activeSection}
      scrolled={scrolled}
      mobileMenuOpen={mobileMenuOpen}
      onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      onMobileMenuClose={() => setMobileMenuOpen(false)}
      onDesktopNavClick={handleDesktopNavClick}
      onNavigate={handleNavigation}
    />
  );
}

// ===== Main Content Component =====

function NavbarContent({
  activeSection,
  scrolled,
  mobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  onDesktopNavClick,
  onNavigate,
}: {
  activeSection: string;
  scrolled: boolean;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onMobileMenuClose: () => void;
  onDesktopNavClick: (e: React.MouseEvent, href: string) => void;
  onNavigate: (section: string) => void;
}) {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50">
        <div className="w-full p-4">
          {/* Desktop Navigation */}
          <DesktopNavigation
            activeSection={activeSection}
            scrolled={scrolled}
            onNavClick={onDesktopNavClick}
          />

          {/* Mobile Navigation Header */}
          <MobileHeader
            mobileMenuOpen={mobileMenuOpen}
            onToggle={onMobileMenuToggle}
          />
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        activeSection={activeSection}
        onClose={onMobileMenuClose}
        onNavigate={onNavigate}
      />
    </>
  );
}

// ===== Sub Components =====

function DesktopNavigation({
  activeSection,
  scrolled,
  onNavClick,
}: {
  activeSection: string;
  scrolled: boolean;
  onNavClick: (e: React.MouseEvent, href: string) => void;
}) {
  return (
    <div className="hidden md:flex justify-center">
      <div className="w-fit mx-auto relative">
        {scrolled && (
          <div
            className="absolute inset-0 backdrop-blur-md shadow-md rounded-full z-0"
            style={{ backgroundColor: "var(--overlay-subtle)" }}
            aria-hidden="true"
          />
        )}
        <nav
          className="flex items-center justify-center relative rounded-full"
          style={CONTAINER_STYLES}
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_SECTIONS.map((section) => (
            <NavItem
              key={section}
              href={`/#${section}`}
              isActive={activeSection === section}
              onClick={onNavClick}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavItem>
          ))}
        </nav>
      </div>
    </div>
  );
}

function MobileHeader({
  mobileMenuOpen,
  onToggle,
}: {
  mobileMenuOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="md:hidden w-full">
      <div className="flex justify-between items-center">
        <button
          onClick={onToggle}
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
  );
}

function NavItem({ href, children, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "relative font-medium group text-white transition-colors duration-200",
        "flex items-center justify-center",
        !isActive && "hover:text-[var(--accent-primary)]"
      )}
      style={NAV_ITEM_STYLES}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[calc(100%+16px)] h-full backdrop-blur-md rounded-full 
                     z-10 shadow-sm"
          style={{ backgroundColor: "var(--overlay-active)" }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-20 flex items-center justify-center w-full h-full">
        {children}
      </span>
    </Link>
  );
}

function MobileMenu({
  isOpen,
  activeSection,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (section: string) => void;
}) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className="fixed top-0 left-0 h-full w-60"
        style={{
          backgroundColor: "var(--overlay-subtle)",
          backdropFilter: "blur(16px)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className="px-6 py-16">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => {
                onNavigate(section);
                onClose();
              }}
              className={cn(
                "flex items-center py-4 cursor-pointer w-full",
                "transition-colors duration-200",
                activeSection === section
                  ? "text-[var(--accent-primary)]"
                  : "text-white hover:text-[var(--accent-primary)]"
              )}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && (
                <Leaf className="ml-auto" aria-hidden="true" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
