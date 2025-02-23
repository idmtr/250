"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n-config";

interface OurStoryProps {
  lang: Locale;
  dictionary: {
    ourStory: {
      title: string;
      subtitle: string;
      points: string[];
      getInTouch: string;
    };
  };
}

export default function OurStory({ lang, dictionary }: OurStoryProps) {
  if (!dictionary.ourStory.title || !dictionary.ourStory.points) {
    console.error("Invalid our story dictionary:", dictionary);
    return null;
  }
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-light mb-8">
              {dictionary.ourStory.title}
            </h2>
            <h3 className="text-2xl font-light mb-6">
              {dictionary.ourStory.subtitle}
            </h3>
            <ul className="space-y-4 text-gray-600">
              {dictionary.ourStory.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="rounded-full mt-8 px-8 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all duration-300"
              asChild
            >
              <Link href={`/${lang}/about`}>{dictionary.ourStory.aboutUs}</Link>
            </Button>
          </div>
          <div className="relative h-[600px]">
            <Image
              src="https://res.cloudinary.com/ddqw1uuhd/image/upload/v1740302477/images/pages/twofifty-coworkies-founders-portrait_dxrd2e.jpg"
              alt="TwoFifty team"
              fill
              className="object-cover rounded-lg"
              transformation="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
