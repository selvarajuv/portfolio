"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Define the navigation sections
const navSections = ["home", "work", "experience", "skill"]

interface NavbarProps {
  activeSection?: string
}

export default function Navbar({ activeSection: initialActiveSection = "home" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(initialActiveSection)
  const observerRefs = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Set up intersection observers for each section when on the home page
  useEffect(() => {
    // Only set up observers if we're on the home page (where all sections exist)
    if (window.location.pathname !== "/") return

    // Handle initial hash in URL
    const handleInitialHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash)
        // Scroll to the section immediately without delay for direct navigation
        const element = document.getElementById(hash)
        if (element) {
          // Use immediate scroll for direct hash navigation
          element.scrollIntoView({ behavior: "auto", block: "start" })
          // Then update to smooth scrolling after initial positioning
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 50)
        }
      }
    }

    // Handle hash on initial load
    handleInitialHash()

    // Clean up previous observers
    observerRefs.current.forEach((observer) => observer.disconnect())
    observerRefs.current = []

    // Create new observers for each section
    navSections.forEach((section) => {
      const element = document.getElementById(section)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When section is 50% visible, set it as active
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveSection(section)
              // Update URL hash without triggering scroll
              if (window.location.hash !== `#${section}`) {
                window.history.replaceState(null, "", `#${section}`)
              }
            }
          })
        },
        { threshold: 0.5 }, // Trigger when 50% of the element is visible
      )

      observer.observe(element)
      observerRefs.current.push(observer)
    })

    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && navSections.includes(hash)) {
        setActiveSection(hash)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect())
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      {/* Fixed-width inner container that never changes size or position */}
      <div className="w-fit mx-auto relative">
        {/* Background element with increased transparency - lower z-index */}
        {scrolled && <div className="absolute inset-0 bg-black/50 backdrop-blur-md shadow-md rounded-full z-0" />}

        {/* Navigation content with fixed positioning - increased spacing between items */}
        <nav className="flex items-center space-x-7 justify-center py-2 px-6 relative pointer-events-auto">
          {navSections.map((section) => (
            <NavItem key={section} href={`/#${section}`} isActive={activeSection === section}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavItem>
          ))}
        </nav>
      </div>
    </header>
  )
}

interface NavItemProps {
  href: string
  children: React.ReactNode
  isActive: boolean
}

// Update the NavItem component to use the primary green color on hover
function NavItem({ href, children, isActive }: NavItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const hash = href.replace("/#", "")

    // Update URL
    window.history.pushState(null, "", href)

    // Scroll to element
    const element = document.getElementById(hash)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`
        relative px-4 py-2 font-medium text-base group transition-colors duration-200
        ${isActive ? "text-white" : "text-white hover:text-[#016428]"}
      `}
    >
      {/* Active indicator bubble using the secondary color with same transparency as navbar */}
      {isActive && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+16px)] h-full bg-[#014421]/50 backdrop-blur-md rounded-full z-10 shadow-sm"></span>
      )}

      {/* Text needs to be above both backgrounds */}
      <span className="relative z-20">{children}</span>
    </Link>
  )
}
