import { NextResponse } from "next/server";

export async function GET() {
  const entries = await generateDynamicEntries();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
        ${entries
          .map(
            (entry) => `
                <url>
                    <loc>${entry.url}</loc>
                    <lastmod>${entry.lastModified.toISOString()}</lastmod>
                </url>
            `
          )
          .join("")}
    </urlset>`;

  return NextResponse.text(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

async function generateDynamicEntries() {
  return [
    { url: "/en/our-mission", lastModified: new Date() },
    { url: "/fr/notre-mission", lastModified: new Date() },
    // Add more entries as needed
  ];
}
