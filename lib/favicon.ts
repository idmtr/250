import { Metadata } from 'next'
import type { Locale } from '@/i18n-config'
import { getBaseUrl } from '@/lib/url'

interface FaviconGenerator {
  lang?: Locale
}

// Similar to getImagePath utility
const getFaviconPath = (path: string) => {
  // Remove any leading slashes and ensure clean path
  const cleanPath = path.replace(/^\//, '')
  return path.startsWith('http') ? path : `${getBaseUrl()}/${cleanPath}`
}

export function generateFaviconMetadata({ lang }: FaviconGenerator): Metadata {
  return {
    metadataBase: new URL(getBaseUrl()),
    icons: {
      icon: [
        {
          url: getFaviconPath('favicon/favicon-16x16.png'),
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: getFaviconPath('favicon/favicon-32x32.png'),
          sizes: '32x32',
          type: 'image/png',
        }
      ],
      shortcut: getFaviconPath('favicon.ico'),
      apple: getFaviconPath('favicon/apple-touch-icon.png')
    }
  }
}