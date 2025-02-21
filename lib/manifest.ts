import type { Locale } from '@/i18n-config'

interface ManifestGenerator {
  lang: Locale
  baseUrl: string
}

export function generateManifest({ lang, baseUrl }: ManifestGenerator) {
  return {
    name: "TwoFifty Consulting",
    short_name: "TwoFifty",
    description: "Digital Transformation Consulting",
    icons: [
      {
        src: `${baseUrl}/favicon/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `${baseUrl}/favicon/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `${baseUrl}/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#D4A373",
    background_color: "#F5EBE0",
    display: "standalone",
    start_url: `${baseUrl}/${lang}`,
    scope: `${baseUrl}/${lang}`,
    id: `twofifty-consulting-${lang}`,
    lang: lang
  }
}