// hooks/use-skills-hover.ts

import { useState } from "react";

export function useSkillsHover() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleSkillHover = (skillId: string | null) => {
    setHoveredSkill(skillId);
  };

  const handleRowHover = (rowIndex: number | null) => {
    setHoveredRow(rowIndex);
  };

  const isSkillHovered = (skillId: string) => hoveredSkill === skillId;
  const isRowHovered = (rowIndex: number) => hoveredRow === rowIndex;

  return {
    hoveredSkill,
    hoveredRow,
    handleSkillHover,
    handleRowHover,
    isSkillHovered,
    isRowHovered,
  };
}
