// hooks/use-misc.ts

import { useState, useEffect } from "react";
import { MiscItem } from "@/types/misc";
import { getMiscFromNotion } from "@/lib/misc";

export function useMisc() {
  const [miscs, setMiscs] = useState<MiscItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMiscFromNotion();
        setMiscs(data);
      } catch (err) {
        console.error("Failed to load misc:", err);
        setError("Failed to load misc data");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return { miscs, loading, error };
}
