"use client";

import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { CldImage } from 'next-cloudinary';
import type { Locale } from "@/i18n-config";

interface BookShowcaseProps {
  lang: Locale;
  dictionary: {
    title: string;
    description: string;
    orderNow: string;
  };
}

export default function BookShowcase({ lang, dictionary }: BookShowcaseProps) {
  if (
    !dictionary ||
    !dictionary.title ||
    !dictionary.description ||
    !dictionary.orderNow
  ) {
    console.error("Invalid book showcase dictionary:", dictionary);
    return null;
  }

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-light mb-6">{dictionary.title}</h2>
            <p className="text-gray-600 mb-8">{dictionary.description}</p>
            <a
              href="https://coworkiesbook.com?ref=twofifty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-full mt-8 px-8 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all duration-300"
              >
                {dictionary.orderNow}
              </Button>
            </a>
          </div>
          <div className="relative h-[400px]">
            <CldImage
              src="images/pages/coworking-book-cover_yusy5e.jpg"
              alt="Around the World in 250 Coworking Spaces book"
              fill
              className="object-contain"
              transformation="optimized"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
