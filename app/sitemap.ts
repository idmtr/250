import { getPosts } from "@/lib/blog";
import { i18n } from "@/i18n-config";
import { MetadataRoute } from "next";
import { routes, getLocalizedPath } from "@/lib/url-utils";

// Define static routes that exist in all languages
const staticRoutes = Object.entries(routes).map(([standard, config]) => ({
  path: standard,
  priority: standard === "" ? 1 : 0.7,
  changeFrequency: "monthly" as const,
  localizedPaths: config.localized,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate routes for static pages
  i18n.locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      // Skip tag routes
      if (route.path.startsWith("blog/tag/")) return;

      const localizedPath = route.localizedPaths[locale].path;
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${localizedPath ? `/${localizedPath}` : ""}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  // Add blog posts
  const allPosts = await Promise.all(
    i18n.locales.map(async (locale) => {
      const posts = await getPosts(locale);
      return posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.modified || post.date).toISOString(),
        changeFrequency: "weekly" as const,
        priority: post.featured ? 1 : 0.7,
      }));
    })
  );

  return [...sitemapEntries, ...allPosts.flat()];
}
