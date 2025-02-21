'use client'

import { Briefcase, Users, MessageCircle } from "lucide-react"
import type { Locale } from '@/i18n-config'

interface FieldsOfWorkProps {
  lang: Locale
  dictionary: {
    title: string
    consulting: {
      title: string
      description: string
    }
    communityBuilding: {
      title: string
      description: string
    }
    eventsContent: {
      title: string
      description: string
    }
  }
}


export default function FieldsOfWork({ lang, dictionary }: FieldsOfWorkProps) {
  if (!dictionary || !dictionary.title || !dictionary.consulting || !dictionary.communityBuilding || !dictionary.eventsContent) {
    console.error('Invalid fields of work dictionary:', dictionary)
    return null
  }
  const fields = [ 
    {
      icon: <Briefcase className="w-16 h-16 text-primary" />,
      title: dictionary.consulting.title,
      description: dictionary.consulting.description,
    },
    {
      icon: <Users className="w-16 h-16 text-primary" />,
      title: dictionary.communityBuilding.title,
      description: dictionary.communityBuilding.description,
    },
    {
      icon: <MessageCircle className="w-16 h-16 text-primary" />,
      title: dictionary.eventsContent.title,
      description: dictionary.eventsContent.description,
    },
  ]

  return (
    <section id="fields-of-work" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-center mb-16">{dictionary.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {fields.map((item, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg hover:bg-accent/30 transition-colors duration-300 group"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
              <h3 className="text-2xl font-light mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

