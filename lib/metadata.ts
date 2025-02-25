import { Metadata } from "next";
import { getBaseUrl } from "@/lib/url";
import { routes, getStandardPath } from "@/lib/url-utils";
import type { Locale } from "@/i18n-config";

interface GeneratePageMetadataProps {
  path: string;
  lang: Locale;
  options?: {
    openGraph?: {
      images?: string[];
    };
    twitter?: {
      images?: string[];
    };
  };
}

// Add the default image URL as a constant
const DEFAULT_IMAGE_URL =
  "https://res.cloudinary.com/ddqw1uuhd/image/upload/v1740302489/images/pages/contact-us-space_h1ey90.webp";

export function generatePageMetadata({
  path,
  lang,
  options,
}: GeneratePageMetadataProps): Metadata {
  const baseUrl = getBaseUrl();
  let route;
  let localizedData;
  let canonicalPath;
  let languages: Record<string, string> = {};

  // Handle home page vs other pages
  if (path === "") {
    // Home page logic
    route = routes.home;

    if (!route || !route.localized || !route.localized[lang]) {
      throw new Error(
        `No home route configuration found for language: ${lang}`
      );
    }

    localizedData = route.localized[lang];
    canonicalPath = localizedData.canonicalPath || `/${lang}`;

    // Generate alternate URLs for the home page
    languages = Object.entries(route.localized).reduce(
      (acc, [locale, data]) => {
        if (data && typeof data === "object") {
          const path = data.canonicalPath || `/${locale}`;
          acc[locale] = `${baseUrl}${path}`;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  } else {
    // Other pages logic
    const standardPath = getStandardPath(path, lang);
    route = routes[standardPath];

    if (!route || !route.localized || !route.localized[lang]) {
      throw new Error(
        `No route configuration found for path: ${path} in language: ${lang}`
      );
    }

    localizedData = route.localized[lang];
    canonicalPath =
      localizedData.canonicalPath ||
      (localizedData.path ? `/${lang}/${localizedData.path}` : `/${lang}`);

    // Generate alternate URLs
    languages = Object.entries(route.localized).reduce(
      (acc, [locale, data]) => {
        if (data && typeof data === "object") {
          acc[locale] = `${baseUrl}/${locale}${
            data.path ? `/${data.path}` : ""
          }`;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  }

  // Define ogImages - common for both paths
  const ogImages = options?.openGraph?.images ||
    route.ogimage || [DEFAULT_IMAGE_URL];

  // Return metadata - common structure for both paths
  return {
    title: localizedData.title,
    description: localizedData.description,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages,
    },
    openGraph: {
      title: localizedData.title,
      description: localizedData.description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: "TwoFifty Consulting",
      locale: lang,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: localizedData.title,
      description: localizedData.description,
      images: ogImages,
    },
  };
}
