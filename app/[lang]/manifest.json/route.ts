import { generateManifest } from '@/lib/manifest'
import { NextResponse } from 'next/server'
// import { i18n } from '@/i18n-config'
import type { Locale } from '@/i18n-config'
import { getValidatedParams } from '@/lib/params-helper'
import { getBaseUrl } from '@/lib/url'

export async function GET(
  request: Request,
  context: { params: { lang: Locale } }
) {
  try {
    const { lang } = await getValidatedParams(context.params)
    const baseUrl = getBaseUrl()

    const manifest = generateManifest({
      lang,
      baseUrl
    })

    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Error generating manifest:', error)
    return new NextResponse('Not Found', { status: 404 })
  }
}