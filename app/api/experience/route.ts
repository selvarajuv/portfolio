// app/api/experience/route.ts

import { NextResponse } from "next/server";
import { notion, DATABASES } from "@/lib/notion";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASES.EXPERIENCE,
      sorts: [
        {
          property: "ID",
          direction: "descending",
        },
      ],
    });

    const experience = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: props.ID?.title?.[0]?.plain_text || "",
        title: props.Title?.rich_text?.[0]?.plain_text || "",
        company: props.Company?.rich_text?.[0]?.plain_text || "",
        period: props.Period?.rich_text?.[0]?.plain_text || "",
        location: props.Location?.rich_text?.[0]?.plain_text || "",
        website: props.Website?.url || "",
        description: props.Description?.rich_text?.[0]?.plain_text || "",
        technologies:
          props.Technologies?.multi_select?.map((tech: any) => tech.name) || [],
        logo:
          props.Logo?.files?.[0]?.file?.url ||
          props.Logo?.files?.[0]?.external?.url ||
          "",
      };
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}
