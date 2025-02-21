import { i18n } from '@/i18n-config'
import type { Locale } from '@/i18n-config'
import { notFound } from 'next/navigation'

interface ValidatedParams {
  lang: Locale
  slug?: string
  [key: string]: string | undefined
}

export async function getValidatedParams(
  params: Record<string, string | undefined> | Promise<Record<string, string | undefined>>
): Promise<ValidatedParams> {
  try {
    const resolvedParams = await Promise.resolve(params)
    
    if (!resolvedParams || typeof resolvedParams !== 'object') {
      console.error('Invalid params object:', resolvedParams)
      notFound()
    }

    if (!resolvedParams.lang || typeof resolvedParams.lang !== 'string') {
      console.error('Missing or invalid lang parameter:', resolvedParams)
      notFound()
    }

    if (!i18n.locales.includes(resolvedParams.lang as Locale)) {
      console.error('Unsupported locale:', resolvedParams.lang)
      notFound()
    }

    return {
      ...resolvedParams,
      lang: resolvedParams.lang as Locale
    }
  } catch (error) {
    console.error('Error validating params:', error)
    notFound()
  }
}