// hooks/use-skill.ts

import { useState, useEffect } from "react";
import { getSkillsFromNotion } from "@/lib/skill";
import { SkillItem } from "@/types/skill";

export function useSkills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSkillsFromNotion();
        setSkills(data);
      } catch (err) {
        console.error("Failed to load skills:", err);
        setError("Failed to load skills data");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return { skills, loading, error };
}
