import { Locale } from "@/i18n-config";
import { getLocalizedPath, translateUrl } from "@/lib/url-utils";

export type NavigationItem = {
  key: string;
  href?: string;
  labelKey: string;
  children?: NavigationItem[];
};

export const getNavigation = (lang: Locale): NavigationItem[] => [
  {
    key: "mission",
    href: `/${lang}/${getLocalizedPath("mission", lang)}`,
    labelKey: "header.mission",
  },
  {
    key: "services",
    labelKey: "header.services",
    children: [
      {
        key: "coworking-consulting",
        href: `/${lang}/${getLocalizedPath("coworking-consulting", lang)}`,
        labelKey: "header.coworkingConsultancy",
      },
      {
        key: "workshops",
        href: `/${lang}/${getLocalizedPath("workshops", lang)}`,
        labelKey: "header.workshops",
      },
      {
        key: "education",
        href: `/${lang}/${getLocalizedPath("education", lang)}`,
        labelKey: "header.education",
      },
      {
        key: "speaking",
        href: `/${lang}/${getLocalizedPath("speaking-events", lang)}`,
        labelKey: "header.speakingEvents",
      },
      {
        key: "feedback",
        href: `/${lang}/${getLocalizedPath("get-feedback", lang)}`,
        labelKey: "header.getFeedback",
      },
    ],
  },
  {
    key: "retreats",
    href: `/${lang}/${getLocalizedPath("retreats", lang)}`,
    labelKey: "header.communityRetreats",
  },
  {
    key: "blog",
    href: `/${lang}/${getLocalizedPath("blog", lang)}`,
    labelKey: "header.blog",
  },
];

export const getLanguageMenu = (pathname: string, lang: Locale) => ({
  key: "language",
  labelKey: "🌐",
  children: [
    {
      key: "en",
      href: translateUrl(pathname, lang, "en"),
      labelKey: "English",
    },
    {
      key: "fr",
      href: translateUrl(pathname, lang, "fr"),
      labelKey: "Français",
    },
    {
      key: "de",
      href: translateUrl(pathname, lang, "de"),
      labelKey: "Deutsch",
    },
    {
      key: "es",
      href: translateUrl(pathname, lang, "es"),
      labelKey: "Español",
    },
  ],
});
