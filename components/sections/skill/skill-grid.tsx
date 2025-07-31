// components/sections/skill/skill-grid.tsx

"use client";

// External imports
import React, { useState, useEffect } from "react";

// Components
import SkillIcon from "./skill-icon";
import { VineGenerator } from "@/components/forest-theme/vines";

// Hooks
import { useSkills } from "@/hooks/skill/use-skill";
import { useSkillsHover } from "@/hooks/skill/use-skill-hover";

// Types
import { SkillItem } from "@/types/skill";

// Data
import { skillsFrameVines } from "@/data/vine-configs";

// Utils
import { cn } from "@/lib/utils";

export default function SkillsGrid() {
  const { skills, loading, error } = useSkills();
  const { hoveredSkill, handleSkillHover, handleRowHover, isRowHovered } =
    useSkillsHover();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state - show skeleton until mounted to prevent hydration issues
  if (loading || !mounted) {
    return <SkillsGridSkeleton />;
  }

  // Error state
  if (error) {
    return <SkillsGridError error={error} />;
  }

  // Empty state
  if (!skills || skills.length === 0) {
    return <SkillsGridEmpty />;
  }

  // Success state
  return (
    <SkillsGridContent
      skills={skills}
      hoveredSkill={hoveredSkill}
      handleSkillHover={handleSkillHover}
      handleRowHover={handleRowHover}
      isRowHovered={isRowHovered}
    />
  );
}

// ===== State Components =====

function SkillsGridSkeleton() {
  // Create 9 placeholder items
  const placeholderItems = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="w-full relative">
      {/* Vine decorations - hidden on mobile */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          left: "-30px",
          top: "-30px",
          right: "-30px",
          bottom: "-30px",
        }}
      >
        <VineGenerator vines={skillsFrameVines} />
      </div>

      {/* Skills Grid Container */}
      <div
        className="rounded-xl p-4 md:p-8 relative z-10"
        style={{
          backgroundColor: "var(--surface-primary)",
          boxShadow: "var(--shadow-inset-strong)",
        }}
      >
        <div className="texture-overlay" />

        {/* Placeholder Grid with Shelves */}
        <div className="relative z-10">
          <PlaceholderRows placeholders={placeholderItems} />
        </div>
      </div>
    </div>
  );
}

function SkillsGridError({ error }: { error: string }) {
  return (
    <div className="surface-box w-full rounded-xl p-4 md:p-8">
      <div className="text-center py-12">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>
      </div>
    </div>
  );
}

function SkillsGridEmpty() {
  return (
    <div className="surface-box w-full rounded-xl p-4 md:p-8">
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No skills available at the moment.
        </p>
      </div>
    </div>
  );
}

// ===== Main Content Component =====

function SkillsGridContent({
  skills,
  hoveredSkill,
  handleSkillHover,
  handleRowHover,
  isRowHovered,
}: {
  skills: SkillItem[];
  hoveredSkill: string | null;
  handleSkillHover: (skillId: string | null) => void;
  handleRowHover: (rowIndex: number | null) => void;
  isRowHovered: (rowIndex: number) => boolean;
}) {
  return (
    <div className="w-full relative">
      {/* Vine decorations - hidden on mobile */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          left: "-30px",
          top: "-30px",
          right: "-30px",
          bottom: "-30px",
        }}
      >
        <VineGenerator vines={skillsFrameVines} />
      </div>

      {/* Skills Grid Container */}
      <div
        className="rounded-xl p-4 md:p-8 relative z-10"
        style={{
          backgroundColor: "var(--surface-primary)",
          boxShadow: "var(--shadow-inset-strong)",
        }}
      >
        <div className="texture-overlay" />

        {/* Skills Grid with Responsive Layout */}
        <div className="relative z-10">
          {/* Mobile Layout (4 per row) */}
          <div className="block sm:hidden">
            <SkillRowsLayout
              skills={skills}
              itemsPerRow={4}
              hoveredSkill={hoveredSkill}
              handleSkillHover={handleSkillHover}
              handleRowHover={handleRowHover}
              isRowHovered={isRowHovered}
            />
          </div>

          {/* Tablet Layout (5 per row) */}
          <div className="hidden sm:block lg:hidden">
            <SkillRowsLayout
              skills={skills}
              itemsPerRow={5}
              hoveredSkill={hoveredSkill}
              handleSkillHover={handleSkillHover}
              handleRowHover={handleRowHover}
              isRowHovered={isRowHovered}
            />
          </div>

          {/* Desktop Layout (7 per row) */}
          <div className="hidden lg:block">
            <SkillRowsLayout
              skills={skills}
              itemsPerRow={7}
              hoveredSkill={hoveredSkill}
              handleSkillHover={handleSkillHover}
              handleRowHover={handleRowHover}
              isRowHovered={isRowHovered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Layout Components =====

function SkillRowsLayout({
  skills,
  itemsPerRow,
  hoveredSkill,
  handleSkillHover,
  handleRowHover,
  isRowHovered,
}: {
  skills: SkillItem[];
  itemsPerRow: number;
  hoveredSkill: string | null;
  handleSkillHover: (skillId: string | null) => void;
  handleRowHover: (rowIndex: number | null) => void;
  isRowHovered: (rowIndex: number) => boolean;
}) {
  const rows: SkillItem[][] = [];
  for (let i = 0; i < skills.length; i += itemsPerRow) {
    rows.push(skills.slice(i, i + itemsPerRow));
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <SkillsRow
          key={rowIndex}
          skills={row}
          rowIndex={rowIndex}
          isRowHovered={isRowHovered(rowIndex)}
          hoveredSkill={hoveredSkill}
          onRowHover={handleRowHover}
          onSkillHover={handleSkillHover}
        />
      ))}
    </>
  );
}

// ===== Sub Components =====

type SkillsRowProps = {
  skills: SkillItem[];
  rowIndex: number;
  isRowHovered: boolean;
  hoveredSkill: string | null;
  onRowHover: (rowIndex: number | null) => void;
  onSkillHover: (skillId: string | null) => void;
};

function SkillsRow({
  skills,
  rowIndex,
  isRowHovered,
  hoveredSkill,
  onRowHover,
  onSkillHover,
}: SkillsRowProps) {
  // Row highlight styles
  const rowHighlightStyles = {
    backgroundColor: isRowHovered
      ? "var(--surface-primary-hover)"
      : "transparent",
    boxShadow: isRowHovered ? "var(--shadow-inset-strong)" : "none",
    top: rowIndex === 0 ? "-8px" : "-10px",
    bottom: "-8px",
  };

  // Shelf styles
  const shelfStyles = {
    background:
      "linear-gradient(to bottom, #8B4513 0%, #654321 60%, #2F1B0C 100%)",
    boxShadow:
      "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(139, 69, 19, 0.8)",
  };

  return (
    <div
      className="relative mb-4 md:mb-8 last:mb-0"
      onMouseEnter={() => onRowHover(rowIndex)}
      onMouseLeave={() => onRowHover(null)}
    >
      {/* Full-width highlight background */}
      <div
        className={cn(
          "absolute inset-0 -inset-x-4 md:-inset-x-8 rounded-xl",
          "transition-all duration-300"
        )}
        style={rowHighlightStyles}
      >
        {isRowHovered && <div className="texture-overlay" />}
      </div>

      {/* Row of Skills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10 pb-2">
        {skills.map((skill) => {
          const isSkillHovered = hoveredSkill === skill.id;

          // Skill transform styles
          const skillTransform = isSkillHovered
            ? "translateY(-6px) scale(1.1)"
            : isRowHovered
            ? "translateY(-3px) scale(1.05)"
            : "translateY(0) scale(1)";

          // Skill filter styles
          const skillFilter = isSkillHovered
            ? `drop-shadow(0 12px 24px ${skill.color}40)`
            : isRowHovered
            ? "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))"
            : "none";

          return (
            <div
              key={skill.id}
              className={cn(
                "relative group cursor-pointer transition-all duration-300",
                "flex flex-col items-center"
              )}
              onMouseEnter={() => onSkillHover(skill.id)}
              onMouseLeave={() => onSkillHover(null)}
            >
              {/* Skill Name Label */}
              <p
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors duration-300",
                  "mb-3 sm:mb-2 md:mb-4 text-center"
                )}
                style={{
                  color: isSkillHovered
                    ? skill.color
                    : isRowHovered
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
                  transform: isSkillHovered
                    ? "scale(1.1)"
                    : isRowHovered
                    ? "scale(1.05)"
                    : "scale(1)",
                }}
              >
                {skill.name}
              </p>

              {/* Skill Icon with responsive sizing */}
              <div
                className="transition-all duration-300"
                style={{ transform: skillTransform, filter: skillFilter }}
              >
                <SkillIcon
                  name={skill.name}
                  iconPath={skill.iconPath}
                  color={skill.color}
                  size={60}
                  isHovered={isSkillHovered}
                  isRowHovered={isRowHovered}
                  className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lg:w-[96px] lg:h-[96px]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Shelf Line */}
      <div
        className="w-full h-1.5 md:h-2 rounded-sm relative z-10"
        style={shelfStyles}
      />
    </div>
  );
}

function PlaceholderRows({ placeholders }: { placeholders: number[] }) {
  return (
    <>
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <PlaceholderRowsWithItemsPerRow
          placeholders={placeholders}
          itemsPerRow={4}
        />
      </div>

      {/* Tablet Layout */}
      <div className="hidden sm:block lg:hidden">
        <PlaceholderRowsWithItemsPerRow
          placeholders={placeholders}
          itemsPerRow={5}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <PlaceholderRowsWithItemsPerRow
          placeholders={placeholders}
          itemsPerRow={7}
        />
      </div>
    </>
  );
}

function PlaceholderRowsWithItemsPerRow({
  placeholders,
  itemsPerRow,
}: {
  placeholders: number[];
  itemsPerRow: number;
}) {
  const rows: number[][] = [];
  for (let i = 0; i < placeholders.length; i += itemsPerRow) {
    rows.push(placeholders.slice(i, i + itemsPerRow));
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <PlaceholderRow key={rowIndex} placeholders={row} />
      ))}
    </>
  );
}

function PlaceholderRow({ placeholders }: { placeholders: number[] }) {
  // Shelf styles
  const shelfStyles = {
    background:
      "linear-gradient(to bottom, #8B4513 0%, #654321 60%, #2F1B0C 100%)",
    boxShadow:
      "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(139, 69, 19, 0.8)",
  };

  return (
    <div className="relative mb-4 md:mb-8 last:mb-0">
      {/* Row of Placeholder Skills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10 pb-2">
        {placeholders.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Placeholder for skill name - just empty space */}
            <div className="h-4 sm:h-5 mb-1 sm:mb-2 md:mb-4" />

            {/* Placeholder Icon with responsive classes instead of dynamic sizing */}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl overflow-hidden",
                "w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lg:w-[96px] lg:h-[96px]",
                "p-2"
              )}
              style={{
                backgroundColor: "var(--surface-primary)",
                boxShadow: "var(--shadow-inset-subtle-sm)",
                transition: "var(--transition-default)",
              }}
            >
              {/* Texture pattern overlay */}
              <div className="texture-overlay-sm" />

              {/* Pulsing placeholder content */}
              <div className="relative z-10 flex items-center justify-center rounded-lg overflow-hidden animate-pulse">
                <div className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] lg:w-[72px] lg:h-[72px] bg-gray-500/50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shelf Line */}
      <div
        className="w-full h-1.5 md:h-2 rounded-sm relative z-10"
        style={shelfStyles}
      />
    </div>
  );
}
