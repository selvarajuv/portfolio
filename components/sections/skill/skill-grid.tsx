// components/sections/skills/skill-grid.tsx

"use client";

import { useState } from "react";
import SkillIcon from "./skill-icon";
import skills from "@/data/skills";
import { useWoodGrain } from "@/hooks/use-wood-grain";
import { VineGenerator } from "../../decorative/vines";
import { skillsFrameVines } from "@/data/vine-configs";

// Helper function to group skills into rows
function groupSkillsIntoRows<T>(items: T[], itemsPerRow = 7): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }
  return rows;
}

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const skillRows = groupSkillsIntoRows(skills, 7);

  // Wood grain overlays
  const { overlayProps: mainOverlayProps } = useWoodGrain();
  const { overlayProps: hoverOverlayProps } = useWoodGrain();

  return (
    <div className="w-full relative">
      {/* Vine decorations around the skills box */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ left: "-30px", top: "-30px", right: "-30px", bottom: "-30px" }}
      >
        <VineGenerator vines={skillsFrameVines} />
      </div>

      {/* Skills Grid Container with Recessed Box */}
      <div
        className="rounded-xl p-8 relative z-10"
        style={{
          backgroundColor: "#2d1810",
          boxShadow: `
            inset 0 0 40px rgba(0, 0, 0, 0.9),
            inset 0 0 80px rgba(0, 0, 0, 0.7),
            inset 0 0 120px rgba(0, 0, 0, 0.4)
          `,
        }}
      >
        {/* Wood grain pattern overlay */}
        <div {...mainOverlayProps} />

        {/* Skills Grid with Shelves */}
        <div className="relative z-10">
          {skillRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative mb-8 last:mb-0"
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Full-width highlight background */}
              <div
                className="absolute inset-0 -inset-x-8 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor:
                    hoveredRow === rowIndex ? "#5e301a" : "transparent",
                  boxShadow:
                    hoveredRow === rowIndex
                      ? `
                      inset 0 0 40px rgba(0, 0, 0, 0.9),
                      inset 0 0 80px rgba(0, 0, 0, 0.7),
                      inset 0 0 120px rgba(0, 0, 0, 0.4)
                    `
                      : "none",
                  top: rowIndex === 0 ? "-16px" : "-20px",
                  bottom: "-16px",
                }}
              >
                {/* Wood grain pattern overlay for hovered row */}
                {hoveredRow === rowIndex && <div {...hoverOverlayProps} />}
              </div>

              {/* Row of Skills */}
              <div
                className="flex flex-wrap justify-center gap-8 relative z-10"
                style={{ paddingBottom: "8px" }}
              >
                {row.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group cursor-pointer transition-all duration-300 flex flex-col items-center"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Name Label - Above the icon with increased margin */}
                    <div className="text-center mb-4">
                      <p
                        className="text-sm font-medium transition-colors duration-300"
                        style={{
                          color:
                            hoveredSkill === skill.name
                              ? skill.color
                              : hoveredRow === rowIndex
                              ? "#f0f0f0"
                              : "#ffffff",
                        }}
                      >
                        {skill.name}
                      </p>
                    </div>

                    {/* Skill Icon - Sits on top of the shelf */}
                    <div
                      className="transition-all duration-300"
                      style={{
                        transform:
                          hoveredSkill === skill.name
                            ? "translateY(-6px) scale(1.1)"
                            : hoveredRow === rowIndex
                            ? "translateY(-3px) scale(1.05)"
                            : "translateY(0) scale(1)",
                        filter:
                          hoveredSkill === skill.name
                            ? `drop-shadow(0 12px 24px ${skill.color}40)`
                            : hoveredRow === rowIndex
                            ? `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))`
                            : "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))",
                      }}
                    >
                      <SkillIcon
                        name={skill.name}
                        iconPath={skill.iconPath}
                        color={skill.color}
                        size={96}
                        isHovered={hoveredSkill === skill.name}
                        isRowHovered={hoveredRow === rowIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Shelf Line */}
              <div
                className="w-full h-2 rounded-sm relative z-10"
                style={{
                  background: `linear-gradient(to bottom, 
                    #8B4513 0%, 
                    #A0522D 20%, 
                    #8B4513 40%, 
                    #654321 60%, 
                    #4A2C17 80%, 
                    #2F1B0C 100%
                  )`,
                  boxShadow: `
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(139, 69, 19, 0.8),
                    inset 0 -1px 0 rgba(47, 27, 12, 0.8)
                  `,
                }}
              />

              {/* Shelf Support Shadow */}
              <div
                className="w-full h-1 mt-1 relative z-10"
                style={{
                  background: `linear-gradient(to bottom, 
                    rgba(0, 0, 0, 0.4) 0%, 
                    rgba(0, 0, 0, 0.2) 50%, 
                    transparent 100%
                  )`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
