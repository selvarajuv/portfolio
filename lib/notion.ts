import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const DATABASES = {
  EXPERIENCE: process.env.NOTION_EXPERIENCE_DATABASE_ID!,
  // We'll add PROJECTS and SKILLS later
};
