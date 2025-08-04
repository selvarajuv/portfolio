// hooks/use-misc.ts

import { useState, useEffect } from "react";
import { MiscItem } from "@/types/misc";
import { getMiscFromNotion } from "@/lib/misc";

export function useMisc() {
  const [miscs, setMiscs] = useState<MiscItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMisc = async () => {
      try {
        const data = await getMiscFromNotion();
        setMiscs(data);
      } catch (err) {
        console.error("Failed to load misc data:", err);
        setError("Failed to load misc data");
      } finally {
        setLoading(false);
      }
    };

    loadMisc();
  }, []);

  return { miscs, loading, error };
}
