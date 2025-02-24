import { getPosts } from "@/lib/blog";
import { i18n } from "@/i18n-config";
import { MetadataRoute } from "next";
import { routes, getLocalizedPath } from "@/lib/url-utils";
import { RoutingService } from "@/lib/routing/utils";

// Define static routes that exist in all languages
const staticRoutes = Object.entries(routes).map(([standard, config]) => ({
  path: standard,
  priority: standard === "" ? 1 : 0.7,
  changeFrequency: "monthly" as const,
  localizedPaths: config.localized,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = RoutingService.getSitemapEntries();
  const dynamicEntries = await generateDynamicEntries(); // For blog posts etc.

  return [...staticEntries, ...dynamicEntries];
}
