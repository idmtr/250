import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import HomePage from "./page.client";
import { notFound } from "next/navigation";
import { getLatestPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { getValidatedParams } from "@/lib/params-helper";
import { generatePageMetadata } from "@/lib/metadata";
import { RoutingService } from "@/lib/routing/utils";
import { routes } from "@/lib/url-utils";

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

  // Pass an empty string as path for the home page
  // This will map to the 'home' route in url-utils.ts
  return generatePageMetadata({
    path: "",
    lang,
  });
}

export default async function Page(props: Props) {
  const { lang } = await getValidatedParams(props.params);

  try {
    const dictionary = await getDictionary(lang);
    const recentPosts = await getLatestPosts(lang, 3);

    return (
      <HomePage
        params={{ lang }}
        dictionary={dictionary}
        recentPosts={recentPosts}
      />
    );
  } catch (error) {
    console.error("Failed to load homepage data:", error);
    notFound();
  }
}
