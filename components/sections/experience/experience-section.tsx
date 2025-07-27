// components/sections/experience/experience-section.tsx

"use client";

import { useExperience } from "@/hooks/experience/use-experience";
import { useExperienceExpansion } from "@/hooks/experience/use-experience-expansion";
import ExperienceCard from "./experience-card";

export default function ExperienceSection() {
  const { experience, loading, error } = useExperience();
  const { handleCardToggle, isCardExpanded } = useExperienceExpansion();

  return (
    <section id="experience" className="py-24 p-2">
      {/* Container using full width on mobile, 70vw on larger screens */}
      <div className="mx-auto w-full md:w-[40vw]">
        <h1
          className="font-bold mb-16 tracking-tight leading-none text-center"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Experience
        </h1>

        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Loading experience...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

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
