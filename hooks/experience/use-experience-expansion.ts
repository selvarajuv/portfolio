// hooks/use-experience-expansion.ts

import { useState } from "react";

export function useExperienceExpansion() {
  const [expandedCard, setExpandedCard] = useState<string>("");

  const handleCardToggle = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? "" : cardId);
  };

  const isCardExpanded = (cardId: string) => expandedCard === cardId;

  return {
    expandedCard,
    handleCardToggle,
    isCardExpanded,
  };
}
