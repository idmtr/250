import type { Metadata, MetadataRoute } from "next";
import type { Locale } from "@/i18n-config";
import type { RoutingConfig } from "@/lib/routing/types";

declare global {
  type NextMetadata = Metadata;
  type NextMetadataRoute = MetadataRoute;
  type SiteLocale = Locale;
  type SiteRoutingConfig = RoutingConfig;
}
