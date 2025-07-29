//lib/misc.ts

import { MiscItem } from "@/types/misc";

export async function getMiscFromNotion(): Promise<MiscItem[]> {
  const response = await fetch("/api/misc");

  if (!response.ok) {
    throw new Error("Failed to fetch misc data");
  }

  return response.json();
}
