import { getDictionary } from "@/get-dictionary"
import type { Locale } from "@/i18n-config"
import { getValidatedParams } from "@/lib/params-helper"
import { notFound } from "next/navigation"

type PageProps = {
  params: { lang: Locale }
}

export default async function PageTemplate(props: PageProps) {
  const { lang } = await getValidatedParams(props.params)

  try {
    const dictionary = await getDictionary(lang)
    const pageSection = 'sectionName' // replace with actual section name

    if (!(pageSection in dictionary)) {
      console.error(`${pageSection} section missing in dictionary`)
      notFound()
    }

    return (
      <div className="container mx-auto px-6 py-24">
        {/* Page content */}
      </div>
    )
  } catch (error) {
    console.error('Failed to load page:', error)
    notFound()
  }
}