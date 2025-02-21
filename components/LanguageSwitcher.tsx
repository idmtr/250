import { useRouter, usePathname } from "next/navigation"
import { i18n } from "@/lib/i18n-config"
import type { Locale } from "@/lib/i18n-config"

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLang: string) => {
    const currentPath = pathname!.substring(3) // Remove current language prefix
    router.push(`/${newLang}${currentPath}`)
  }

  return (
    <div className="flex space-x-2">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`px-2 py-1 rounded ${lang === locale ? "bg-[#D4A373] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

