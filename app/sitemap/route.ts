import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Your existing sitemap generation logic...

  return sitemapEntries;
}
