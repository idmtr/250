import { generatePageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { getValidatedParams } from "@/lib/params-helper";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Handshake,
  ClipboardList,
  Target,
  LineChart,
  Settings,
  Users,
  Network,
  LeafyGreen,
  Layers,
  Workflow,
  Users2,
} from "lucide-react";

// Define TypeScript types for the dictionary structure
interface ConsultingServicesDict {
  hero_section: {
    image: { src: string; alt: string; class: string };
    content: {
      badge: string;
      title: { line1: string; line2: string; line3: string }; // Structured title
      services_list_label: string;
      services_list: string[];
      cta_buttons: { text: string; href: string; target?: string }[];
      trust_indicators: {
        text: string;
        stats: { value: string; label: string }[];
      };
    };
  };
  benefits_section: {
    header: { label: string; title: string; description: string };
    benefits: { title: string; description: string; icon?: string }[];
    cta: {
      image: { src: string; alt: string; class: string };
      title: string;
      description: string;
      buttons: { text: string; href: string; target?: string }[];
    };
  };
  expert_services_section: {
    label: string;
    title: string;
    description: string;
  };
  process_section: {
    header: { label: string; title: string; description: string };
    steps: { title: string; description: string; icon?: string }[];
    cta: {
      image: { src: string; alt: string; class: string };
      title: string;
      description: string;
      buttons: { text: string; href: string; target?: string }[];
    };
  };
  focus_section: {
    header: { label: string; title: string; description: string };
    focus_areas: { title: string; description: string; icon?: string }[];
    cta: {
      image: { src: string; alt: string; class: string };
      title: string;
      description: string;
      button: { text: string; href: string; target?: string };
    };
  };
  faq_section: {
    title: string;
    description: string;
    faqs: { question: string; answer: string }[];
  };
  cta_section: {
    title: string;
    description: string;
    buttons: { text: string; href: string; target?: string; icon: string }[];
  };
  meta: { title: string; description: string };
}

type Props = {
  params: { lang: Locale };
};

// Metadata generation with translations
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  const t = await getDictionary(lang);
  const cs = t.consulting_services as ConsultingServicesDict;
  const route = routes["coworking-consulting"];

  // Fallback metadata if cs or cs.meta is undefined
  const meta = cs?.meta || {
    title: "Expert Coworking Consulting Services | TwoFifty",
    description:
      "Optimize your flexible workspace operations with TwoFifty's expert coworking consulting services.",
  };

  return generatePageMetadata({
    lang,
    path: route.localized[lang].path,
    title: meta.title,
    description: meta.description,
  });
}

// Icon mapping utility
const iconMap: Record<string, JSX.Element> = {
  Handshake: <Handshake className="w-6 h-6 text-primary" />,
  ClipboardList: <ClipboardList className="w-6 h-6 text-primary" />,
  Target: <Target className="w-6 h-6 text-primary" />,
  LineChart: <LineChart className="w-6 h-6 text-primary" />,
  Settings: <Settings className="w-6 h-6 text-primary" />,
  Users: <Users className="w-6 h-6 text-primary" />,
  Network: <Network className="w-6 h-6 text-primary" />,
  LeafyGreen: <LeafyGreen className="w-6 h-6 text-primary" />,
  Layers: <Layers className="w-6 h-6 text-primary" />,
  Workflow: <Workflow className="w-6 h-6 text-primary" />,
  Users2: <Users2 className="w-6 h-6 text-primary" />,
};

// Main component
export default async function ConsultingServices({ params }: Props) {
  const { lang } = await getValidatedParams(params);
  const t = await getDictionary(lang);
  const cs = t.consulting_services as ConsultingServicesDict;

  // Map arrays with icons from JSON or fallback to defaults
  const faqs = cs.faq_section.faqs;
  const processSteps = cs.process_section.steps.map((step, index) => ({
    ...step,
    icon: step.icon
      ? iconMap[step.icon]
      : [
          iconMap.Handshake,
          iconMap.ClipboardList,
          iconMap.Target,
          iconMap.LineChart,
        ][index],
  }));
  const benefits = cs.benefits_section.benefits.map((benefit, index) => ({
    ...benefit,
    icon: benefit.icon
      ? iconMap[benefit.icon]
      : [iconMap.Settings, iconMap.Users, iconMap.Network][index],
  }));
  const focusAreas = cs.focus_section.focus_areas.map((area, index) => ({
    ...area,
    icon: area.icon
      ? iconMap[area.icon]
      : [iconMap.LeafyGreen, iconMap.Layers, iconMap.Workflow, iconMap.Users2][
          index
        ],
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen">
          <CloudinaryImage
            src={cs.hero_section.image.src}
            alt={cs.hero_section.image.alt}
            fill
            className={cs.hero_section.image.class}
            priority
            transformation="hero"
          />
          <div className="absolute inset-0 bg-[#7f614470]" />
        </div>
        <div className="w-full lg:w-1/2 flex items-center bg-gradient-to-br from-[#7f6144] to-[#d4a373]">
          <div className="w-full max-w-2xl mx-auto px-6 py-12 lg:py-0">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20">
                {cs.hero_section.content.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                <span className="block mb-2">
                  {cs.hero_section.content.title.line1}
                </span>
                <span className="block text-primary">
                  {cs.hero_section.content.title.line2}
                </span>
                <span className="block">
                  {cs.hero_section.content.title.line3}
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-white/80 font-medium">
                  {cs.hero_section.content.services_list_label}
                </p>
                <div className="flex flex-wrap gap-3">
                  {cs.hero_section.content.services_list.map(
                    (service, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium hover:bg-white/15 transition-colors"
                      >
                        {service}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {cs.hero_section.content.cta_buttons.map((btn, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant={index === 0 ? "outline" : "secondary"}
                    className={`w-full sm:w-auto ${
                      index === 1 ? "border-white/20 hover:bg-white/50" : ""
                    }`}
                    asChild
                  >
                    <Link href={btn.href} target={btn.target}>
                      {btn.text}
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-white/60 mb-4">
                  {cs.hero_section.content.trust_indicators.text}
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  {cs.hero_section.content.trust_indicators.stats.map(
                    (stat, index) => (
                      <div key={index}>
                        <span className="text-2xl text-white/80">
                          {stat.value}
                        </span>
                        <span className="text-sm text-white/60 ml-2">
                          {stat.label}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                {cs.benefits_section.header.label}
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                {cs.benefits_section.header.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {cs.benefits_section.header.description}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-2xl p-8">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <CloudinaryImage
                  src={cs.benefits_section.cta.image.src}
                  alt={cs.benefits_section.cta.image.alt}
                  fill
                  className={cs.benefits_section.cta.image.class}
                  transformation="hero"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  {cs.benefits_section.cta.title}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {cs.benefits_section.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {cs.benefits_section.cta.buttons.map((btn, index) => (
                    <Button
                      key={index}
                      size="lg"
                      variant={index === 0 ? "default" : "outline"}
                      asChild
                    >
                      <Link href={btn.href} target={btn.target}>
                        {btn.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-bold">
              {cs.expert_services_section.label}
            </span>
            <h2 className="text-3xl font-bold mb-6">
              {cs.expert_services_section.title}
            </h2>
            <p className="text-gray-600 mb-8">
              {cs.expert_services_section.description}
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                {cs.process_section.header.label}
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                {cs.process_section.header.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {cs.process_section.header.description}
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {step.icon}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <CloudinaryImage
                  src={cs.process_section.cta.image.src}
                  alt={cs.process_section.cta.image.alt}
                  fill
                  className={cs.process_section.cta.image.class}
                  transformation="hero"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">
                  {cs.process_section.cta.title}
                </h3>
                <p className="text-gray-600 mb-8">
                  {cs.process_section.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {cs.process_section.cta.buttons.map((btn, index) => (
                    <Button
                      key={index}
                      size="lg"
                      variant={index === 0 ? "default" : "outline"}
                      asChild
                    >
                      <Link href={btn.href} target={btn.target}>
                        {btn.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Focus Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                {cs.focus_section.header.label}
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                {cs.focus_section.header.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {cs.focus_section.header.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {area.icon}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <CloudinaryImage
                  src={cs.focus_section.cta.image.src}
                  alt={cs.focus_section.cta.image.alt}
                  fill
                  className={cs.focus_section.cta.image.class}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">
                  {cs.focus_section.cta.title}
                </h3>
                <p className="text-gray-600 mb-8">
                  {cs.focus_section.cta.description}
                </p>
                <Button size="lg" variant="default" asChild>
                  <Link
                    href={cs.focus_section.cta.button.href}
                    target={cs.focus_section.cta.button.target}
                  >
                    {cs.focus_section.cta.button.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {cs.faq_section.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {cs.faq_section.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">{cs.cta_section.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {cs.cta_section.description}
          </p>
          <div className="flex flex-col gap-4 items-center justify-center sm:flex-row sm:justify-center">
            {cs.cta_section.buttons.map((btn, index) => (
              <Button
                key={index}
                asChild
                variant="ghost"
                className="rounded-full px-12 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-bold transition-all duration-300 transform hover:scale-105"
              >
                <a
                  href={btn.href}
                  target={btn.target}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    {btn.icon === "calendar" && (
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
                    )}
                    {btn.icon === "linkedin" && (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    )}
                    {btn.icon === "email" && (
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
                    )}
                  </div>
                  {btn.text}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
