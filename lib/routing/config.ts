import { RoutingConfig } from "./types";

export const routingConfig: RoutingConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co",
  defaultLocale: "en",
  locales: ["en", "fr", "de", "es"],
  routes: {
    home: {
      standard: "",
      defaultTitle: "TwoFifty - Coworking Consultancy",
      defaultDescription:
        "TwoFifty specializes in crafting sustainable, adaptable workspaces.",
      priority: 1.0,
      changeFrequency: "weekly",
      localized: {
        en: {
          path: "",
          title: "Home | TwoFifty",
        },
        fr: {
          path: "",
          title: "Accueil | TwoFifty",
        },
        de: {
          path: "",
          title: "Startseite | TwoFifty",
        },
        es: {
          path: "",
          title: "Inicio | TwoFifty",
        },
      },
    },
    // Add other routes...
  },
};
