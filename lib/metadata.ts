import type { Metadata } from "next";
import { i18n } from "@/i18n-config";
import { getBaseUrl } from "./url";
import { headers } from "next/headers";
import { 
  routes, 
  getStandardPath, 
  getFullPath,
  getLocalizedPath 
} from "./routes";
import type { Locale } from "@/i18n-config";

interface PageMetadataProps {
  lang: string;
  path: string;
  title: string;
  description: string;
}

export function generatePageMetadata({
  lang,
  path,
  title,
  description,
}: PageMetadataProps): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        i18n.locales.map(locale => [locale, `/${locale}${path}`])
      ),
    },
  }
}
