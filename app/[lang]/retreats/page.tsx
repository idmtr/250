import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  return generatePageMetadata({
    lang,
    path: "/retreats",
    title: dictionary.retreats?.heroTitle || "Retreats | TwoFifty Consulting",
    description:
      dictionary.retreats?.heroDescription ||
      "Join our transformative coworking retreats",
  });
}

export default async function RetreatsPage(props: Props) {
  // Validate params first
  const { lang } = await getValidatedParams(props.params);

  try {
    const dictionary = await getDictionary(lang);
    if (!dictionary.retreats) {
      notFound();
    }

    const { retreats } = dictionary;

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary mb-4">
                  {retreats.heroSubtitle}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {retreats.heroTitle}
                </h1>
                <p className="text-xl mb-8">
                  <strong>{retreats.heroDate}</strong>
                  <br />
                  {retreats.heroDescription}
                </p>
                <Button size="lg" className="mt-4">
                  {retreats.cta.buttonText}
                </Button>
              </div>
              <div>
                <CloudinaryImage
                  src="images/pages/The-Community-Managers-Retreat_cgq1ct"
                  alt="Coworking Retreat in Morocco"
                  width={1080}
                  height={720}
                  className="rounded-lg shadow-lg"
                  priority
                  transformation="hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {retreats.whatYouGet.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {retreats.whatYouGet.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-primary text-xl">✓</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              {retreats.program.title}
            </h2>
            <p className="text-xl mb-12">{retreats.program.subtitle}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {retreats.program.days.map((day, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold mb-4">{day.title}</h3>
                  <ul className="space-y-2">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilitators Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {retreats.facilitators.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {retreats.facilitators.team.map((member, index) => (
                <div key={index} className="flex space-x-6">
                  <CloudinaryImage
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                    transformation="avatar"
                  />
                  <div>
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {retreats.location.title}
                </h2>
                <p className="text-xl mb-8">{retreats.location.description}</p>
                <ul className="space-y-4">
                  {retreats.location.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-primary">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CloudinaryImage
                  src="images/pages/morocco-coworking-retreat_jqq3n2"
                  alt="Retreat Location in Marrakesh"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  transformation="hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              {retreats.pricing.title}
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-4xl font-bold text-primary mb-4">
                {retreats.pricing.regular}
              </p>
              <p className="text-xl mb-8">{retreats.pricing.early}</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Includes:</h3>
                <ul className="space-y-2">
                  {retreats.pricing.includes.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center space-x-2"
                    >
                      <span className="text-primary">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{retreats.cta.title}</h2>
            <p className="text-xl mb-8">{retreats.cta.subtitle}</p>
            <Button size="lg" variant="secondary" asChild>
              <a
                href="https://calendar.app.google/PSN9iAbAduDKjEpj8"
                target="_blank"
                rel="noopener noreferrer"
              >
                {retreats.cta.buttonText}
              </a>
            </Button>
            <p className="mt-6 text-white/80">{retreats.cta.secondaryText}</p>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to load retreats page:", error);
    notFound();
  }
}
