// components/sections/experience/experience-section.tsx

"use client";

import { useExperience } from "@/hooks/experience/use-experience";
import { useExperienceExpansion } from "@/hooks/experience/use-experience-expansion";
import ExperienceCard from "./experience-card";

export default function ExperienceSection() {
  const { experience, loading, error } = useExperience();
  const { handleCardToggle, isCardExpanded } = useExperienceExpansion();

  return (
    <section id="experience" className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl font-bold mb-16 tracking-tight leading-none text-center">
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
