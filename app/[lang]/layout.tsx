import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import type { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getValidatedParams } from "@/lib/params-helper";
import { generatePageMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const dynamicParams = false;

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);

  return generatePageMetadata({
    lang,
    title: "TwoFifty",
    description: "Your default description",
  });
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${geist.variable}`}>
      <body className="min-h-screen font-sans antialiased">
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
