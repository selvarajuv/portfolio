// componenets/sections/skill/skill-grid.tsx

"use client";

import React from "react";
import { SkillItem } from "@/types/skill";
import SkillIcon from "./skill-icon";
import { useSkills } from "@/hooks/skill/use-skill";
import { useSkillsHover } from "@/hooks/skill/use-skill-hover";
import { useWoodGrain } from "@/hooks/use-wood-grain";
import { VineGenerator } from "../../forest-theme/vines";
import { skillsFrameVines } from "@/data/vine-configs";

// Helper function to determine responsive values
function getResponsiveValues(width: number) {
  if (width < 640) return { itemsPerRow: 4, iconSize: 60 };
  if (width < 1024) return { itemsPerRow: 5, iconSize: 72 };
  return { itemsPerRow: 7, iconSize: 96 };
}

// Helper function to group skills into rows
function groupSkillsIntoRows<T>(items: T[], itemsPerRow: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }
  return rows;
}

type SkillsRowProps = {
  skills: SkillItem[];
  rowIndex: number;
  isRowHovered: boolean;
  hoveredSkill: string | null;
  onRowHover: (rowIndex: number | null) => void;
  onSkillHover: (skillId: string | null) => void;
  iconSize: number;
};

function SkillsRow({
  skills,
  rowIndex,
  isRowHovered,
  hoveredSkill,
  onRowHover,
  onSkillHover,
  iconSize,
}: SkillsRowProps) {
  const { overlayProps: hoverOverlayProps } = useWoodGrain();

  return (
    <div
      className="relative mb-4 md:mb-8 last:mb-0"
      onMouseEnter={() => onRowHover(rowIndex)}
      onMouseLeave={() => onRowHover(null)}
    >
      {/* Full-width highlight background */}
      <div
        className="absolute inset-0 -inset-x-4 md:-inset-x-8 rounded-xl transition-all duration-300"
        style={{
          backgroundColor: isRowHovered ? "#5e301a" : "transparent",
          boxShadow: isRowHovered
            ? "inset 0 0 40px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(0, 0, 0, 0.7)"
            : "none",
          top: rowIndex === 0 ? "-8px" : "-10px",
          bottom: "-8px",
        }}
      >
        {isRowHovered && <div {...hoverOverlayProps} />}
      </div>

      {/* Row of Skills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10 pb-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="relative group cursor-pointer transition-all duration-300 flex flex-col items-center"
            onMouseEnter={() => onSkillHover(skill.id)}
            onMouseLeave={() => onSkillHover(null)}
          >
            {/* Skill Name Label */}
            <p
              className="text-xs sm:text-sm font-medium transition-colors duration-300 mb-1 sm:mb-2 md:mb-4 text-center"
              style={{
                color:
                  hoveredSkill === skill.id
                    ? skill.color
                    : isRowHovered
                    ? "#f0f0f0"
                    : "#ffffff",
              }}
            >
              {skill.name}
            </p>

            {/* Skill Icon */}
            <div
              className="transition-all duration-300"
              style={{
                transform:
                  hoveredSkill === skill.id
                    ? "translateY(-6px) scale(1.1)"
                    : isRowHovered
                    ? "translateY(-3px) scale(1.05)"
                    : "translateY(0) scale(1)",
                filter:
                  hoveredSkill === skill.id
                    ? `drop-shadow(0 12px 24px ${skill.color}40)`
                    : isRowHovered
                    ? "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))"
                    : "none",
              }}
            >
              <SkillIcon
                name={skill.name}
                iconPath={skill.iconPath}
                color={skill.color}
                size={iconSize}
                isHovered={hoveredSkill === skill.id}
                isRowHovered={isRowHovered}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Shelf Line */}
      <div
        className="w-full h-1.5 md:h-2 rounded-sm relative z-10"
        style={{
          background:
            "linear-gradient(to bottom, #8B4513 0%, #654321 60%, #2F1B0C 100%)",
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(139, 69, 19, 0.8)",
        }}
      />
    </div>
  );
}

export default function SkillsGrid() {
  const { skills, loading, error } = useSkills();
  const { hoveredSkill, handleSkillHover, handleRowHover, isRowHovered } =
    useSkillsHover();
  const { overlayProps: mainOverlayProps } = useWoodGrain();

  // State for responsive values
  const [screenWidth, setScreenWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Update screen width on resize
  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div
        className="w-full rounded-xl p-4 md:p-8"
        style={{ backgroundColor: "#2d1810" }}
      >
        <div className="text-center py-12 text-gray-400 text-lg">
          Loading skills...
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className="w-full rounded-xl p-4 md:p-8"
        style={{ backgroundColor: "#2d1810" }}
      >
        <div className="text-center py-12">
          <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Get responsive values and group skills
  const { itemsPerRow, iconSize } = getResponsiveValues(screenWidth);
  const skillRows = groupSkillsIntoRows(skills, itemsPerRow);

  return (
    <div className="w-full relative">
      {/* Vine decorations - hidden on mobile */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ left: "-30px", top: "-30px", right: "-30px", bottom: "-30px" }}
      >
        <VineGenerator vines={skillsFrameVines} />
      </div>

      {/* Skills Grid Container */}
      <div
        className="rounded-xl p-4 md:p-8 relative z-10"
        style={{
          backgroundColor: "#2d1810",
          boxShadow:
            "inset 0 0 40px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div {...mainOverlayProps} />

        {/* Skills Grid with Shelves */}
        <div className="relative z-10">
          {skillRows.map((row, rowIndex) => (
            <SkillsRow
              key={rowIndex}
              skills={row}
              rowIndex={rowIndex}
              isRowHovered={isRowHovered(rowIndex)}
              hoveredSkill={hoveredSkill}
              onRowHover={handleRowHover}
              onSkillHover={handleSkillHover}
              iconSize={iconSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
