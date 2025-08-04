// scripts/download-notion.ts

import fs from "fs";
import path from "path";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Ensure directories exist
const IMAGES_DIR = path.join(process.cwd(), "public", "notion-images");
const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string): Promise<string> {
  try {
    console.log(`  Downloading ${filename}...`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const filePath = path.join(IMAGES_DIR, filename);

    fs.writeFileSync(filePath, Buffer.from(buffer));

    return `/notion-images/${filename}`;
  } catch (error) {
    console.error(`  ❌ Error downloading ${filename}:`, error);
    return "";
  }
}

async function downloadSkills() {
  console.log("📥 Downloading skills...\n");

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SKILL_DATABASE_ID!,
      sorts: [
        {
          property: "ID",
          direction: "ascending",
        },
      ],
    });

    const skills = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;
        const pageId = page.id;
        const name = props.Name?.rich_text?.[0]?.plain_text || "";

        let iconPath = "";

        const iconFiles = props.Icon?.files;
        if (iconFiles && iconFiles.length > 0) {
          const file = iconFiles[0];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".svg";
            const safeFileName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
            const filename = `skill-${safeFileName}${extension}`;

            iconPath = await downloadImage(originalUrl, filename);
          }
        }

        return {
          id: props.ID?.title?.[0]?.plain_text || "",
          name,
          iconPath,
          color: props.Color?.rich_text?.[0]?.plain_text || "#000000",
        };
      })
    );

    const dataPath = path.join(DATA_DIR, "skills.json");
    fs.writeFileSync(dataPath, JSON.stringify(skills, null, 2));
    console.log(`✅ Downloaded ${skills.length} skills\n`);
  } catch (error) {
    console.error("❌ Error downloading skills:", error);
    throw error;
  }
}

async function downloadMisc() {
  console.log("📥 Downloading hero/misc data...\n");

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_MISC_DATABASE_ID!,
    });

    const misc = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;
        const pageId = page.id;

        let heroImage = "";
        let resume = "";

        // Download hero image
        const heroImageFiles = props["Hero Image"]?.files;
        if (heroImageFiles && heroImageFiles.length > 0) {
          const file = heroImageFiles[0];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".jpg";
            const filename = `hero-image${extension}`;

            heroImage = await downloadImage(originalUrl, filename);
          }
        }

        // Download resume
        const resumeFiles = props["Resume"]?.files;
        if (resumeFiles && resumeFiles.length > 0) {
          const file = resumeFiles[0];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".pdf";
            const filename = `resume${extension}`;

            resume = await downloadImage(originalUrl, filename);
          }
        }

        return {
          id: props.ID?.title?.[0]?.plain_text || "",
          typewriterTitles:
            props["Typewriter Titles"]?.rich_text?.[0]?.plain_text
              ?.split("\n")
              .filter((t: string) => t.trim()) || [],
          heroDescription:
            props["Hero Description"]?.rich_text?.[0]?.plain_text || "",
          heroImage,
          workDescription:
            props["Work Description"]?.rich_text?.[0]?.plain_text || "",
          githubLink: props["Github Link"]?.url || "",
          linkedinLink: props["LinkedIn Link"]?.url || "",
          resume,
        };
      })
    );

    const dataPath = path.join(DATA_DIR, "misc.json");
    fs.writeFileSync(dataPath, JSON.stringify(misc, null, 2));
    console.log(`✅ Downloaded misc/hero data\n`);
  } catch (error) {
    console.error("❌ Error downloading misc data:", error);
    throw error;
  }
}

async function downloadExperience() {
  console.log("📥 Downloading experience data...\n");

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_EXPERIENCE_DATABASE_ID!,
      sorts: [
        {
          property: "ID",
          direction: "descending",
        },
      ],
    });

    const experiences = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;
        const pageId = page.id;
        const company = props.Company?.rich_text?.[0]?.plain_text || "";

        let logo = "";

        const logoFiles = props.Logo?.files;
        if (logoFiles && logoFiles.length > 0) {
          const file = logoFiles[0];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".png";
            const safeFileName = company
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "-");
            const filename = `company-${safeFileName}${extension}`;

            logo = await downloadImage(originalUrl, filename);
          }
        }

        return {
          id: props.ID?.title?.[0]?.plain_text || "",
          title: props.Title?.rich_text?.[0]?.plain_text || "",
          company,
          period: props.Period?.rich_text?.[0]?.plain_text || "",
          location: props.Location?.rich_text?.[0]?.plain_text || "",
          website: props.Website?.url || "",
          description: props.Description?.rich_text?.[0]?.plain_text || "",
          technologies:
            props.Technologies?.multi_select?.map((tech: any) => tech.name) ||
            [],
          logo,
        };
      })
    );

    const dataPath = path.join(DATA_DIR, "experience.json");
    fs.writeFileSync(dataPath, JSON.stringify(experiences, null, 2));
    console.log(`✅ Downloaded ${experiences.length} experiences\n`);
  } catch (error) {
    console.error("❌ Error downloading experience data:", error);
    throw error;
  }
}

async function downloadProjects() {
  console.log("📥 Downloading projects data...\n");

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECT_DATABASE_ID!,
      sorts: [
        {
          property: "ID",
          direction: "descending",
        },
      ],
    });

    const projects = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;
        const pageId = page.id;
        const title = props.Title?.rich_text?.[0]?.plain_text || "";

        // Download technology icons
        const technologies: string[] = [];
        const techFiles = props.Technologies?.files || [];
        for (let i = 0; i < techFiles.length; i++) {
          const file = techFiles[i];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".svg";
            const filename = `tech-${pageId}-${i}${extension}`;
            const localPath = await downloadImage(originalUrl, filename);
            if (localPath) technologies.push(localPath);
          }
        }

        // Download project images
        const images: string[] = [];
        const imageFiles = props.Images?.files || [];
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const originalUrl =
            file.type === "file" ? file.file.url : file.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".jpg";
            const filename = `project-${pageId}-${i}${extension}`;
            const localPath = await downloadImage(originalUrl, filename);
            if (localPath) images.push(localPath);
          }
        }

        // Download card image
        let cardImage = "";
        const cardImageFile = props["Card Image"]?.files?.[0];
        if (cardImageFile) {
          const originalUrl =
            cardImageFile.type === "file"
              ? cardImageFile.file.url
              : cardImageFile.external?.url;

          if (originalUrl) {
            const extension =
              path.extname(new URL(originalUrl).pathname) || ".jpg";
            const safeFileName = title.toLowerCase().replace(/[^a-z0-9]/g, "-");
            const filename = `card-${safeFileName}${extension}`;
            cardImage = await downloadImage(originalUrl, filename);
          }
        }

        return {
          id: props.ID?.title?.[0]?.plain_text || "",
          title,
          category: props.Category?.rich_text?.[0]?.plain_text || "",
          description: props.Description?.rich_text?.[0]?.plain_text || "",
          duration: props.Duration?.rich_text?.[0]?.plain_text || "",
          client: props.Client?.rich_text?.[0]?.plain_text || "",
          year: props.Year?.rich_text?.[0]?.plain_text || "",
          technologies,
          technologyNames:
            props["Technology Names"]?.rich_text?.[0]?.plain_text
              ?.split("\n")
              .filter((item: string) => item.trim()) || [],
          images,
          projectLink: props["Project Link"]?.url || "",
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
          hoverContent:
            props["Hover Content"]?.rich_text?.[0]?.plain_text || "",
          cardImage,
          featured: props.Featured?.select?.name === "True",
          large: props.Large?.select?.name === "True",
        };
      })
    );

    const dataPath = path.join(DATA_DIR, "projects.json");
    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
    console.log(`✅ Downloaded ${projects.length} projects\n`);
  } catch (error) {
    console.error("❌ Error downloading projects data:", error);
    throw error;
  }
}

// Run all downloads
async function main() {
  console.log("🚀 Starting Notion data download...\n");

  try {
    await Promise.all([
      downloadSkills(),
      downloadMisc(),
      downloadExperience(),
      downloadProjects(),
    ]);

    console.log("✨ All data downloaded successfully!");
  } catch (error) {
    console.error("💥 Download failed:", error);
    process.exit(1);
  }
}

main();
