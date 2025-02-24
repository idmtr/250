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
          "Transformez votre espace de travail avec l'expertise mondiale de TwoFifty en coworking. Nous enseignons, conseillons et développons la compréhension du coworking pour les organisations du monde entier.",
      },
      de: {
        path: "",
        canonicalPath: "/de",
        title:
          "TwoFifty - Experten für Coworking-Beratung & Arbeitsplatzlösungen",
        description:
          "Verwandeln Sie Ihren Arbeitsplatz mit TwoFiftys globaler Coworking-Expertise. Wir lehren, beraten und fördern das Verständnis für Coworking in Organisationen weltweit.",
      },
      es: {
        path: "",
        canonicalPath: "/es",
        title:
          "TwoFifty - Consultoría Experta en Coworking & Soluciones de Espacio",
        description:
          "Transforme su espacio de trabajo con la experiencia global de TwoFifty en coworking. Enseñamos, asesoramos y construimos comprensión sobre coworking para organizaciones en todo el mundo.",
      },
    },
  },
  mission: {
    standard: "mission",
    localized: {
      en: {
        path: "our-mission",
        canonicalPath: "/en/our-mission",
        title: "Our Mission | Building Better Coworking Communities | TwoFifty",
        description:
          "Discover TwoFifty's mission to build better coworking communities through expert consultancy and innovative workspace solutions.",
      },
      fr: {
        path: "notre-mission-excellence-coworking",
        canonicalPath: "/fr/notre-mission",
        title: "Notre Mission | Créer de Meilleures Communautés de Coworking",
        description:
          "Découvrez la mission de TwoFifty : créer de meilleures communautés de coworking grâce à un conseil expert et des solutions d'espace innovantes.",
      },
      de: {
        path: "unsere-mission-coworking-exzellenz",
        canonicalPath: "/de/unsere-mission",
        title: "Unsere Mission | Bessere Coworking-Communities Aufbauen",
        description:
          "Entdecken Sie TwoFiftys Mission, bessere Coworking-Communities durch Expertenberatung und innovative Arbeitsplatzlösungen zu schaffen.",
      },
      es: {
        path: "nuestra-mision",
        canonicalPath: "/es/nuestra-mision",
        title: "Nuestra Misión | Construyendo Mejores Comunidades de Coworking",
        description:
          "Descubra la misión de TwoFifty de construir mejores comunidades de coworking a través de consultoría experta y soluciones innovadoras para espacios de trabajo.",
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
        description:
          "Enhance your coworking skills with TwoFifty's workshops and training programs. Learn from industry experts and grow your workspace community.",
      },
      fr: {
        path: "ateliers-formation-espaces-coworking",
        canonicalPath: "/fr/ateliers-formation-espaces-coworking",
        title: "Ateliers et Programmes de Formation Coworking",
        description:
          "Améliorez vos compétences en coworking avec les ateliers et programmes de formation de TwoFifty. Apprenez des experts de l'industrie et développez votre communauté d'espace de travail.",
      },
      de: {
        path: "coworking-workshops-trainingsprogramme",
        canonicalPath: "/de/coworking-workshops-trainingsprogramme",
        title: "Coworking Workshops & Trainingsprogramme",
        description:
          "Verbessern Sie Ihre Coworking-Fähigkeiten mit TwoFiftys Workshops und Trainingsprogrammen. Lernen Sie von Branchenexperten und erweitern Sie Ihre Workspace-Community.",
      },
      es: {
        path: "talleres-formacion-espacios-coworking",
        canonicalPath: "/es/talleres-formacion-espacios-coworking",
        title: "Talleres y Programas de Formación Coworking",
        description:
          "Mejore sus habilidades de coworking con los talleres y programas de formación de TwoFifty. Aprenda de expertos de la industria y haga crecer su comunidad de espacio de trabajo.",
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
        description:
          "Dive into TwoFifty's coworking education resources. Access courses, guides, and insights to master workspace management and community building.",
      },
      fr: {
        path: "formation-coworking",
        title: "Formation Coworking",
        canonicalPath: "/fr/formation-coworking",
        description:
          "Plongez dans les ressources éducatives de TwoFifty sur le coworking. Accédez à des cours, guides et insights pour maîtriser la gestion d'espace et la construction de communauté.",
      },
      de: {
        path: "coworking-ausbildung",
        title: "Coworking Ausbildung",
        canonicalPath: "/de/coworking-ausbildung",
        description:
          "Tauchen Sie ein in TwoFiftys Coworking-Bildungsressourcen. Greifen Sie auf Kurse, Leitfäden und Erkenntnisse zu, um Workspace-Management und Community-Aufbau zu meistern.",
      },
      es: {
        path: "educacion-coworking",
        title: "Educación Coworking",
        canonicalPath: "/es/educacion-coworking",
        description:
          "Sumérjase en los recursos educativos de TwoFifty sobre coworking. Acceda a cursos, guías e insights para dominar la gestión de espacios y la construcción de comunidades.",
      },
    },
  },
  "speaking-events": {
    standard: "speaking-events",
    localized: {
      en: {
        path: "speaking-events",
        title: "Speaking, Events, & Coworking Conferences",
        description:
          "Explore TwoFifty's speaking engagements and events. Join us to learn about the latest trends and best practices in coworking and workspace innovation.",
      },
      fr: {
        path: "conferences",
        title: "Conférences",
        description:
          "Découvrez les interventions et événements de TwoFifty. Rejoignez-nous pour en savoir plus sur les dernières tendances et meilleures pratiques en coworking et innovation d'espace de travail.",
      },
      de: {
        path: "vortraege",
        title: "Vorträge",
        description:
          "Entdecken Sie TwoFiftys Vorträge und Veranstaltungen. Treten Sie uns bei, um mehr über die neuesten Trends und Best Practices im Coworking und Workspace-Innovation zu erfahren.",
      },
      es: {
        path: "conferencias",
        title: "Conferencias",
        description:
          "Explore los eventos y conferencias de TwoFifty. Únase a nosotros para aprender sobre las últimas tendencias y mejores prácticas en coworking e innovación de espacios de trabajo.",
      },
    },
  },
  "get-feedback": {
    standard: "get-feedback",
    localized: {
      en: {
        path: "get-feedback",
        title: "Get Feedback",
        description:
          "Receive expert feedback on your coworking space or project. TwoFifty's consultants provide actionable insights to optimize your workspace and community.",
      },
      fr: {
        path: "obtenir-conseil",
        title: "Obtenir Conseil",
        description:
          "Obtenez des retours d'experts sur votre espace ou projet de coworking. Les consultants de TwoFifty fournissent des insights actionnables pour optimiser votre espace et communauté.",
      },
      de: {
        path: "feedback-erhalten",
        title: "Feedback Erhalten",
        description:
          "Erhalten Sie Expertenfeedback zu Ihrem Coworking-Space oder Projekt. TwoFiftys Berater liefern umsetzbare Erkenntnisse zur Optimierung Ihres Workspaces und Ihrer Community.",
      },
      es: {
        path: "obtener-feedback",
        title: "Obtener Feedback",
        description:
          "Reciba feedback experto sobre su espacio o proyecto de coworking. Los consultores de TwoFifty proporcionan insights accionables para optimizar su espacio y comunidad.",
      },
    },
  },
  retreats: {
    standard: "retreats",
    localized: {
      en: {
        path: "coworking-community-retreats",
        title: "Coworking Community Retreats",
        description:
          "Join TwoFifty's coworking community retreats for immersive learning and networking. Connect with like-minded professionals and elevate your workspace vision.",
      },
      fr: {
        path: "retraites-de-communaute-coworking",
        title: "Retraites de la Communauté Coworking",
        description:
          "Participez aux retraites de la communauté coworking de TwoFifty pour un apprentissage immersif et du networking. Connectez-vous avec des professionnels partageant les mêmes idées et élevez votre vision d'espace de travail.",
      },
      de: {
        path: "coworking-community-retreats",
        title: "Retreats für die Coworking-Gemeinschaft",
        description:
          "Nehmen Sie an TwoFiftys Coworking-Community-Retreats teil für immersives Lernen und Networking. Vernetzen Sie sich mit Gleichgesinnten und heben Sie Ihre Workspace-Vision auf ein neues Level.",
      },
      es: {
        path: "retiros-comunitarios-de-coworking",
        title: "Retiros Comunitarios de Coworking",
        description:
          "Únase a los retiros de la comunidad de coworking de TwoFifty para aprendizaje inmersivo y networking. Conéctese con profesionales afines y eleve su visión de espacio de trabajo.",
      },
    },
  },
  blog: {
    standard: "blog",
    localized: {
      en: {
        path: "blog",
        title: "Coworking Insights & Best Practices",
        description:
          "Read TwoFifty's blog for insights on coworking trends, workspace optimization, and community building. Stay informed and inspired.",
      },
      fr: {
        path: "blog",
        title: "Tendances et Bonnes Pratiques du Coworking",
        description:
          "Lisez le blog de TwoFifty pour des insights sur les tendances du coworking, l'optimisation d'espace de travail et la construction de communauté. Restez informé et inspiré.",
      },
      de: {
        path: "blog",
        title: "Coworking-Einblicke & Best Practices",
        description:
          "Lesen Sie TwoFiftys Blog für Erkenntnisse zu Coworking-Trends, Workspace-Optimierung und Community-Aufbau. Bleiben Sie informiert und inspiriert.",
      },
      es: {
        path: "blog",
        title: "Insights y Mejores Prácticas de Coworking",
        description:
          "Lea el blog de TwoFifty para insights sobre tendencias de coworking, optimización de espacios de trabajo y construcción de comunidades. Manténgase informado e inspirado.",
      },
    },
  },
  about: {
    standard: "about",
    localized: {
      en: {
        path: "about",
        title: "About Us",
        description:
          "Learn about TwoFifty's team, values, and journey. Discover how we're transforming workspaces and empowering coworking communities worldwide.",
      },
      fr: {
        path: "a-propos",
        title: "À Propos",
        description:
          "Découvrez l'équipe, les valeurs et le parcours de TwoFifty. Voyez comment nous transformons les espaces de travail et empower les communautés de coworking dans le monde.",
      },
      de: {
        path: "ueber-uns",
        title: "Über Uns",
        description:
          "Erfahren Sie mehr über TwoFiftys Team, Werte und Geschichte. Entdecken Sie, wie wir Workspaces transformieren und Coworking-Communities weltweit stärken.",
      },
      es: {
        path: "sobre-nosotros",
        title: "Sobre Nosotros",
        description:
          "Conozca al equipo, valores y trayectoria de TwoFifty. Descubra cómo transformamos espacios de trabajo y empoderamos comunidades de coworking en todo el mundo.",
      },
    },
  },
  contact: {
    standard: "contact",
    localized: {
      en: {
        path: "contact",
        title: "Contact",
        description:
          "Get in touch with TwoFifty for expert coworking consultancy. Contact us to start transforming your workspace today.",
      },
      fr: {
        path: "contactez-nous",
        title: "Contactez-nous",
        description:
          "Contactez TwoFifty pour un conseil expert en coworking. Prenez contact pour commencer à transformer votre espace de travail dès aujourd'hui.",
      },
      de: {
        path: "kontakt",
        title: "Kontakt",
        description:
          "Kontaktieren Sie TwoFifty für Expertenberatung im Coworking-Bereich. Nehmen Sie Kontakt auf, um Ihren Workspace noch heute zu transformieren.",
      },
      es: {
        path: "contacto",
        title: "Contacto",
        description:
          "Póngase en contacto con TwoFifty para consultoría experta en coworking. Contáctenos para comenzar a transformar su espacio de trabajo hoy mismo.",
      },
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
          "Transform your workspace with TwoFifty's expert coworking consulting services. Optimize your space, community, and operations for success.",
      },
      fr: {
        path: "services-conseil-coworking",
        canonicalPath: "/fr/services-conseil-coworking",
        title: "Services de Conseil en Coworking | TwoFifty",
        description:
          "Transformez votre espace de travail avec les services de conseil en coworking de TwoFifty. Optimisez votre espace, communauté et opérations pour le succès.",
      },
      de: {
        path: "coworking-beratung",
        canonicalPath: "/de/coworking-beratung",
        title: "Coworking Beratung & Services | TwoFifty",
        description:
          "Verwandeln Sie Ihren Workspace mit TwoFiftys Coworking-Beratungsdiensten. Optimieren Sie Raum, Community und Abläufe für Erfolg.",
      },
      es: {
        path: "servicios-consultoria-coworking",
        canonicalPath: "/es/servicios-consultoria-coworking",
        title: "Servicios de Consultoría Coworking | TwoFifty",
        description:
          "Transforme su espacio de trabajo con los servicios de consultoría en coworking de TwoFifty. Optimice su espacio, comunidad y operaciones para el éxito.",
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
