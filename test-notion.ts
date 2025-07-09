import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN, // Note: using NOTION_TOKEN, not NOTION_API_KEY
});

async function test() {
  const databaseId = process.env.NOTION_EXPERIENCE_DATABASE_ID!;

  console.log("=== Testing Notion SDK ===");
  console.log("Token exists:", !!process.env.NOTION_TOKEN);
  console.log("Database ID:", databaseId);

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log("✅ Success!");
    console.log("Found", response.results.length, "items");

    if (response.results.length > 0) {
      console.log("\n=== First Item Properties ===");
      const firstItem = response.results[0] as any;
      console.log("ID:", firstItem.id);
      console.log("Properties:", Object.keys(firstItem.properties));

      // Show actual property values
      const props = firstItem.properties;
      Object.keys(props).forEach((key) => {
        const prop = props[key];
        console.log(`${key}:`, prop.type, prop[prop.type]);
      });
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();
