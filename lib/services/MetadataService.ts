import { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { routes } from "@/lib/url-utils";
import { getBaseUrl } from "@/lib/url";

export class MetadataService {
  private static baseUrl = getBaseUrl();

  static generateMetadata({
    currentPath,
    locale,
    title,
    description,
  }: {
    currentPath: string;
    locale: Locale;
    title: string;
    description: string;
  }): Metadata {
    const { canonical, alternates } = this.generateUrls(currentPath, locale);

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: alternates,
      },
    };
  }

  private static generateUrls(currentPath: string, locale: Locale) {
    const cleanPath = currentPath.replace(/^\/+|\/+$/g, "");
    let alternates: Record<string, string> = {};

    if (!cleanPath) {
      i18n.locales.forEach((loc) => {
        alternates[loc] = `${this.baseUrl}/${loc}`;
      });
    } else {
      const route = Object.values(routes).find(
        (r) => r.localized[locale].path === cleanPath
      );

      if (route?.localized) {
        i18n.locales.forEach((loc) => {
          const localizedPath = route.localized[loc].path;
          alternates[loc] = `${this.baseUrl}/${loc}/${localizedPath}`;
        });
      } else {
        i18n.locales.forEach((loc) => {
          alternates[loc] = `${this.baseUrl}/${loc}/${cleanPath}`;
        });
      }
    }

    const canonical = alternates[locale];

    // Remove the current locale from alternates
    const filteredAlternates = Object.fromEntries(
      Object.entries(alternates).filter(([loc]) => loc !== locale)
    );

    return { canonical, alternates: filteredAlternates };
  }
}
