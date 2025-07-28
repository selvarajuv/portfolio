// components/sections/experience/experience-section.tsx

"use client";

import React from "react";
import { useExperience } from "@/hooks/experience/use-experience";
import { useExperienceExpansion } from "@/hooks/experience/use-experience-expansion";
import ExperienceCard from "./experience-card";
import { cn } from "@/lib/utils";

// Loading Component
function ExperienceLoading() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-lg">Loading experience...</div>
    </div>
  );
}

// Error Component
function ExperienceError({ error }: { error: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>
    </div>
  );
}

export default function ExperienceSection() {
  const { experience, loading, error } = useExperience();
  const { handleCardToggle, isCardExpanded } = useExperienceExpansion();

  // Consistent heading styles
  const headingStyles = {
    fontSize: "clamp(2.5rem, 7vw, 5rem)",
  };

  return (
    <section id="experience" className={cn("section-spacing px-4 md:px-8")}>
      <div className="mx-auto w-full md:w-[50vw]">
        <h1
          className={cn(
            "font-bold mb-16 tracking-tight leading-none text-center"
          )}
          style={headingStyles}
        >
          Experience
        </h1>

        {/* Conditional Rendering */}
        {loading && <ExperienceLoading />}
        {error && <ExperienceError error={error} />}

        {!loading && !error && (
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
        )}
      </div>
    </section>
  );
}
