import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);

  return generatePageMetadata({
    lang,
    path: "/get-feedback",
    title: "Get Feedback | TwoFifty Consulting",
    description: "Professional feedback services for coworking spaces",
  });
}

export default async function GetFeedback(props: Props) {
  const { lang } = await getValidatedParams(props.params);

  try {
    const dictionary = await getDictionary(lang);

    if (!("getFeedback" in dictionary)) {
      throw new Error("The dictionary does not contain a getFeedback section");
    }

    const { getFeedback } = dictionary as {
      getFeedback: {
        hero: { overline: string; title: string };
        feedback: {
          title: string;
          subtitle: string;
          heading: string;
          description: string;
          callout: string;
          details: {
            duration: string;
            includes: string;
            options: string;
            suitableFor: string;
          };
        };
        connect: {
          question: string;
          title: string;
          subtitle: string;
          cta: string;
          linkedin: string;
        };
      };
    };

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">{getFeedback.hero.overline}</p>
            <h1 className="text-5xl font-bold mb-8">
              {getFeedback.hero.title}
            </h1>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {getFeedback.feedback.title}
                </h2>
                <h3 className="text-2xl mb-2">
                  {getFeedback.feedback.subtitle}
                </h3>
                <h4 className="text-xl text-gray-600 mb-6 whitespace-pre-line">
                  {getFeedback.feedback.heading}
                </h4>
                <p className="text-lg mb-6">
                  {getFeedback.feedback.description}
                </p>
                <p className="font-bold mb-8">{getFeedback.feedback.callout}</p>

                <div className="space-y-2 text-gray-600 mb-8">
                  <p>
                    <strong>Duration:</strong>{" "}
                    {getFeedback.feedback.details.duration}
                  </p>
                  <p>
                    <strong>Includes:</strong>{" "}
                    {getFeedback.feedback.details.includes}
                  </p>
                  <p>
                    <strong>Options:</strong>{" "}
                    {getFeedback.feedback.details.options}
                  </p>
                  <p>
                    <strong>Suitable For:</strong>{" "}
                    {getFeedback.feedback.details.suitableFor}
                  </p>
                </div>

                <Button asChild>
                  <Link href="/contact">Send an Enquiry</Link>
                </Button>
              </div>
              <div>
                <CloudinaryImage
                  src="images/pages/coworkies-manhattan-coworking-event_nblqwa"
                  alt="Around the world"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  transformation="hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">
              {getFeedback.connect.question}
            </h2>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-2">
                {getFeedback.connect.title}
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                {getFeedback.connect.subtitle}
              </p>
              <div className="space-y-4">
                <Button size="lg" asChild>
                  <Link href="/contact">{getFeedback.connect.cta}</Link>
                </Button>
                <div>
                  <a
                    href="https://www.linkedin.com/in/paulineroussel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {getFeedback.connect.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to load get-feedback page:", error);
    notFound();
  }
}
