// components/sections/hero/hero-section.tsx

"use client";

// External imports
import React from "react";

// Components
import TypewriterTitle from "@/components/sections/hero/typewriter-title";
import ProfileImage from "@/components/sections/hero/profile-image";
import WoodenBox from "@/components/forest-theme/wood-box";

// Hooks
import { useMisc } from "@/hooks/use-misc";

// Utils
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { miscs, loading, error } = useMisc();

  // Loading state
  if (loading) {
    return <HeroSectionSkeleton />;
  }

  // Error state
  if (error) {
    return <HeroSectionError error={error} />;
  }

  // Empty state
  if (!miscs || miscs.length === 0) {
    return <HeroSectionEmpty />;
  }

  // Success state
  const heroDescription = miscs[0].heroDescription || "";
  return <HeroSectionContent heroDescription={heroDescription} />;
}

// ===== State Components =====

function HeroSectionSkeleton() {
  const sectionStyles = {
    paddingTop: "clamp(32px, 6vw, 96px)",
  };

  const containerStyles = {
    gap: "clamp(2rem, 3vw, 3rem)",
  };

  const profileBoxSizing = {
    desktop: {
      width: "clamp(280px, 40vw, 540px)",
      height: "clamp(320px, 45vw, 630px)",
    },
    mobile: {
      width: "clamp(200px, 80vw, 400px)",
      height: "clamp(240px, 90vw, 450px)",
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
        {/* Text Content Skeleton */}
        <div className="mx-auto w-full">
          {/* TypewriterTitle handles its own loading state */}
          <TypewriterTitle />

          {/* Description skeleton */}
          <div className="space-y-3 animate-pulse">
            <div className="h-5 bg-gray-500/20 rounded w-full" />
            <div className="h-5 bg-gray-500/20 rounded w-11/12" />
            <div className="h-5 bg-gray-500/20 rounded w-4/5" />
            <div className="h-5 bg-gray-500/20 rounded w-3/4" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center lg:justify-end">
          <WoodenBox
            width={profileBoxSizing.desktop.width}
            height={profileBoxSizing.desktop.height}
            className={cn(
              "max-sm:!w-[clamp(200px,80vw,400px)]",
              "max-sm:!h-[clamp(240px,90vw,450px)]",
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

function HeroSectionError({ error }: { error: string }) {
  const sectionStyles = {
    paddingTop: "clamp(32px, 6vw, 96px)",
  };

  const containerStyles = {
    gap: "clamp(2rem, 3vw, 3rem)",
  };

  const profileBoxSizing = {
    desktop: {
      width: "clamp(280px, 40vw, 540px)",
      height: "clamp(320px, 45vw, 630px)",
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
        {/* Text Content with Error */}
        <div className="mx-auto w-full">
          {/* TypewriterTitle still works independently */}
          <TypewriterTitle />

          {/* Error message */}
          <p className="text-red-400">
            Failed to load hero description. Please refresh the page.
          </p>
        </div>

        {/* Profile Image still shows */}
        <div className="relative flex justify-center lg:justify-end">
          <WoodenBox
            width={profileBoxSizing.desktop.width}
            height={profileBoxSizing.desktop.height}
            className={cn(
              "max-sm:!w-[clamp(200px,80vw,400px)]",
              "max-sm:!h-[clamp(240px,90vw,450px)]",
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

function HeroSectionEmpty() {
  const sectionStyles = {
    paddingTop: "clamp(32px, 6vw, 96px)",
  };

  const containerStyles = {
    gap: "clamp(2rem, 3vw, 3rem)",
  };

  const profileBoxSizing = {
    desktop: {
      width: "clamp(280px, 40vw, 540px)",
      height: "clamp(320px, 45vw, 630px)",
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
        {/* Text Content with default */}
        <div className="mx-auto w-full">
          {/* TypewriterTitle still works independently */}
          <TypewriterTitle />

          {/* Default description */}
          <p
            className="text-gray-300 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
          >
            Welcome to my portfolio. I'm passionate about creating amazing
            digital experiences.
          </p>
        </div>

        {/* Profile Image still shows */}
        <div className="relative flex justify-center lg:justify-end">
          <WoodenBox
            width={profileBoxSizing.desktop.width}
            height={profileBoxSizing.desktop.height}
            className={cn(
              "max-sm:!w-[clamp(200px,80vw,400px)]",
              "max-sm:!h-[clamp(240px,90vw,450px)]",
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

// ===== Main Content Component =====

function HeroSectionContent({ heroDescription }: { heroDescription: string }) {
  const sectionStyles = {
    paddingTop: "clamp(32px, 6vw, 96px)",
  };

  const containerStyles = {
    gap: "clamp(2rem, 3vw, 3rem)",
  };

  const titleContainerStyles = {
    height: "clamp(120px, 12vw, 160px)",
    marginBottom: "2rem",
  };

  const descriptionStyles = {
    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
  };

  const profileBoxSizing = {
    desktop: {
      width: "clamp(280px, 40vw, 540px)",
      height: "clamp(320px, 45vw, 630px)",
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
        <div className="mx-auto w-full">
          <div className="relative" style={titleContainerStyles}>
            <div className="absolute inset-0">
              <TypewriterTitle />
            </div>
          </div>

          <p
            className="text-gray-300 leading-relaxed"
            style={descriptionStyles}
          >
            {heroDescription}
          </p>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full p-4 max-w-[540px] lg:p-0 lg:w-[35vw] lg:max-w-[540px]">
            <WoodenBox className="w-full aspect-[6/7]">
              <ProfileImage />
            </WoodenBox>
          </div>
        </div>
      </div>
    </section>
  );
}
