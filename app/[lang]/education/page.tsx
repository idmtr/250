import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://twofifty.co";

  // Type guard for education section
  if (!dictionary.education?.meta) {
    return {
      title: "Education | TwoFifty Consulting",
      description: "Educational services and workshops",
    };
  }

  // If meta data exists, use it
  const { meta } = dictionary.education;

  return {
    title: meta.title || "Education | TwoFifty Consulting",
    description: meta.description || "Educational services and workshops",
  };
}

export default async function Education(props: Props) {
  const { lang } = await getValidatedParams(props.params);

  try {
    const dictionary = await getDictionary(lang);

    if (!dictionary.education) {
      console.error("Education section missing in dictionary");
      notFound();
    }

    const { education } = dictionary;

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">{education.hero.overline}</p>
            <h1 className="text-5xl font-bold mb-8">{education.hero.title}</h1>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary uppercase tracking-wide mb-2">
                  {education.process.title}
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  {education.process.subtitle}
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6">
                  {education.process.heading}
                </h3>
                <p className="text-lg">{education.process.description}</p>
              </div>
              <div>
                <CloudinaryImage
                  src="images/pages/coworking-education-workshhop-copenhagen-2_d8whyn"
                  alt="Coworkies Coworking Workshop Presentation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  transformation="hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Job Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <CloudinaryImage
                  src="images/pages/coworking-education-workshhop-copenhagen-2_d8whyn"
                  alt="Coworking Workshop Group Work"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  transformation="hero"
                />
              </div>
              <div>
                <p className="text-primary uppercase tracking-wide mb-2">
                  {education.job.title}
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  {education.job.subtitle}
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6">
                  {education.job.heading}
                </h3>
                <p className="text-lg">{education.job.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                {education.connect.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {education.connect.subtitle}
              </p>
              <div className="space-y-4">
                <Button size="lg" asChild>
                  <Link href={`/${lang}/contact`}>{education.connect.cta}</Link>
                </Button>
                <div>
                  <a
                    href="https://www.linkedin.com/in/paulineroussel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {education.connect.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to load education page:", error);
    notFound();
  }
}
