'use client'

// import { useEffect } from 'react'
import { useHydrationDebug } from './debug-config'
import type { Locale } from "@/i18n-config"
import type { Dictionary } from "@/types/dictionary"
import Consulting from "@/components/Consulting"
import Education from "@/components/Education"
import ClientLogos from "@/components/ClientLogos"
import FieldsOfWork from "@/components/FieldsOfWork"
import OurStory from "@/components/OurStory"
import BookShowcase from "@/components/BookShowcase"
import OtherProjects from "@/components/OtherProjects"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/Icons"
import Link from 'next/link'
import BlogGrid from '@/components/blog/BlogGrid'
import type { Post } from '@/types/blog'
// import Image from 'next/image'

interface HomeProps {
  params: { lang: Locale }
  dictionary: Dictionary
  recentPosts?: Post[]
}

export default function Home({ params: { lang }, dictionary, recentPosts }: HomeProps) {
  // Add hydration debugging in development
  // if (process.env.NODE_ENV !== 'production') {
  //   useHydrationDebug()
  // }

  // useEffect(() => {
  //   // Log client-side render details
  //   console.log('Client Component Mount:', {
  //     lang,
  //     hasHero: !!dictionary?.hero,
  //     elementClasses: {
  //       html: document.documentElement.className,
  //       body: document.body.className
  //     }
  //   })
  // }, [lang, dictionary])

  // Validate dictionary data
  if (!dictionary?.hero?.title) {
    console.error('Invalid or missing hero section in dictionary:', dictionary)
    return null
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EBE0] to-[#D4A373]">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coworking-presentation.jpg-V0uz2E37Yf7fWGJeS3cSSEz8MoP9N9.jpeg')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative container mx-auto px-6 z-10"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl text-[#1F1F1F] font-light leading-tight"
            >
              {dictionary.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-[#1F1F1F]/80 font-light max-w-2xl mx-auto"
            >
              {dictionary.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href="#fields-of-work" scroll={true}>
                <Button variant="default" size="lg" className="group">
                  {dictionary.hero.learnMore}
                  <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                </Link>
                <Link href={`/${lang}/contact`}>
                  <Button variant="outline" size="lg" className="group">
                    {dictionary.hero.getInTouch}
                    <Icons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {dictionary.consulting && (
        <Consulting 
          lang={lang} 
          dictionary={dictionary.consulting} 
        />
      )}
      {dictionary.education && (
        <Education 
          lang={lang} 
          dictionary={dictionary.education} 
        />
      )}
      {dictionary.clientLogos && (
        <ClientLogos 
          lang={lang} 
          dictionary={dictionary.clientLogos} 
        />
      )}
      {dictionary.fieldsOfWork && (
        <FieldsOfWork 
          lang={lang} 
          dictionary={dictionary.fieldsOfWork} 
        />
      )}
      {dictionary.ourStory && (
        <OurStory 
          lang={lang} 
          dictionary={{ ourStory: dictionary.ourStory }} 
        />
      )}
      {dictionary.bookShowcase && (
        <BookShowcase 
          lang={lang} 
          dictionary={dictionary.bookShowcase} 
        />
      )}
      {dictionary.otherProjects && (
        <OtherProjects 
          lang={lang} 
          dictionary={dictionary.otherProjects} 
        />
      )}

      {recentPosts && recentPosts.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider">
                  {dictionary.blog?.title || 'INSIGHTS'}
                </span>
                <h2 className="text-4xl font-bold mt-2 mb-6">
                  {dictionary.blog?.subtitle || 'Latest from Our Blog'}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {dictionary.blog?.description || 'Discover insights, trends, and best practices in coworking and flexible workspace management.'}
                </p>
              </div>
              <BlogGrid posts={recentPosts} lang={lang} />
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/${lang}/blog`}>
                    {dictionary.blog?.viewAll || 'View All Posts'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
