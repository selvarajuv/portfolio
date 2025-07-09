import { useState, useEffect } from "react";
import { getExperienceFromNotion, type ExperienceItem } from "@/lib/experience";

export function useExperience() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperienceFromNotion();
        setExperience(data);
      } catch (err) {
        console.error("Failed to fetch experience:", err);
        setError("Failed to load experience data");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
}
