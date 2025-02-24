import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { getValidatedParams } from "@/lib/params-helper";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);

  return generatePageMetadata({
    lang,
    path: "/mission",
  });
}

export default async function MissionPage(props: Props) {
  const { lang } = await getValidatedParams(props.params);
  const dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-6">
          <p className="text-primary mb-4">{dictionary.about.hero.subtitle}</p>
          <h1 className="text-5xl font-bold mb-8">
            {dictionary.about.hero.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <CloudinaryImage
                src="images/pages/twofifty-coworkies-founders-portrait_dxrd2e"
                alt="TwoFifty Co coworking consulting Team"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {dictionary.mission.mainHeading}
              </h2>
              <p className="text-lg text-gray-600">
                {dictionary.mission.mainDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {dictionary.mission.valuesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dictionary.mission.values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {dictionary.mission.ctaTitle}
          </h2>
          <p className="text-xl mb-8">{dictionary.mission.ctaDescription}</p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-primary hover:bg-primary hover:text-white border-2 border-white transition-colors"
          >
            {dictionary.mission.ctaButton}
          </Button>
        </div>
      </section>
    </main>
  );
}
