import { Locale } from "@/i18n-config";
import { routes } from "@/config/url-config";

export type LocalizedRouteConfig = {
  standard: string;
  localized: {
    [key in Locale]: {
      path: string;
      title: string;
      canonicalPath?: string;
    };
  };
};

export const routes: Record<string, LocalizedRouteConfig> = {
  home: {
    standard: "",
    localized: {
      en: {
        path: "",
        canonicalPath: "/en",
        title: "Home",
      },
      fr: {
        path: "",
        canonicalPath: "/fr/",
        title: "Accueil",
      },
      de: {
        path: "",
        canonicalPath: "/de/",
        title: "Startseite",
      },
      es: {
        path: "",
        canonicalPath: "/es/",
        title: "Inicio",
      },
    },
  },
  mission: {
    standard: "mission",
    localized: {
      en: {
        path: "our-mission",
        title: "Our Mission",
        canonicalPath: "/en/our-mission",
      },
      fr: {
        path: "notre-mission",
        title: "Notre Mission",
        canonicalPath: "/fr/notre-mission",
      },
      de: {
        path: "unsere-mission",
        title: "Unsere Mission",
        canonicalPath: "/de/unsere-mission",
      },
      es: {
        path: "nuestra-mision",
        title: "Nuestra Misión",
        canonicalPath: "/es/nuestra-mision",
      },
    },
  },
  workshops: {
    standard: "workshops",
    localized: {
      en: { path: "workshops", title: "Workshops" },
      fr: { path: "ateliers", title: "Ateliers" },
      de: { path: "workshops", title: "Workshops" },
      es: { path: "talleres", title: "Talleres" },
    },
  },
  education: {
    standard: "education",
    localized: {
      en: {
        path: "coworking-education",
        title: "Coworking Education",
        canonicalPath: "/en/coworking-education",
      },
      fr: {
        path: "formation-coworking",
        title: "Formation Coworking",
        canonicalPath: "/fr/formation-coworking",
      },
      de: {
        path: "coworking-ausbildung",
        title: "Coworking Ausbildung",
        canonicalPath: "/de/coworking-ausbildung",
      },
      es: {
        path: "educacion-coworking",
        title: "Educación Coworking",
        canonicalPath: "/es/educacion-coworking",
      },
    },
  },
  "speaking-events": {
    standard: "speaking-events",
    localized: {
      en: { path: "speaking-events", title: "Speaking Events" },
      fr: { path: "conferences", title: "Conférences" },
      de: { path: "vortraege", title: "Vorträge" },
      es: { path: "conferencias", title: "Conferencias" },
    },
  },
  "get-feedback": {
    standard: "get-feedback",
    localized: {
      en: { path: "get-feedback", title: "Get Feedback" },
      fr: { path: "obtenir-conseil", title: "Obtenir Conseil" },
      de: { path: "feedback-erhalten", title: "Feedback Erhalten" },
      es: { path: "obtener-feedback", title: "Obtener Feedback" },
    },
  },
  retreats: {
    standard: "retreats",
    localized: {
      en: { path: "community-retreats", title: "Coworking Community Retreats" },
      fr: {
        path: "retraites-communautaires",
        title: "Retraites Communautaires",
      },
      de: { path: "community-retreats", title: "Coworking Community Retreats" },
      es: { path: "retiros-comunitarios", title: "Retiros Comunitarios" },
    },
  },
  blog: {
    standard: "blog",
    localized: {
      en: { path: "blog", title: "Blog" },
      fr: { path: "blog", title: "Blog" },
      de: { path: "blog", title: "Blog" },
      es: { path: "blog", title: "Blog" },
    },
  },
  about: {
    standard: "about",
    localized: {
      en: { path: "about", title: "About Us" },
      fr: { path: "a-propos", title: "À Propos" },
      de: { path: "ueber-uns", title: "Über Uns" },
      es: { path: "sobre-nosotros", title: "Sobre Nosotros" },
    },
  },
  contact: {
    standard: "contact",
    localized: {
      en: { path: "contact", title: "Contact" },
      fr: { path: "contactez-nous", title: "Contactez-nous" },
      de: { path: "kontakt", title: "Kontakt" },
      es: { path: "contacto", title: "Contacto" },
    },
  },
};

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");

  if (cleanPath.startsWith("blog/tag/")) {
    return `blog/tag/${encodeURIComponent(cleanPath.replace("blog/tag/", ""))}`;
  }

  if (!cleanPath) {
    return routes.home.localized[locale].path;
  }

  const route = routes[cleanPath];
  if (route) {
    return route.localized[locale].path;
  }

  return cleanPath;
}

export function getStandardPath(localizedPath: string, locale: Locale): string {
  if (!localizedPath) return "";

  const cleanPath = localizedPath.replace(/^\/+|\/+$/g, "");

  if (cleanPath.startsWith("blog/tag/")) {
    return cleanPath;
  }

  for (const [standard, config] of Object.entries(routes)) {
    if (config.localized[locale].path === cleanPath) {
      return standard;
    }
  }

  return cleanPath;
}

export function getCanonicalUrl(
  path: string,
  locale: Locale,
  baseUrl: string
): string {
  const standardPath = getStandardPath(path, locale);
  const route = routes[standardPath];

  if (!route?.localized[locale]) {
    return `${baseUrl}/${locale}/${path}`;
  }

  const canonicalPath =
    route.localized[locale].canonicalPath ||
    `/${locale}/${route.localized[locale].path}`;
  return `${baseUrl}${canonicalPath}`;
}

export function translatePath(
  path: string,
  fromLocale: Locale,
  toLocale: Locale
): string {
  const standardPath = getStandardPath(path, fromLocale);
  return getLocalizedPath(standardPath, toLocale);
}

export function getAllLocalizedPaths(path: string): Record<Locale, string> {
  const standardPath = path ? path : "";
  const route = Object.entries(routes).find(
    ([_, config]) => config.standard === standardPath
  );

  if (!route) {
    return {} as Record<Locale, string>;
  }

  return Object.entries(route[1].localized).reduce((acc, [locale, config]) => {
    acc[locale as Locale] = config.path;
    return acc;
  }, {} as Record<Locale, string>);
}

export function getNavigationItems(locale: Locale): NavigationItem[] {
  return Object.entries(routes)
    .filter(([key]) => key !== "home") // Exclude home from nav
    .map(([key, config]) => ({
      key,
      href: `/${locale}/${config.localized[locale].path}`,
      title: config.localized[locale].title || key,
    }));
}

export function translateUrl(
  currentUrl: string,
  fromLocale: Locale,
  toLocale: Locale
): string {
  const pathParts = currentUrl.split("/").filter(Boolean);
  const currentPath = pathParts.slice(1).join("/");

  if (!currentPath) {
    return `/${toLocale}/${routes.home.localized[toLocale].path}`;
  }

  const translatedPath = translatePath(currentPath, fromLocale, toLocale);
  return `/${toLocale}/${translatedPath}`;
}

export { routes as routeConfig };

// Example usage:
// const fromPath = "formation-coworking"; // French path
// const translatedPath = translatePath(fromPath, "fr", "de");
// console.log(translatedPath); // Output: "coworking-ausbildung"

// Get all translations for a path
const allPaths = getAllLocalizedPaths("education");
// console.log(allPaths);
/* Output:
{
  en: "coworking-education",
  fr: "formation-coworking",
  de: "coworking-ausbildung",
  es: "educacion-coworking"
}
*/

// Get canonical URL
// const canonicalUrl = getCanonicalUrl(
//   "formation-coworking",
//   "fr",
//   "https://twofifty.co"
// );
// console.log(canonicalUrl);
