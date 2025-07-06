"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import WoodGrainBackground from "../decorative/wood-grain-background";
import VineDecorations from "../decorative/vine-decorations";
import { setupParallaxEffect } from "@/utils/parallax";

interface PageLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export default function PageLayout({
  children,
  activeSection = "home",
}: PageLayoutProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const leftVinesRef = useRef<HTMLDivElement>(null);
  const rightVinesRef = useRef<HTMLDivElement>(null);

  // Set up parallax effect
  useEffect(() => {
    const cleanup = setupParallaxEffect(
      backgroundRef,
      leftVinesRef,
      rightVinesRef
    );
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      {/* Very dark chocolate brown background base */}
      <div className="fixed inset-0 z-0 bg-[#25130A]" />

      {/* Stylized wood grain pattern */}
      <WoodGrainBackground ref={backgroundRef} />

      {/* Vine decorations */}
      <VineDecorations side="left" ref={leftVinesRef} />
      <VineDecorations side="right" ref={rightVinesRef} />

      {/* Content container with relative positioning to appear above the background */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />

        {children}

        <Footer />
      </div>
    </main>
  );
}
