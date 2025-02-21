import { getDictionary } from "@/get-dictionary"
import type { Locale } from "@/i18n-config"
import { getValidatedParams } from "@/lib/params-helper"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

type Props = {
  params: { lang: Locale }
}

// Add proper type
interface WorkshopData {
  subtitle: string
  title: string
  presentations: {
    overline: string
    title: string
    subtitle: string
    description: string
    callout: string
    details: {
      duration: string
      includes: string
      options: string
      suitableFor: string
    }
  }
  workshop: {
    overline: string
    title: string
    subtitle: string
    description: string
    callout: string
    details: {
      duration: string
      includes: string
      options: string
      suitableFor: string
    }
  }
  connect: {
    question: string
    title: string
    subtitle: string
    cta: string
    linkedin: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params)
  const dictionary = await getDictionary(lang)

  return generatePageMetadata({ 
    lang,
    path: '/workshops',
    title: dictionary.workshops?.title || 'Workshops | TwoFifty Consulting',
    description: dictionary.workshops?.subtitle || 'Professional workshops for coworking spaces'
  })
}

export default async function Workshops(props: Props) {
  const { lang } = await getValidatedParams(props.params)

  try {
    const dictionary = await getDictionary(lang)

    if (!dictionary.workshops) {
      console.error('Workshops section missing in dictionary')
      notFound()
    }

    const { workshops } = dictionary as { workshops: WorkshopData }

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">{workshops.subtitle}</p>
            <h1 className="text-5xl font-bold mb-8">{workshops.title}</h1>
          </div>
        </section>

        {/* Presentations Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary uppercase tracking-wide mb-2">
                  {workshops.presentations.overline}
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  {workshops.presentations.title}
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6">
                  {workshops.presentations.subtitle}
                </h3>
                <p className="mb-6">{workshops.presentations.description}</p>
                <p className="font-semibold mb-6">
                  {workshops.presentations.callout}
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Duration:</strong> {workshops.presentations.details.duration}</p>
                  <p><strong>Includes:</strong> {workshops.presentations.details.includes}</p>
                  <p><strong>Options:</strong> {workshops.presentations.details.options}</p>
                  <p><strong>Suitable For:</strong> {workshops.presentations.details.suitableFor}</p>
                </div>
                <Button className="mt-8">Send an Enquiry</Button>
              </div>
              <div>
                <Image
                  src="/images/workshops/presentations.jpg"
                  alt="Coworking Around the World Presentation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/images/workshops/workshop.jpg"
                  alt="Coworking Workshop Session"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <p className="text-primary uppercase tracking-wide mb-2">
                  {workshops.workshop.overline}
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  {workshops.workshop.title}
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6">
                  {workshops.workshop.subtitle}
                </h3>
                <p className="mb-6">{workshops.workshop.description}</p>
                <p className="font-semibold mb-6">{workshops.workshop.callout}</p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Duration:</strong> {workshops.workshop.details.duration}</p>
                  <p><strong>Includes:</strong> {workshops.workshop.details.includes}</p>
                  <p><strong>Options:</strong> {workshops.workshop.details.options}</p>
                  <p><strong>Suitable For:</strong> {workshops.workshop.details.suitableFor}</p>
                </div>
                <Button className="mt-8">Send an Enquiry</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">
              {workshops.connect.question}
            </h2>
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-2">{workshops.connect.title}</h3>
              <p className="text-gray-600 mb-8">{workshops.connect.subtitle}</p>
              <div className="space-y-4">
                <Button size="lg" asChild>
                  <Link href="/contact">{workshops.connect.cta}</Link>
                </Button>
                <div>
                  <a
                    href="https://www.linkedin.com/in/paulineroussel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {workshops.connect.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Failed to load workshops page:', error)
    notFound()
  }
}

