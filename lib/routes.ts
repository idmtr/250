import { Locale } from "@/i18n-config";

export type LocalizedRouteConfig = {
  standard: string;
  localized: {
    [key in Locale]: {
      path: string;
      title: string;
    };
  };
};

export const routes: Record<string, LocalizedRouteConfig> = {
  home: {
    standard: "",
    localized: {
      en: {
        path: "",
        title: "Home",
      },
      fr: {
        path: "",
        title: "Accueil",
      },
      de: {
        path: "",
        title: "Startseite",
      },
      es: {
        path: "",
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
      },
      fr: {
        path: "notre-mission",
        title: "Notre Mission",
      },
      de: {
        path: "unsere-mission",
        title: "Unsere Mission",
      },
      es: {
        path: "nuestra-mision",
        title: "Nuestra Misión",
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
      },
      fr: {
        path: "formation-coworking",
        title: "Formation Coworking",
      },
      de: {
        path: "coworking-ausbildung",
        title: "Coworking Ausbildung",
      },
      es: {
        path: "educacion-coworking",
        title: "Educación Coworking",
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
      de: { path: "community-retreats", title: "Community Retreats" },
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
  "coworking-consulting": {
    standard: "coworking-consulting",
    localized: {
      en: {
        path: "coworking-consulting-services",
        title: "Expert Coworking Consulting Services",
      },
      fr: {
        path: "services-conseil-coworking",
        title: "Services de Conseil en Coworking",
      },
      de: {
        path: "coworking-beratung",
        title: "Coworking-Beratung",
      },
      es: {
        path: "servicios-consultoria-coworking",
        title: "Servicios de Consultoría Coworking",
      },
    },
  },
};

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");

  if (cleanPath.startsWith("blog/tag/")) {
    const tagPart = cleanPath.replace("blog/tag/", "");
    // Keep the tag exactly as is, since it's already normalized
    return `blog/tag/${tagPart}`;
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
  console.log("getStandardPath Debug:", {
    localizedPath,
    locale,
    routes: Object.keys(routes),
  });

  if (!localizedPath) return "";

  const cleanPath = localizedPath.replace(/^\/+|\/+$/g, "");

  // Direct match with standard path
  if (routes[cleanPath]) {
    console.log("Found direct match:", cleanPath);
    return cleanPath;
  }

  // Match by localized path
  const routeEntry = Object.entries(routes).find(
    ([_, config]) => config.localized[locale].path === cleanPath
  );

  if (routeEntry) {
    console.log("Found by localized path:", routeEntry[0]);
    return routeEntry[0];
  }

  // Match in any locale
  const anyLocaleMatch = Object.entries(routes).find(([_, config]) =>
    Object.values(config.localized).some((l) => l.path === cleanPath)
  );

  if (anyLocaleMatch) {
    console.log("Found in any locale:", anyLocaleMatch[0]);
    return anyLocaleMatch[0];
  }

  console.log("No match found, using original:", cleanPath);
  return cleanPath;
}

export function getCanonicalUrl(
  path: string,
  locale: Locale,
  baseUrl: string
): string {
  const standardPath = getStandardPath(path, locale);
  const route = routes[standardPath];

  if (!route) {
    return `${baseUrl}/${locale}/${path}`;
  }

  const localizedPath = route.localized[locale].path;
  return locale === "en"
    ? `${baseUrl}/${localizedPath}`
    : `${baseUrl}/${locale}/${localizedPath}`;
}

export function getAllLocalizedPaths(
  standardPath: string
): Record<Locale, string> {
  const route = routes[standardPath];
  if (!route) return {} as Record<Locale, string>;

  return Object.entries(route.localized).reduce((acc, [locale, config]) => {
    acc[locale as Locale] = config.path;
    return acc;
  }, {} as Record<Locale, string>);
}

export function getFullPath(locale: Locale, path: string): string {
  return locale === "en" ? `/${path}` : `/${locale}/${path}`;
}

export interface NavigationItem {
  key: string;
  href: string;
  title: string;
}

export function getNavigationItems(locale: Locale): NavigationItem[] {
  return Object.entries(routes)
    .filter(([key]) => key !== "home")
    .map(([key, config]) => ({
      key,
      href: getFullPath(locale, config.localized[locale].path),
      title: config.localized[locale].title,
    }));
}

export function translatePath(
  path: string,
  fromLocale: Locale,
  toLocale: Locale
): string {
  const standardPath = getStandardPath(path, fromLocale);
  return getLocalizedPath(standardPath, toLocale);
}
