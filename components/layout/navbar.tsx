// components/layout/navbar.tsx
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { NavbarProps, NavItemProps } from "@/types/layout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define the navigation sections
const navSections = ["home", "work", "experience", "skills"];

export default function Navbar({
  activeSection: initialActiveSection = "home",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const observerRefs = useRef<IntersectionObserver[]>([]);
  const pathname = usePathname();

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up intersection observers for each section when on the home page
  useEffect(() => {
    // Only set up observers if we're on the home page (where all sections exist)
    if (pathname !== "/") return;

    // Listen for manual navbar updates from clicks
    const handleForceUpdate = (event: CustomEvent) => {
      const { section } = event.detail;
      setActiveSection(section);
    };

    window.addEventListener(
      "forceNavbarUpdate",
      handleForceUpdate as EventListener
    );

    // Handle initial hash in URL
    const handleInitialHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Handle hash on initial load
    handleInitialHash();

    // Clean up previous observers
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    // Create new observers for each section
    navSections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only process if observers are not disabled and section is sufficiently visible
            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= 0.2 &&
              !(window as any).observersDisabled
            ) {
              setActiveSection(section);
              // Update URL hash without triggering scroll
              if (window.location.hash !== `#${section}`) {
                window.history.replaceState(null, "", `#${section}`);
              }
            }
          });
        },
        { threshold: 0.2 } // Trigger when 20% of the element is visible
      );

      observer.observe(element);
      observerRefs.current.push(observer);
    });

    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(
        "forceNavbarUpdate",
        handleForceUpdate as EventListener
      );
    };
  }, [pathname]);

  // NOW check if we should hide the navbar (after all hooks are called)
  const isOnProjectPage = pathname !== "/";

  if (isOnProjectPage) {
    return null; // Don't render navbar at all on project pages
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      {/* Fixed-width inner container that never changes size or position */}
      <div className="w-fit mx-auto relative">
        {/* Background element with design tokens */}
        {scrolled && (
          <div
            className={cn(
              "absolute inset-0 backdrop-blur-md shadow-md rounded-full z-0"
            )}
            style={{
              backgroundColor: "var(--navbar-bg)",
            }}
          />
        )}

        {/* Navigation content with fixed positioning - increased spacing between items */}
        <nav className="flex items-center space-x-7 justify-center py-2 px-6 relative pointer-events-auto">
          {navSections.map((section) => (
            <NavItem
              key={section}
              href={`/#${section}`}
              isActive={activeSection === section}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavItem>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, children, isActive }: NavItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hash = href.replace("/#", "");

    // We're on homepage - use the existing logic
    // Temporarily disable all observers
    (window as any).observersDisabled = true;

    // Manually trigger the state update in the parent component
    const updateEvent = new CustomEvent("forceNavbarUpdate", {
      detail: { section: hash },
    });
    window.dispatchEvent(updateEvent);

    // Update URL immediately
    window.history.pushState(null, "", href);

    // Scroll to element
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Re-enable observers after scroll
      setTimeout(() => {
        (window as any).observersDisabled = false;
      }, 1500);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative px-4 py-2 font-medium text-base group text-white",
        !isActive && "hover:text-[var(--navbar-hover-color)]",
        "transition-colors duration-200"
      )}
    >
      {/* Active indicator bubble using design tokens */}
      {isActive && (
        <span
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%+16px)] h-full backdrop-blur-md rounded-full z-10 shadow-sm"
          )}
          style={{
            backgroundColor: "var(--navbar-active-bg)",
          }}
        />
      )}

      {/* Text needs to be above both backgrounds */}
      <span className="relative z-20">{children}</span>
    </Link>
  );
}
