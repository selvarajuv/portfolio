// hooks/use-experience-animation.ts

import { useState, useEffect } from "react";

export function useExperienceAnimation(isExpanded: boolean) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isExpanded]);

  return {
    isAnimating,
  };
}
