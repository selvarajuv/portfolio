// app/api/project/route.ts

import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECT_DATABASE_ID!,
    });

    const projects = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: props.ID?.title?.[0]?.plain_text || "",
        title: props.Title?.rich_text?.[0]?.plain_text || "",
        category: props.Category?.rich_text?.[0]?.plain_text || "",
        description: props.Description?.rich_text?.[0]?.plain_text || "",
        duration: props.Duration?.rich_text?.[0]?.plain_text || "",
        client: props.Client?.rich_text?.[0]?.plain_text || "",
        year: props.Year?.rich_text?.[0]?.plain_text || "",
        technologies:
          props.Technologies?.files?.map(
            (file: any) => file.file?.url || file.external?.url || ""
          ) || [],
        technologyNames:
          props["Technology Names"]?.rich_text?.[0]?.plain_text
            ?.split("\n")
            .filter((item: string) => item.trim()) || [],
        images:
          props.Images?.files?.map(
            (file: any) => file.file?.url || file.external?.url || ""
          ) || [],
        projectLink: props["Project Link"].url || "",
        challenges:
          props.Challenges?.rich_text?.[0]?.plain_text
            ?.split("\n")
            .filter((item: string) => item.trim()) || [],
        outcomes:
          props.Outcomes?.rich_text?.[0]?.plain_text
            ?.split("\n")
            .filter((item: string) => item.trim()) || [],
        topContent: props["Top Content"]?.rich_text?.[0]?.plain_text || "",
        bottomContent:
          props["Bottom Content"]?.rich_text?.[0]?.plain_text || "",
        hoverContent: props["Hover Content"]?.rich_text?.[0]?.plain_text || "",
        cardImage: props["Card Image"]?.files?.[0]?.file?.url || "",
        featured: props.Featured?.select?.name === "True",
        large: props.Large?.select?.name === "True",
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
