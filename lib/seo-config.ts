import type { Locale } from "@/i18n-config";

export const seoRoutes: Record<
  string,
  {
    paths: Record<Locale, string>;
    metadata: Record<
      Locale,
      {
        title: string;
        description: string;
      }
    >;
  }
> = {
  home: {
    paths: {
      en: "/",
      fr: "/fr",
      de: "/de",
      es: "/es",
    },
    metadata: {
      en: {
        title: "TwoFifty - Expert Coworking Consultancy & Workspace Solutions",
        description:
          "Transform your workspace with TwoFifty's global coworking expertise. We teach, advise, and build understanding about coworking for organizations worldwide.",
      },
      fr: {
        title:
          "TwoFifty - Conseil Expert en Coworking & Solutions d'Espace de Travail",
        description:
          "Transformez votre espace de travail avec l'expertise mondiale de TwoFifty en coworking. Nous enseignons et conseillons sur le coworking pour les organisations.",
      },
      de: {
        title:
          "TwoFifty - Experten für Coworking-Beratung & Arbeitsplatzlösungen",
        description:
          "Transformieren Sie Ihren Arbeitsplatz mit TwoFiftys globaler Coworking-Expertise. Wir beraten und schulen Organisationen weltweit im Bereich Coworking.",
      },
      es: {
        title:
          "TwoFifty - Consultoría Experta en Coworking & Soluciones de Espacio",
        description:
          "Transforme su espacio de trabajo con la experiencia global de TwoFifty en coworking. Enseñamos y asesoramos sobre coworking para organizaciones.",
      },
    },
  },
  about: {
    paths: {
      en: "/about-twofifty-coworking-consultancy",
      fr: "/fr/a-propos-twofifty-conseil-coworking",
      de: "/de/uber-twofifty-coworking-beratung",
      es: "/es/sobre-twofifty-consultoria-coworking",
    },
    metadata: {
      en: {
        title: "About TwoFifty | Global Coworking Consultancy Experts",
        description:
          "Meet the team behind TwoFifty, with experience from 500+ coworking spaces across 50 cities worldwide. Expert consultancy for thriving workspace communities.",
      },
      fr: {
        title: "À Propos de TwoFifty | Experts en Conseil Coworking Global",
        description:
          "Découvrez l'équipe TwoFifty, forte d'une expérience de plus de 500 espaces de coworking dans 50 villes. Experts en conseil pour des communautés de travail prospères.",
      },
      de: {
        title: "Über TwoFifty | Globale Coworking-Beratungsexperten",
        description:
          "Lernen Sie das Team von TwoFifty kennen, mit Erfahrung aus über 500 Coworking-Spaces in 50 Städten weltweit. Expertenberatung für erfolgreiche Arbeitsplatzgemeinschaften.",
      },
      es: {
        title: "Sobre TwoFifty | Expertos en Consultoría Global de Coworking",
        description:
          "Conozca al equipo de TwoFifty, con experiencia en más de 500 espacios de coworking en 50 ciudades. Consultoría experta para comunidades de trabajo prósperas.",
      },
    },
  },
  mission: {
    paths: {
      en: "/our-mission-coworking-excellence",
      fr: "/fr/notre-mission-excellence-coworking",
      de: "/de/unsere-mission-coworking-exzellenz",
      es: "/es/nuestra-mision-excelencia-coworking",
    },
    metadata: {
      en: {
        title: "Our Mission | Building Better Coworking Communities | TwoFifty",
        description:
          "Discover TwoFifty's mission to transform workspaces into thriving communities through expert consultation, education, and sustainable growth strategies.",
      },
      fr: {
        title:
          "Notre Mission | Créer de Meilleures Communautés de Coworking | TwoFifty",
        description:
          "Découvrez la mission de TwoFifty : transformer les espaces de travail en communautés prospères grâce à des consultations d'experts et des stratégies durables.",
      },
      de: {
        title:
          "Unsere Mission | Bessere Coworking-Communities Aufbauen | TwoFifty",
        description:
          "Entdecken Sie TwoFiftys Mission, Arbeitsplätze durch Expertenberatung und nachhaltige Wachstumsstrategien in florierende Gemeinschaften zu verwandeln.",
      },
      es: {
        title:
          "Nuestra Misión | Construyendo Mejores Comunidades de Coworking | TwoFifty",
        description:
          "Descubra la misión de TwoFifty de transformar espacios de trabajo en comunidades prósperas mediante consultoría experta y estrategias de crecimiento sostenible.",
      },
    },
  },
  workshops: {
    paths: {
      en: "/coworking-workshops-training-programs",
      fr: "/fr/ateliers-formation-espaces-coworking",
      de: "/de/coworking-workshops-trainingsprogramme",
      es: "/es/talleres-formacion-espacios-coworking",
    },
    metadata: {
      en: {
        title: "Coworking Workshops & Training Programs | TwoFifty",
        description:
          "Professional workshops and training programs for coworking spaces. Learn operational excellence, community building, and sustainable growth strategies.",
      },
      fr: {
        title: "Ateliers et Programmes de Formation Coworking | TwoFifty",
        description:
          "Ateliers professionnels et programmes de formation pour espaces de coworking. Excellence opérationnelle, développement communautaire et stratégies de croissance.",
      },
      de: {
        title: "Coworking Workshops & Trainingsprogramme | TwoFifty",
        description:
          "Professionelle Workshops und Trainingsprogramme für Coworking Spaces. Lernen Sie operative Exzellenz, Community-Building und nachhaltige Wachstumsstrategien.",
      },
      es: {
        title: "Talleres y Programas de Formación Coworking | TwoFifty",
        description:
          "Talleres profesionales y programas de formación para espacios coworking. Excelencia operativa, desarrollo comunitario y estrategias de crecimiento sostenible.",
      },
    },
  },
  education: {
    paths: {
      en: "/coworking-education-certification-programs",
      fr: "/fr/programmes-formation-certification-coworking",
      de: "/de/coworking-ausbildung-zertifizierungsprogramme",
      es: "/es/programas-educacion-certificacion-coworking",
    },
    metadata: {
      en: {
        title: "Coworking Education & Certification Programs | TwoFifty",
        description:
          "Comprehensive education and certification programs for coworking professionals. Expert-led courses in workspace management and community development.",
      },
      fr: {
        title: "Programmes d'Éducation et Certification Coworking | TwoFifty",
        description:
          "Programmes complets d'éducation et de certification pour professionnels du coworking. Cours d'experts en gestion d'espace et développement communautaire.",
      },
      de: {
        title: "Coworking Ausbildung & Zertifizierungsprogramme | TwoFifty",
        description:
          "Umfassende Ausbildungs- und Zertifizierungsprogramme für Coworking-Profis. Expertenkurse in Workspace-Management und Community-Entwicklung.",
      },
      es: {
        title: "Programas de Educación y Certificación Coworking | TwoFifty",
        description:
          "Programas completos de educación y certificación para profesionales del coworking. Cursos expertos en gestión de espacios y desarrollo comunitario.",
      },
    },
  },
  speaking: {
    paths: {
      en: "/coworking-speaking-events-conferences",
      fr: "/fr/conferences-evenements-coworking",
      de: "/de/coworking-vortraege-konferenzen",
      es: "/es/conferencias-eventos-coworking",
    },
    metadata: {
      en: {
        title: "Coworking Speaking Events & Conferences | TwoFifty",
        description:
          "Expert insights on coworking trends, community building, and workspace innovation. Join our speaking events and conferences worldwide.",
      },
      fr: {
        title: "Conférences et Événements sur le Coworking | TwoFifty",
        description:
          "Expertise sur les tendances du coworking, la création de communauté et l'innovation. Participez à nos conférences et événements mondiaux.",
      },
      de: {
        title: "Coworking Vorträge & Konferenzen | TwoFifty",
        description:
          "Experteneinblicke zu Coworking-Trends, Community-Building und Workspace-Innovation. Besuchen Sie unsere Vorträge und Konferenzen weltweit.",
      },
      es: {
        title: "Conferencias y Eventos de Coworking | TwoFifty",
        description:
          "Conocimientos expertos sobre tendencias de coworking, desarrollo comunitario e innovación. Únase a nuestras conferencias y eventos mundiales.",
      },
    },
  },
  feedback: {
    paths: {
      en: "/expert-coworking-space-feedback-analysis",
      fr: "/fr/analyse-conseil-expert-espace-coworking",
      de: "/de/experten-coworking-space-analyse-feedback",
      es: "/es/analisis-feedback-experto-espacio-coworking",
    },
    metadata: {
      en: {
        title: "Expert Coworking Space Analysis & Feedback | TwoFifty",
        description:
          "Get professional feedback on your coworking space operations. Expert analysis and actionable recommendations for improvement and growth.",
      },
      fr: {
        title: "Analyse et Conseil Expert d'Espaces Coworking | TwoFifty",
        description:
          "Obtenez un retour professionnel sur vos opérations de coworking. Analyse experte et recommandations concrètes pour l'amélioration et la croissance.",
      },
      de: {
        title: "Experten-Analyse & Feedback für Coworking Spaces | TwoFifty",
        description:
          "Erhalten Sie professionelles Feedback zu Ihrem Coworking Space. Expertenanalyse und umsetzbare Empfehlungen für Verbesserung und Wachstum.",
      },
      es: {
        title: "Análisis y Feedback Experto de Espacios Coworking | TwoFifty",
        description:
          "Obtenga feedback profesional sobre sus operaciones de coworking. Análisis experto y recomendaciones prácticas para mejora y crecimiento.",
      },
    },
  },
  retreats: {
    paths: {
      en: "/coworking-community-retreats-events",
      fr: "/fr/retraites-evenements-communaute-coworking",
      de: "/de/coworking-community-retreats-veranstaltungen",
      es: "/es/retiros-eventos-comunidad-coworking",
    },
    metadata: {
      en: {
        title: "Coworking Community Retreats & Events | TwoFifty",
        description:
          "Join our transformative coworking retreats and community events. Build connections, share knowledge, and grow your coworking community.",
      },
      fr: {
        title: "Retraites et Événements Communautaires Coworking | TwoFifty",
        description:
          "Participez à nos retraites et événements communautaires transformateurs. Créez des connexions et développez votre communauté coworking.",
      },
      de: {
        title: "Coworking Community Retreats & Events | TwoFifty",
        description:
          "Nehmen Sie an unseren transformativen Coworking-Retreats und Community-Events teil. Bauen Sie Verbindungen auf und entwickeln Sie Ihre Coworking-Community.",
      },
      es: {
        title: "Retiros y Eventos Comunitarios de Coworking | TwoFifty",
        description:
          "Únase a nuestros retiros y eventos comunitarios transformadores. Construya conexiones y haga crecer su comunidad de coworking.",
      },
    },
  },
  contact: {
    paths: {
      en: "/contact-coworking-consultancy",
      fr: "/fr/contact-conseil-coworking",
      de: "/de/kontakt-coworking-beratung",
      es: "/es/contacto-consultoria-coworking",
    },
    metadata: {
      en: {
        title: "Contact TwoFifty | Global Coworking Consultancy",
        description:
          "Get in touch with TwoFifty's coworking experts. Let's discuss how we can help optimize your workspace and build a thriving community.",
      },
      fr: {
        title: "Contactez TwoFifty | Conseil Global en Coworking",
        description:
          "Contactez les experts coworking de TwoFifty. Discutons de l'optimisation de votre espace et du développement de votre communauté.",
      },
      de: {
        title: "Kontakt TwoFifty | Globale Coworking-Beratung",
        description:
          "Kontaktieren Sie die Coworking-Experten von TwoFifty. Lassen Sie uns besprechen, wie wir Ihren Workspace optimieren können.",
      },
      es: {
        title: "Contacto TwoFifty | Consultoría Global de Coworking",
        description:
          "Contacte con los expertos en coworking de TwoFifty. Hablemos sobre cómo optimizar su espacio y construir una comunidad próspera.",
      },
    },
  },
};

export type SeoRoute = keyof typeof seoRoutes;

// Continue with other routes...
