import { routingConfig } from "./config";
import type { Locale } from "./types";

export class RoutingService {
  private static baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";

  static getStandardPath(path: string, locale: Locale): string {
    for (const [standard, config] of Object.entries(routingConfig.routes)) {
      if (config.localized[locale].path === path) {
        return standard;
      }
    }
    return path;
  }

  static getLocalizedPath(standardPath: string, locale: Locale): string {
    const route = routingConfig.routes[standardPath];
    if (!route) return standardPath;
    return route.localized[locale].path;
  }

  static getCanonicalUrl(path: string, locale: Locale): string {
    const standardPath = this.getStandardPath(path, locale);
    const route = routingConfig.routes[standardPath];

    if (!route) {
      return `${this.baseUrl}/${locale}/${path}`;
    }

    const localizedPath = route.localized[locale].path;
    return `${this.baseUrl}/${locale}/${localizedPath}`;
  }

  static getAlternateUrls(
    path: string,
    currentLocale: Locale
  ): Record<string, string> {
    const standardPath = this.getStandardPath(path, currentLocale);
    const route = routingConfig.routes[standardPath];

    if (!route) {
      return Object.fromEntries(
        routingConfig.locales
          .filter((locale) => locale !== currentLocale)
          .map((locale) => [locale, `${this.baseUrl}/${locale}/${path}`])
      );
    }

    return Object.entries(route.localized)
      .filter(([locale]) => locale !== currentLocale)
      .reduce((acc, [locale, localeConfig]) => {
        acc[locale] = `${this.baseUrl}/${locale}/${localeConfig.path}`;
        return acc;
      }, {} as Record<string, string>);
  }

  static generateMetadata(path: string, locale: Locale) {
    const standardPath = this.getStandardPath(path, locale);
    const route = routingConfig.routes[standardPath];

    if (!route) {
      return {};
    }

    const localizedRoute = route.localized[locale];
    return {
      title: localizedRoute.title,
      description: localizedRoute.description,
      alternates: {
        canonical: this.getCanonicalUrl(path, locale),
        languages: this.getAlternateUrls(path, locale),
      },
    };
  }

  static getSitemapEntries() {
    const entries = [];

    for (const [standardPath, route] of Object.entries(routingConfig.routes)) {
      for (const locale of routingConfig.locales) {
        const localizedPath = route.localized[locale].path;
        const url = this.getCanonicalUrl(standardPath, locale);

        entries.push({
          url,
          changeFrequency: route.changeFrequency || "weekly",
          priority: route.priority || 0.7,
          alternates: this.getAlternateUrls(standardPath, locale),
        });
      }
    }

    return entries;
  }
}
