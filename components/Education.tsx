"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";

interface EducationProps {
  lang: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    description: string;
    discoverMore: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function Education({ lang, dictionary }: EducationProps) {
  if (
    !dictionary ||
    !dictionary.title ||
    !dictionary.subtitle ||
    !dictionary.description ||
    !dictionary.discoverMore ||
    !Array.isArray(dictionary.items)
  ) {
    console.error("Invalid education dictionary:", dictionary);
    return null;
  }

  return (
    <section id="education" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute -left-1/30 top-0 text-primary/5 text-[200px] font-bold leading-none select-none">
        COWORKING
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] order-2 md:order-1 group">
            <Image
              src="/images/pages/twofiflty-workshops2.png"
              alt="What is coworking workshop session"
              fill
              className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              transformation="hero"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <div className="text-primary tracking-wide font-light">
                EDUCATION
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
              <Link href={`/${lang}/education`}>{dictionary.discoverMore}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
