import { Locale } from "@/i18n-config";

export type LocalizedRouteConfig = {
  standard: string;
  localized: {
    [key in Locale]: {
      path: string;
      title: string;
      description?: string;
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
        canonicalPath: "/",
        title: "TwoFifty - Expert Coworking Consultancy & Workspace Solutions",
        description:
          "Transform your workspace with TwoFifty's global coworking expertise. We teach, advise, and build understanding about coworking for organizations worldwide.",
      },
      fr: {
        path: "",
        canonicalPath: "/fr",
        title:
          "TwoFifty - Conseil Expert en Coworking & Solutions d'Espace de Travail",
        description:
          "Transformez votre espace de travail avec l'expertise mondiale de TwoFifty en coworking.",
      },
      de: {
        path: "",
        canonicalPath: "/de",
        title:
          "TwoFifty - Experten für Coworking-Beratung & Arbeitsplatzlösungen",
        description:
          "Transformieren Sie Ihren Arbeitsplatz mit TwoFiftys globaler Coworking-Expertise.",
      },
      es: {
        path: "",
        canonicalPath: "/es",
        title:
          "TwoFifty - Consultoría Experta en Coworking & Soluciones de Espacio",
        description:
          "Transforme su espacio de trabajo con la experiencia global de TwoFifty en coworking.",
      },
    },
  },
  mission: {
    standard: "mission",
    localized: {
      en: {
        path: "our-mission-coworking-excellence",
        canonicalPath: "/en/our-mission-coworking-excellence",
        title: "Our Mission | Building Better Coworking Communities | TwoFifty",
      },
      fr: {
        path: "notre-mission-excellence-coworking",
        canonicalPath: "/fr/notre-mission-excellence-coworking",
        title: "Notre Mission | Créer de Meilleures Communautés de Coworking",
      },
      de: {
        path: "unsere-mission-coworking-exzellenz",
        canonicalPath: "/de/unsere-mission-coworking-exzellenz",
        title: "Unsere Mission | Bessere Coworking-Communities Aufbauen",
      },
      es: {
        path: "nuestra-mision-excelencia-coworking",
        canonicalPath: "/es/nuestra-mision-excelencia-coworking",
        title: "Nuestra Misión | Construyendo Mejores Comunidades de Coworking",
      },
    },
  },
  workshops: {
    standard: "workshops",
    localized: {
      en: {
        path: "coworking-workshops-training-programs",
        canonicalPath: "/en/coworking-workshops-training-programs",
        title: "Coworking Workshops & Training Programs | TwoFifty",
      },
      fr: {
        path: "ateliers-formation-espaces-coworking",
        canonicalPath: "/fr/ateliers-formation-espaces-coworking",
        title: "Ateliers et Programmes de Formation Coworking",
      },
      de: {
        path: "coworking-workshops-trainingsprogramme",
        canonicalPath: "/de/coworking-workshops-trainingsprogramme",
        title: "Coworking Workshops & Trainingsprogramme",
      },
      es: {
        path: "talleres-formacion-espacios-coworking",
        canonicalPath: "/es/talleres-formacion-espacios-coworking",
        title: "Talleres y Programas de Formación Coworking",
      },
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
  "coworking-consulting": {
    standard: "coworking-consulting",
    localized: {
      en: {
        path: "coworking-consulting-services",
        canonicalPath: "/en/coworking-consulting-services",
        title: "Expert Coworking Consulting Services | TwoFifty",
        description:
          "Transform your workspace with expert coworking consulting...",
      },
      fr: {
        path: "services-conseil-coworking",
        canonicalPath: "/fr/services-conseil-coworking",
        title: "Services de Conseil en Coworking | TwoFifty",
        description: "Transformez votre espace avec notre expertise...",
      },
      de: {
        path: "coworking-beratung",
        canonicalPath: "/de/coworking-beratung",
        title: "Coworking Beratung & Services | TwoFifty",
        description: "Optimieren Sie Ihren Workspace...",
      },
      es: {
        path: "servicios-consultoria-coworking",
        canonicalPath: "/es/servicios-consultoria-coworking",
        title: "Servicios de Consultoría Coworking | TwoFifty",
        description: "Transforme su espacio...",
      },
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
