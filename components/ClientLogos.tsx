"use client";

// import Image from "next/image"
import { CldImage } from 'next-cloudinary';
import type { Locale } from "@/i18n-config";

interface ClientLogosProps {
  lang: Locale;
  dictionary: {
    title: string;
    subtitle: string;
  };
}

export default function ClientLogos({ lang, dictionary }: ClientLogosProps) {
  if (!dictionary || !dictionary.title || !dictionary.subtitle) {
    console.error("Invalid client logos dictionary:", dictionary);
    return null;
  }
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-light text-center mb-12">
          {dictionary.title}
        </h2>
        <p className="text-center text-gray-600 mb-12">{dictionary.subtitle}</p>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"> */}
        {/* {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-center group">
              <Image
                src="/placeholder.svg?height=80&width=160"
                alt={`Client logo ${i + 1}`}
                width={160}
                height={80}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))} */}
        <div className="relative rounded-md h-[600px]">
          <CldImage
            src="images/pages/two-fifty-co-bw-sml_qn74ma"
            alt="Coworking consulting companies/brands we’ve collaborated"
            fill
            className="object-contain drop-shadow-2xl rounded-md opacity-75 rounded-lg"
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
