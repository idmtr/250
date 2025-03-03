import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import OtherProjects from "@/components/OtherProjects";
import { generatePageMetadata } from "@/lib/metadata";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type Props = {
  params: { lang: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  return generatePageMetadata({
    lang,
    path: "/about",
    openGraph: {
      images: [
        {
          url: "https://res.cloudinary.com/ddqw1uuhd/image/upload/v1740302477/images/pages/twofifty-coworkies-founders-portrait_dxrd2e.jpg",
          width: 1200,
          height: 630,
          alt: "TwoFifty Coworking COnsulting Founders",
        },
      ],
    },
    twitter: {
      images: [
        "https://res.cloudinary.com/ddqw1uuhd/image/upload/v1740302477/images/pages/twofifty-coworkies-founders-portrait_dxrd2e.jpg",
      ],
    },
  });
}
export default async function About({ params }: Props) {
  try {
    const validatedParams = await getValidatedParams(params);
    const dictionary = await getDictionary(validatedParams.lang);

    if (!dictionary?.about) {
      console.error("Missing about section in dictionary");
      notFound();
    }

    if (!dictionary?.about?.hero?.title) {
      console.error("About page is missing required fields");
      notFound();
    }

    const { about } = dictionary;

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">
              {dictionary.about.hero.subtitle}
            </p>
            <h1 className="text-5xl font-bold mb-8">
              {dictionary.about.hero.title}
            </h1>
          </div>
        </section>

        {/* Story Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <CloudinaryImage
                  src="images/pages/twofifty-coworkies-founders-portrait_dxrd2e"
                  alt="TwoFifty Workspace"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover"
                  transformation="hero"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{about.hero.subtitle}</h2>
                <div className="prose prose-lg">
                  <p>{about.content.paragraph1}</p>
                  <p>{about.content.paragraph2}</p>
                  <p>{about.content.paragraph3}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Journey
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Global Experience</h3>
                  <p className="text-gray-600">
                    Explored 50 cities and visited 500+ coworking spaces
                    worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Created Coworkies.com - The first coworking-specific job
                    board
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Building</h3>
                  <p className="text-gray-600">
                    Launched the first Coworking Hackathon in London
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet the Founders
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="relative aspect-[3/4] mb-6">
                  <CloudinaryImage
                    src="images/team/pauline-full_onzqiy"
                    alt="Pauline Roussel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    transformation="avatar"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pauline Roussel</h3>
                <p className="text-gray-600 mb-4">Co-founder & CEO</p>
                <p className="text-gray-600 mb-4"></p>
                <a
                  href="https://www.linkedin.com/in/paulineroussel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
              </div>
              <div className="text-center">
                <div className="relative aspect-[3/4] mb-6">
                  <CloudinaryImage
                    src="images/team/dimitar-full_g77zy5"
                    alt="Dimitar Inchev"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    transformation="avatar"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Dimitar Inchev</h3>
                <p className="text-gray-600 mb-4">Co-founder & CTO</p>
                <p className="text-gray-600 mb-4"></p>
                <a
                  href="https://www.linkedin.com/in/inchev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <OtherProjects
          lang={validatedParams.lang}
          dictionary={dictionary.otherProjects}
        />

        {/* Call to Action Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Talk?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book initial consultation with our team, and let's see how we can
              help you.
            </p>
            <Button
              variant="outline"
              className="rounded-full mt-8 px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              {/* <Link href={`/${validatedParams.lang}/contact`}>Get in Touch</Link> */}
              <Link
                href={`https://calendar.app.google/zYZVFkH2prid92Wq5`}
                target="_blank"
              >
                Schedule a Call
              </Link>
            </Button>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to load about page:", error);
    notFound();
  }
}
