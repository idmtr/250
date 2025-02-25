import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import type { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getValidatedParams } from "@/lib/params-helper";
import { getBaseUrl } from "@/lib/url";
import { layoutClasses } from "../layout";
import { routes } from "@/lib/url-utils";

export const dynamicParams = false;

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { lang } = await getValidatedParams(params);
    const baseUrl = getBaseUrl();

    // For root language paths, we want to use the home route configuration
    const homeRoute = routes.home.localized[lang as Locale];

    if (!homeRoute) {
      console.error(`No home route found for language: ${lang}`);
      throw new Error(`Missing route configuration for language: ${lang}`);
    }

    // Build language alternates using the home route for each language
    const languages: Record<string, string> = {};

    // Iterate through all locales and add their canonical paths
    for (const locale of i18n.locales) {
      const localeHomeRoute = routes.home.localized[locale as Locale];
      if (localeHomeRoute && localeHomeRoute.canonicalPath) {
        languages[locale] = `${baseUrl}${localeHomeRoute.canonicalPath}`;
      }
    }

    return {
      title: homeRoute.title,
      description: homeRoute.description,
      alternates: {
        canonical: `${baseUrl}${homeRoute.canonicalPath}`,
        languages,
      },
      openGraph: {
        title: homeRoute.title,
        description: homeRoute.description,
        url: `${baseUrl}${homeRoute.canonicalPath}`,
        siteName: "TwoFifty Consulting",
        locale: lang,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: homeRoute.title,
        description: homeRoute.description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error; // Let Next.js handle the error
  }
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={layoutClasses.html} suppressHydrationWarning>
      <body className={layoutClasses.body}>
        <Header lang={lang} dictionary={dictionary} />
        <main className="min-h-screen bg-[#F5EBE0]">{children}</main>
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
