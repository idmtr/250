import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import type { Locale } from "@/i18n-config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const dynamicParams = false;

type Props = {
  params: { lang: Locale };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const validatedParams = await getValidatedParams(params);
  const { lang } = validatedParams;

  return generatePageMetadata({
    lang,
    title: "TwoFifty Consulting",
    description: "Digital Transformation Consulting",
  });
}

export default async function RootLayout(props: Props) {
  const { lang } = await getValidatedParams(props.params);
  const dictionary = await getDictionary(lang);

  return (
    <div
      className={`${inter.variable} min-h-screen font-sans antialiased bg-[#F5EBE0]`}
    >
      <Header lang={lang} dictionary={dictionary} />
      <main>{props.children}</main>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
