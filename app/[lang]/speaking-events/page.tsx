import { notFound } from "next/navigation"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/get-dictionary"
import { getValidatedParams } from "@/lib/params-helper"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

type Props = {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params)
  
  return generatePageMetadata({ 
    lang,
    path: '/speaking-events',
    title: 'Speaking Events | TwoFifty Consulting',
    description: 'Upcoming and past speaking events about coworking and digital transformation'
  })
}

export default async function SpeakingEvents(props: Props) {
  const { lang } = await getValidatedParams(props.params)

  try {
    const dictionary = await getDictionary(lang)
    const { speakingEvents } = dictionary

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">{speakingEvents.hero.overline}</p>
            <h1 className="text-5xl font-bold mb-8">{speakingEvents.hero.title}</h1>
          </div>
        </section>

        {/* Moderate Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {speakingEvents.moderate.title}
                </h2>
                <h3 className="text-2xl mb-2">{speakingEvents.moderate.subtitle}</h3>
                <h4 className="text-xl text-gray-600 mb-6">
                  {speakingEvents.moderate.venue}
                </h4>
                <div className="prose max-w-none mb-6">
                  <p>{speakingEvents.moderate.description}</p>
                  <ul>
                    {speakingEvents.moderate.speakers.map((speaker, index) => (
                      <li key={index}>{speaker}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={speakingEvents.moderate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Event
                </a>
              </div>
              <div>
                <Image
                  src="/images/speaking/vivatech.jpg"
                  alt="Future of Work Panel at Vivatech"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Presentations Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {speakingEvents.presentations.title}
                </h2>
                <h3 className="text-2xl mb-2">
                  {speakingEvents.presentations.subtitle}
                </h3>
                <h4 className="text-xl text-gray-600 mb-6">
                  {speakingEvents.presentations.venue}
                </h4>
                <p className="text-lg">{speakingEvents.presentations.description}</p>
              </div>
              <div>
                <Image
                  src="/images/speaking/conferences.jpg"
                  alt="Speaking at Coworking Conferences"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Educate Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {speakingEvents.educate.title}
                </h2>
                <h3 className="text-2xl mb-2">{speakingEvents.educate.subtitle}</h3>
                <h4 className="text-xl text-gray-600 mb-6">
                  {speakingEvents.educate.venue}
                </h4>
                <p className="text-lg">{speakingEvents.educate.description}</p>
              </div>
              <div>
                <Image
                  src="/images/speaking/educate.jpg"
                  alt="Private Events and Meetups"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hackathon Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2">
              {speakingEvents.hackathon.title}
            </h2>
            <h3 className="text-2xl mb-2">{speakingEvents.hackathon.subtitle}</h3>
            <h4 className="text-xl text-gray-600 mb-6">
              {speakingEvents.hackathon.venue}
            </h4>
            <p className="text-lg mb-12">{speakingEvents.hackathon.description}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Image
                  key={i}
                  src={`/images/speaking/hackathon-${i}.jpg`}
                  alt={`Coworking Hackathon ${i}`}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-2">
                {speakingEvents.connect.title}
              </h2>
              <h3 className="text-2xl mb-6">{speakingEvents.connect.subtitle}</h3>
              <p className="text-lg mb-8">{speakingEvents.connect.description}</p>
              <Button size="lg" asChild>
                <Link href="/contact">{speakingEvents.connect.cta}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error('Failed to load speaking events page:', error)
    notFound()
  }
}

