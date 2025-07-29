// app/api/misc/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_MISC_DATABASE_ID!,
    });

    const misc = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: props.ID?.title?.[0]?.plain_text || "",
        typewriterTitles:
          props["Typewriter Titles"]?.rich_text?.[0]?.plain_text
            ?.split("\n")
            .filter((t: string) => t.trim()) || [],
        heroDescription:
          props["Hero Description"]?.rich_text?.[0]?.plain_text || "",
        heroImage:
          props["Hero Image"]?.files?.[0]?.file?.url ||
          props["Hero Image"]?.files?.[0]?.external?.url ||
          "",
        workDescription:
          props["Work Description"]?.rich_text?.[0]?.plain_text || "",
        githubLink: props["Github Link"]?.url || "",
        linkedinLink: props["LinkedIn Link"]?.url || "",
        resume:
          props["Resume"]?.files?.[0]?.file?.url ||
          props["Resume"]?.files?.[0]?.external?.url ||
          "",
      };
    });

    return NextResponse.json(misc);
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
