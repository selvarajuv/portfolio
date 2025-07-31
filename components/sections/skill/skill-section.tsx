// components/sections/skill/skills-section.tsx

"use client";

import React from "react";
import SkillsGrid from "@/components/sections/skill/skill-grid";
import { cn } from "@/lib/utils";

export default function SkillsSection() {
  const headingStyles = {
    fontSize: "clamp(2.5rem, 7vw, 5rem)",
  };

  return (
    <section id="skills" className={"section-spacing"}>
      <div className="mx-auto w-full md:px-[25vw]">
        <h1
          className={cn(
            "font-bold mb-16 tracking-tight leading-none text-center"
          )}
          style={headingStyles}
        >
          Skills
        </h1>
        <SkillsGrid />
      </div>
    </section>
  );
}
