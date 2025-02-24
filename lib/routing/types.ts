export type Locale = "en" | "fr" | "de" | "es";

export interface LocalizedRoute {
  path: string;
  title: string;
  description?: string;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export interface RouteConfig {
  standard: string;
  localized: Record<Locale, LocalizedRoute>;
  defaultTitle?: string;
  defaultDescription?: string;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export interface RoutingConfig {
  routes: Record<string, RouteConfig>;
  defaultLocale: Locale;
  locales: Locale[];
  baseUrl: string;
}
