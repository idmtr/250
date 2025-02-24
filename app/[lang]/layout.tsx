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

export const dynamicParams = false;

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);

  return {
    title: "TwoFifty - Expert Coworking Consultancy",
    description:
      "Transform your workspace with TwoFifty's global coworking expertise.",
    alternates: {
      canonical: `${getBaseUrl()}/${lang}`,
      languages: {
        en: `${getBaseUrl()}/en`,
        fr: `${getBaseUrl()}/fr`,
        de: `${getBaseUrl()}/de`,
        es: `${getBaseUrl()}/es`,
      },
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={layoutClasses.html}>
      <body className={layoutClasses.body}>
        <Header lang={lang} dictionary={dictionary} />
        <main className="min-h-screen bg-[#F5EBE0]">{children}</main>
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}

// Make this a client component if needed
function getCanonicalUrl() {
  if (typeof window === "undefined") return "";
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("canonical") || window.location.pathname;
}
