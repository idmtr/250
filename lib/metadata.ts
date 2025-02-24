import { Metadata } from "next";
import { getBaseUrl } from "@/lib/url";
import { routes, getStandardPath } from "@/lib/url-utils";
import type { Locale } from "@/i18n-config";

interface GeneratePageMetadataProps {
  path: string;
  lang: Locale;
}

const defaultMetadata = {
  title: "TwoFifty",
  description: "Transform your workspace with TwoFifty's global coworking expertise. We teach, advise, and build understanding about coworking for organizations worldwide."
};

export function generatePageMetadata({ path, lang }: GeneratePageMetadataProps): Metadata {
  const baseUrl = getBaseUrl();
  const standardPath = getStandardPath(path, lang);
  const route = routes[standardPath];

  // Get localized metadata from routes configuration
  const localizedData = route?.localized[lang] || defaultMetadata;

  // Get canonical path from route config or fallback to localized path
  const canonicalPath = localizedData.canonicalPath || 
    (localizedData.path ? `/${lang}/${localizedData.path}` : `/${lang}`);

  // Generate alternate URLs
  const languages = Object.entries(route?.localized || {}).reduce((acc, [locale, data]) => {
    acc[locale] = `${baseUrl}/${locale}${data.path ? `/${data.path}` : ""}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: localizedData.title,
    description: localizedData.description,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`, // Use the canonical path from route config
      languages,
    },
    openGraph: {
      title: localizedData.title,
      description: localizedData.description,
      url: `${baseUrl}${canonicalPath}`, // Also use canonical path here
      siteName: 'TwoFifty Consulting',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedData.title,
      description: localizedData.description,
    },
  };
}
