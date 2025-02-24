import { Metadata } from "next";
import { i18n } from "@/i18n-config";
import { routes } from "@/lib/url-utils";
import { getBaseUrl } from "@/lib/url";

export interface PageMetadataProps {
  lang: string;
  path?: string;
  title: string;
  description: string;
}

export function generatePageMetadata({
  lang,
  path = "",
  title,
  description,
}: PageMetadataProps): Metadata {
  const baseUrl = getBaseUrl();
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
  const canonical = alternateLanguages[lang];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        Object.entries(alternateLanguages).filter(([locale]) => locale !== lang)
      ),
    },
  };
}
