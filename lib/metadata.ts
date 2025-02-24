import type { Metadata } from "next";
import { i18n } from "@/i18n-config";
import { getBaseUrl } from "./url";
import { headers } from "next/headers";
import {
  routes,
  getStandardPath,
  getFullPath,
  getLocalizedPath,
} from "./routes";
import type { Locale } from "@/i18n-config";

interface PageMetadataProps {
  lang: Locale;
  path?: string;
  title: string;
  description: string;
}

export async function generatePageMetadata({
  lang,
  path = "",
  title,
  description,
}: PageMetadataProps): Promise<Metadata> {
  try {
    const baseUrl = getBaseUrl();
    const headersList = await headers();
    const canonicalUrl = headersList.get("x-canonical-url");
    const cleanPath = path.replace(/^\/+|\/+$/g, "");

    let alternateLanguages: Record<string, string> = {};

    if (!cleanPath) {
      // Handle root/home page
      i18n.locales.forEach((locale) => {
        alternateLanguages[locale] = `${baseUrl}/${locale}`;
      });
    } else {
      // Find route by current localized path
      const route = Object.values(routes).find(
        (r) => r.localized[lang].path === cleanPath
      );

      if (route?.localized) {
        i18n.locales.forEach((locale) => {
          const localizedPath = route.localized[locale].path;
          alternateLanguages[locale] = `${baseUrl}/${locale}/${localizedPath}`;
        });
      } else {
        // Fallback for dynamic routes (blog, tags, etc)
        i18n.locales.forEach((locale) => {
          alternateLanguages[locale] = `${baseUrl}/${locale}/${cleanPath}`;
        });
      }
    }

    // Determine canonical URL
    const canonical = canonicalUrl
      ? `${baseUrl}${canonicalUrl}`
      : alternateLanguages[lang];

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: Object.fromEntries(
          Object.entries(alternateLanguages).filter(
            ([locale]) => locale !== lang
          )
        ),
      },
    };
  } catch (error) {
    console.error("[generatePageMetadata] Error:", error);
    return { title, description };
  }
}
