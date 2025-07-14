// app/api/skill/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SKILL_DATABASE_ID!,
    });

    const skills = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: props.ID?.title?.[0]?.plain_text || "",
        name: props.Name?.rich_text?.[0]?.plain_text || "",
        iconPath: props.Icon?.files?.[0]?.file?.url || "",
        color: props.Color?.rich_text?.[0]?.plain_text || "#000000",
      };
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
