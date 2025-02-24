import { getPosts } from "@/lib/blog";
import { i18n } from "@/i18n-config";
import { routes } from "@/lib/url-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";
  const staticRoutes = Object.entries(routes).map(([standard, config]) => ({
    path: standard,
    priority: standard === "" ? 1 : 0.7,
    changeFrequency: "monthly" as const,
    localizedPaths: config.localized,
  }));

  // Generate XML string
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  i18n.locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      if (route.path.startsWith("blog/tag/")) return;

      const localizedPath = route.localizedPaths[locale].path;
      xml += `
  <url>
    <loc>${baseUrl}/${locale}${localizedPath ? `/${localizedPath}` : ""}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });
  });

  // Add blog posts
  const allPosts = await Promise.all(
    i18n.locales.map(async (locale) => {
      const posts = await getPosts(locale);
      return posts
        .map(
          (post) => `
  <url>
    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${post.featured ? "1.0" : "0.7"}</priority>
  </url>`
        )
        .join("");
    })
  );

  xml += allPosts.join("");
  xml += "\n</urlset>";

  // Return XML with correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
