// hooks/use-experience.ts

import { useState, useEffect } from "react";
import { ExperienceItem } from "@/types/experience";
import { getExperienceFromNotion } from "@/lib/experience";

export function useExperience() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperienceFromNotion();
        setExperience(data);
      } catch (err) {
        console.error("Failed to load experience:", err);
        setError("Failed to load experience data");
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  return { experience, loading, error };
}
