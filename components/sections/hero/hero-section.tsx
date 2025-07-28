// components/sections/hero/hero-section.tsx

"use client";

import React from "react";
import TypewriterTitle from "@/components/sections/hero/typewriter-title";
import ProfileImage from "@/components/sections/hero/profile-image";
import WoodenBox from "@/components/forest-theme/wood-box";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  // Consistent spacing patterns
  const sectionStyles = {
    paddingTop: "clamp(32px, 6vw, 96px)",
  };

  const containerStyles = {
    gap: "clamp(2rem, 3vw, 3rem)", // More consistent with other components
  };

  const titleContainerStyles = {
    height: "clamp(120px, 12vw, 160px)",
    marginBottom: "2rem",
  };

  const descriptionStyles = {
    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
  };

  // Profile box responsive sizing
  const profileBoxSizing = {
    desktop: {
      width: "clamp(280px, 40vw, 540px)", // Reduced min from 400px to 280px
      height: "clamp(320px, 45vw, 630px)", // Reduced min from 450px to 320px
    },
    mobile: {
      width: "clamp(200px, 80vw, 400px)", // Much smaller min, larger vw for mobile
      height: "clamp(240px, 90vw, 450px)", // Proportional height
    },
  };

  return (
    <section id="home" className="flex" style={sectionStyles}>
      <div
        className={cn(
          "mx-auto w-full p-4 md:px-[15vw]",
          "flex flex-col lg:flex-row lg:items-center"
        )}
        style={containerStyles}
      >
        {/* Text Content */}
        <div className="mx-auto">
          <div className="relative" style={titleContainerStyles}>
            <div className="absolute inset-0">
              <TypewriterTitle />
            </div>
          </div>

          <p
            className="text-gray-300 leading-relaxed"
            style={descriptionStyles}
          >
            I'm a software engineer with 7+ years of experience building
            scalable web applications. I specialize in React, Node.js, and cloud
            technologies. Currently co-founding Life Coach Elevate and working
            with clients worldwide.
          </p>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Wooden box with profile image - now includes vines automatically */}
          <WoodenBox
            width={profileBoxSizing.desktop.width}
            height={profileBoxSizing.desktop.height}
            className={cn(
              // Override with mobile sizes on small screens
              "max-sm:!w-[clamp(200px,80vw,400px)]",
              "max-sm:!h-[clamp(240px,90vw,450px)]",
              // Keep desktop sizes for larger screens
              "lg:!w-[clamp(280px,40vw,540px)]",
              "lg:!h-[clamp(320px,45vw,630px)]"
            )}
          >
            <ProfileImage />
          </WoodenBox>
        </div>
      </div>
    </section>
  );
}
