import { getPosts } from "@/lib/blog";
import { i18n } from "@/i18n-config";
import { routes } from "@/lib/url-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  for (const locale of i18n.locales) {
    for (const [_, config] of Object.entries(routes)) {
      if (config.localized[locale].path.startsWith("blog/tag/")) continue;

      xml += `
  <url>
    <loc>${baseUrl}/${locale}/${config.localized[locale].path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  // Add blog posts
  for (const locale of i18n.locales) {
    const posts = await getPosts(locale);
    for (const post of posts) {
      xml += `
  <url>
    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${post.featured ? "1.0" : "0.7"}</priority>
  </url>`;
    }
  }

  xml += "\n</urlset>";

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
