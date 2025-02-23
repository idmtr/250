"use client";

import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/common/SmartImage";
import Link from "next/link";

import type { Locale } from "@/i18n-config";

interface ConsultingProps {
  lang: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    description: string;
    learnMore: string;
  };
}

export default function Consulting({ lang, dictionary }: ConsultingProps) {
  if (
    !dictionary ||
    !dictionary.title ||
    !dictionary.subtitle ||
    !dictionary.description ||
    !dictionary.learnMore
  ) {
    console.error("Invalid consulting dictionary:", dictionary);
    return null;
  }
  return (
    <section id="consulting" className="py-32 relative overflow-hidden">
      <div className="absolute -right-1/30 top-0 text-gray-50 text-[200px] font-bold leading-none select-none">
        TWOFIFTY
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-blue-600 tracking-wide font-light">
                CONSULTING
              </div>
              <h2 className="text-4xl md:text-5xl font-light">
                {dictionary.title}
              </h2>
              <p className="text-xl text-gray-600 font-light">
                {dictionary.subtitle}
              </p>
            </div>
            <p className="text-gray-600 font-light leading-relaxed">
              {dictionary.description}
            </p>
            <Button
              variant="outline"
              className="rounded-full px-8 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all duration-300"
              asChild
            >
              <Link href={`/${lang}/coworking-consulting-services`}>
                {dictionary.learnMore}
              </Link>
            </Button>
          </div>
          <div className="relative h-[600px] group">
            <SmartImage
              src="/images/pages/twofifty-coworking-consulting-service.jpg"
              alt="Coworking space consultation"
              fill
              className="object-cover rounded-lg transition-transform duration-500 opacity-80 group-hover:scale-105"
              transformation="hero"
              priority
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
