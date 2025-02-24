import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import HomePage from "./page.client";
import { notFound } from "next/navigation";
import { getLatestPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { getValidatedParams } from "@/lib/params-helper";
import { generatePageMetadata } from "@/lib/metadata";
import { RoutingService } from "@/lib/routing/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

interface Props {
  params: { lang: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  return RoutingService.generateMetadata("home", lang);
}

export default async function Page({ params }: Props) {
  try {
    const { lang } = await getValidatedParams(params);
    const [dictionary, recentPosts] = await Promise.all([
      getDictionary(lang),
      getLatestPosts(lang, 3),
    ]);

    if (!dictionary) {
      console.error(`Failed to load dictionary for locale ${lang}`);
      notFound();
    }

    return (
      <HomePage
        params={{ lang }}
        dictionary={dictionary}
        recentPosts={recentPosts}
      />
    );
  } catch (error) {
    console.error("Failed to load page:", error);
    notFound();
  }
}
