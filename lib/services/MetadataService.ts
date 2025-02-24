import { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { routes } from "@/lib/url-utils";
import { headers } from "next/headers";
import { getBaseUrl } from "@/lib/url";

export class MetadataService {
  private static baseUrl = getBaseUrl();

  static async generateMetadata({
    currentPath,
    locale,
    title,
    description,
  }: {
    currentPath: string;
    locale: Locale;
    title: string;
    description: string;
  }): Promise<Metadata> {
    const headersList = await headers();
    const canonicalUrl = headersList.get("x-canonical-url");

    const { canonical, alternates } = this.generateUrls(
      currentPath,
      locale,
      canonicalUrl
    );

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: alternates,
      },
    };
  }

  private static generateUrls(
    currentPath: string,
    currentLocale: Locale,
    canonicalUrl: string | null
  ) {
    // Clean the path
    const cleanPath = currentPath.replace(/^\/+|\/+$/g, "");

    // Handle special cases (blog posts, tags, etc.)
    if (cleanPath.startsWith("blog/")) {
      return this.generateBlogUrls(cleanPath, currentLocale);
    }

    // Handle standard routes
    return this.generateStandardUrls(cleanPath, currentLocale, canonicalUrl);
  }

  private static generateStandardUrls(
    path: string,
    currentLocale: Locale,
    canonicalUrl: string | null
  ) {
    const route = Object.entries(routes).find(
      ([_, config]) => config.localized[currentLocale].path === path
    );

    if (!route) {
      return this.generateFallbackUrls(path, currentLocale);
    }

    const [_, config] = route;
    const canonical = canonicalUrl
      ? `${this.baseUrl}${canonicalUrl}`
      : `${this.baseUrl}${
          config.localized[currentLocale].canonicalPath ||
          `/${currentLocale}/${config.localized[currentLocale].path}`
        }`;

    const alternates = Object.entries(config.localized)
      .filter(([locale]) => locale !== currentLocale)
      .reduce((acc, [locale, localeConfig]) => {
        acc[locale] = `${this.baseUrl}${
          localeConfig.canonicalPath || `/${locale}/${localeConfig.path}`
        }`;
        return acc;
      }, {} as Record<string, string>);

    return { canonical, alternates };
  }

  private static generateBlogUrls(path: string, currentLocale: Locale) {
    const canonical = `${this.baseUrl}/${currentLocale}/${path}`;

    const alternates = i18n.locales
      .filter((locale) => locale !== currentLocale)
      .reduce((acc, locale) => {
        acc[locale] = `${this.baseUrl}/${locale}/${path}`;
        return acc;
      }, {} as Record<string, string>);

    return { canonical, alternates };
  }

  private static generateFallbackUrls(path: string, currentLocale: Locale) {
    const canonical = `${this.baseUrl}/${currentLocale}/${path}`;

    const alternates = i18n.locales
      .filter((locale) => locale !== currentLocale)
      .reduce((acc, locale) => {
        acc[locale] = `${this.baseUrl}/${locale}/${path}`;
        return acc;
      }, {} as Record<string, string>);

    return { canonical, alternates };
  }
}
