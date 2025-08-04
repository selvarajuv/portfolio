// lib/misc.ts

import { MiscItem } from "@/types/misc";

let miscData: MiscItem[] = [];

try {
  miscData = require("@/data/misc.json");
} catch (error) {
  console.warn("Misc data not found. Run npm run download-images first.");
}

export async function getMiscFromNotion(): Promise<MiscItem[]> {
  return miscData;
}
