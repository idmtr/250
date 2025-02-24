import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
// import CustomImage from "@/components/CustomImage";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/url-utils";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  // Get the current route config
  const contactRoute = routes.contact;
  const currentPath = contactRoute.localized[lang].path;

  return generatePageMetadata({
    lang,
    path: currentPath, // Use the localized path
  });
}

export default async function ContactPage(props: Props) {
  const { lang } = await getValidatedParams(props.params);

  try {
    const dictionary = await getDictionary(lang);
    const { contact } = dictionary;

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-6">
            <p className="text-primary mb-4">{contact.hero.overline}</p>
            <h1 className="text-5xl font-bold mb-8">{contact.hero.title}</h1>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[600px]">
                <CloudinaryImage
                  src="images/pages/contact-us-space_h1ey90"
                  alt="Team TwoFift.co"
                  fill
                  className="object-cover rounded-lg"
                  transformation="hero"
                />
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {contact.content.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {contact.content.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start p-4 hover:bg-primary/5 transition-colors group"
                  >
                    <a
                      href="https://calendar.app.google/zYZVFkH2prid92Wq5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {contact.content.links.call}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start p-4 hover:bg-primary/5 transition-colors group"
                  >
                    <a
                      href="https://www.linkedin.com/in/paulineroussel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </div>
                      {contact.content.links.linkedin}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start p-4 hover:bg-primary/5 transition-colors group"
                  >
                    <a
                      href="mailto:hello@twofifty.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {contact.content.links.email}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to load contact page:", error);
    notFound();
  }
}
