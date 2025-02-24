import { Metadata } from "next";
import { getBaseUrl } from "@/lib/url";
import { routes } from "@/lib/url-utils";

export function generatePageMetadata({
  path,
  lang,
}: {
  path: string;
  lang: string;
}): Metadata {
  const baseUrl = getBaseUrl();

  return {
    title: "TwoFifty - Expert Coworking Consultancy",
    description:
      "Transform your workspace with TwoFifty's global coworking expertise.",
    alternates: {
      canonical: `${baseUrl}/${lang}${path ? `/${path}` : ""}`,
      languages: {
        en: `${baseUrl}/en${path ? `/${path}` : ""}`,
        fr: `${baseUrl}/fr${path ? `/${path}` : ""}`,
        de: `${baseUrl}/de${path ? `/${path}` : ""}`,
        es: `${baseUrl}/es${path ? `/${path}` : ""}`,
      },
    },
  };
}
