import { i18n } from '@/i18n-config'
import { redirect } from 'next/navigation'

export const dynamic = 'force-static'

export default function Home() {
  redirect(`/${i18n.defaultLocale}`)
  return null
}
