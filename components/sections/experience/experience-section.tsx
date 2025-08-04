// components/sections/experience/experience-section.tsx

"use client";

import React from "react";
import ExperienceCard from "./experience-card";
import { useExperience } from "@/hooks/experience/use-experience";
import { useExperienceExpansion } from "@/hooks/experience/use-experience-expansion";
import { cn } from "@/lib/utils";
import { ExperienceItem } from "@/types/experience";

export default function ExperienceSection() {
  const { experience, loading, error } = useExperience();
  const { handleCardToggle, isCardExpanded } = useExperienceExpansion();

  // Loading state
  if (loading) return <ExperienceSectionSkeleton />;

  // Error state
  if (error) return <ExperienceSectionError error={error} />;

  // Empty state
  if (!experience || experience.length === 0) return <ExperienceSectionEmpty />;

  // Success state
  return (
    <ExperienceSectionContent
      experience={experience}
      handleCardToggle={handleCardToggle}
      isCardExpanded={isCardExpanded}
    />
  );
}

// ===== State Components =====

function ExperienceSectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section id="experience" className={cn("section-spacing px-4 md:px-8")}>
      <div className={cn("mx-auto w-full p-4 md:px-[22vw]")}>
        <h1
          className={cn(
            "font-bold mb-16 tracking-tight leading-none text-center"
          )}
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Experience
        </h1>
        {children}
      </div>
    </section>
  );
}

function ExperienceSectionSkeleton() {
  return (
    <ExperienceSectionWrapper>
      <div className="space-y-6">
        {[1, 2, 3].map((index) => (
          <ExperienceCardSkeleton key={index} />
        ))}
      </div>
    </ExperienceSectionWrapper>
  );
}

function ExperienceSectionError({ error }: { error: string }) {
  return (
    <ExperienceSectionWrapper>
      <div className="text-center py-12">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>
      </div>
    </ExperienceSectionWrapper>
  );
}

function ExperienceSectionEmpty() {
  return (
    <ExperienceSectionWrapper>
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No experience entries available at the moment.
        </p>
      </div>
    </ExperienceSectionWrapper>
  );
}

// ===== Main Content Component =====

function ExperienceSectionContent({
  experience,
  handleCardToggle,
  isCardExpanded,
}: {
  experience: ExperienceItem[];
  handleCardToggle: (id: string) => void;
  isCardExpanded: (id: string) => boolean;
}) {
  return (
    <ExperienceSectionWrapper>
      <div className="space-y-6">
        {experience.map((item) => (
          <ExperienceCard
            key={item.id}
            {...item}
            isExpanded={isCardExpanded(item.id)}
            onToggle={handleCardToggle}
          />
        ))}
      </div>
    </ExperienceSectionWrapper>
  );
}

// ===== Helper Components =====

function ExperienceCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className={cn(
          "w-full text-white p-4 md:p-6 rounded-lg",
          "flex flex-col lg:flex-row lg:items-center justify-between"
        )}
        style={{
          backgroundColor: "var(--accent-secondary)",
        }}
      >
        <div className="flex-1 text-left mb-2 lg:mb-0">
          <div className="h-6 bg-white/20 rounded w-3/4" />
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-4">
          <div className="h-5 bg-white/20 rounded w-24" />
          <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded" />
        </div>
      </div>
    </div>
  );
}
