import { generatePageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { getValidatedParams } from "@/lib/params-helper";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import Link from "next/link";
import { Calendar } from "lucide-react";
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

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);
  const route = routes["coworking-consulting"]; // Add this to routes.ts

  return generatePageMetadata({
    lang,
    path: route.localized[lang].path,
    // title: dictionary.consulting.meta.title,
    // description: dictionary.consulting.meta.description,
    title: "Expert Coworking Consulting Services | TwoFifty",
    description:
      "Optimize your flexible workspace operations with TwoFifty's expert coworking consulting services. Specializing in operations, sales, community building, and more.",
  });
}

export default async function ConsultingServices({ params }: Props) {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  const faqs = [
    {
      q: "What Makes TwoFifty's Coworking Consulting Unique?",
      a: "Our Coworking Consulting services stand out for their focus on sustainability, adaptability, and community engagement. We don't offer one-size-fits-all solutions; instead, we tailor our consulting to meet the unique needs and objectives of each client.",
    },
    {
      q: "How Does the Initial Consultation Work?",
      a: "The initial consultation is a free session where we discuss your needs, assess your current workspace, and identify key areas for improvement. This sets the foundation for our customized Coworking Consulting plan tailored to your goals.",
    },
    {
      q: "What is Included in the Customized Plan?",
      a: "Our customized Coworking Consulting plan includes a range of services like space optimization, process streamlining, team dynamics enhancement, and community engagement strategies. Each plan comes with a clear timeline and estimated budget.",
    },
    {
      q: "How Long Does a Typical Consulting Project Take?",
      a: "The duration of our Coworking Consulting projects varies depending on the scope and specific needs of the client. However, you can expect a project timeline to be discussed and agreed upon during the initial consultation.",
    },
    {
      q: "Do You Offer Training for Teams?",
      a: "Yes, training is a crucial part of our Coworking Consulting services. We provide comprehensive training sessions to educate your team on new systems, best practices, and how to maintain an engaging, productive workspace.",
    },
    {
      q: "How Do You Ensure Sustainability in Coworking Spaces?",
      a: "Sustainability is a core focus of our Coworking Consulting. We guide you in making eco-friendly choices from energy-efficient designs to waste-reducing processes, all aimed at creating a workspace that is both environmentally and economically sustainable.",
    },
  ];

  const processSteps = [
    {
      title: "Initial Consultation",
      description:
        "Start by scheduling a free initial consultation with our Coworking Consulting Team. During this session, we'll assess your needs, discuss your vision, and identify the key areas that could benefit from our specialized services.",
      icon: <Handshake className="w-6 h-6 text-primary" />,
    },
    {
      title: "Customized Plan Creation",
      description:
        "Based on our initial discussion, we develop a customized consulting plan tailored to your unique challenges and objectives. This includes recommended changes, a project timeline, and an estimated budget to provide a clear roadmap for the journey ahead.",
      icon: <ClipboardList className="w-6 h-6 text-primary" />,
    },
    {
      title: "Implementation and Training",
      description:
        "The next step in our Coworking Consulting service involves putting the plan into action. From optimizing operational processes to redesigning workspace layouts, we oversee each aspect, ensuring it aligns with our sustainability and adaptability guidelines. We also provide training sessions to educate your team on best practices and new systems.",
      icon: <Target className="w-6 h-6 text-primary" />,
    },
    {
      title: "Post-Project Evaluation and Support",
      description:
        "Our commitment doesn't end with project completion. We conduct a thorough post-project evaluation to measure success and identify any areas for further improvement. You'll also have access to ongoing support and updates to ensure your coworking space continues to flourish.",
      icon: <LineChart className="w-6 h-6 text-primary" />,
    },
  ];

  const benefits = [
    {
      title: "Streamline Processes",
      description:
        "We'll analyze your current operational workflow and pinpoint areas for improvement. By optimizing term-structure, administrative tasks, implementing automation, and promoting efficient space utilization, we help you save time for important tasks and run a leaner, more effective operation. The result is a smoother experience for everyone involved — from management to members.",
      icon: <Settings className="w-6 h-6 text-primary" />,
    },
    {
      title: "Enhance Team Dynamics",
      description:
        "Our Coworking Consulting services don't just focus on physical space; we dive deep into the interpersonal dynamics that make or break a coworking community. Through team-building exercises, collaborative workspace design, and industry-tested approaches, we foster an environment where teams can excel. Boost the collaborative spirit of your workspace and see the team spirit and productivity soar.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Boost Community Engagement",
      description:
        "Our belief is that a nurtured and taken care of community is the heart of any successful coworking space. Our Coworking Consulting services include strategies to engage your members through events, workshops, and digital platforms. We create a sense of belonging and interconnectivity that not only retains existing members but also attracts new ones. Elevate your shared workspace from a mere office to a thriving, engaged community.",
      icon: <Network className="w-6 h-6 text-primary" />,
    },
  ];

  const focusAreas = [
    {
      title: "Sustainable Coworking Solutions",
      description:
        "Sustainability isn't just an environmental concern; it's a business imperative. Our Coworking Consulting services employ cutting-edge practices to ensure your workspace is both environmentally friendly and economically viable. From energy-efficient designs to waste-reducing processes, we guide you in making sustainable choices that benefit your bottom line.",
      icon: <LeafyGreen className="w-6 h-6 text-primary" />,
    },
    {
      title: "Adaptable Workspace Strategies",
      description:
        "Change is the only constant in today's fast-paced world. Our adaptable workspace strategies focus on creating coworking spaces that can evolve with your needs. Whether you're expanding, pivoting, or adopting new technologies, our Coworking Consulting services build your knowledge to adapt quickly and efficiently.",
      icon: <Layers className="w-6 h-6 text-primary" />,
    },
    {
      title: "Process Optimization for Operational Excellence",
      description:
        "Every minute counts in a busy coworking environment. That's why our Coworking Consulting approach involves an in-depth analysis of your current operations. We identify bottlenecks, suggest improvements, and help implement changes that streamline processes, ultimately enhancing productivity and member satisfaction.",
      icon: <Workflow className="w-6 h-6 text-primary" />,
    },
    {
      title: "Community-Centric Planning",
      description:
        "A coworking space is as strong as the community it nurtures. Our Coworking Consulting services include community-centric planning to ensure that both individuals and teams find value, engagement, and a sense of belonging in your space. From community events to shared goals, we help you build a space that fosters collaboration and mutual growth.",
      icon: <Users2 className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Column - Image */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen">
          <CloudinaryImage
            src="images/pages/twofifty-coworking-consulting-service_drvax1"
            alt="TwoFifty coworking consulting service"
            fill
            className="object-cover"
            priority
            transformation="hero"
          />
          <div className="absolute inset-0 bg-[#7f614470]" />
        </div>

        {/* Right Column - Content 866646 */}
        <div className="w-full lg:w-1/2 flex items-center bg-gradient-to-br from-[#7f6144] to-[#d4a373]">
          <div className="w-full max-w-2xl mx-auto px-6 py-12 lg:py-0">
            <div className="space-y-8">
              {/* Badge */}
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20">
                Expert Coworking Consulting
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                <span className="block mb-2">Optimize How Your</span>
                <span className="block text-primary">Flexible Workspace</span>
                <span className="block">Operates</span>
              </h1>

              {/* Services List */}
              <div className="space-y-4">
                <p className="text-xl text-white/80 font-medium">
                  We can help with:
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Operations",
                    "Sales",
                    "Community Building",
                    "Team Education",
                    "Member Experience",
                  ].map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium hover:bg-white/15 transition-colors"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href="https://calendar.app.google/zYZVFkH2prid92Wq5"
                    target="_blank"
                  >
                    Book a Free Consultation
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto border-white/20 hover:bg-white/50"
                  asChild
                >
                  <Link href="#benefits">Learn More</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-white/60 mb-4">
                  Trusted by coworking spaces worldwide
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <span className="text-2xl text-white/80">500+</span>
                  <span className="text-sm text-white/60">Spaces Visited</span>
                  <span className="text-2xl text-white/80">50+</span>
                  <span className="text-sm text-white/60">Cities</span>
                  <span className="text-2xl text-white/80">10+</span>
                  <span className="text-sm text-white/60">
                    Years Experience
                  </span>
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
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                BENEFITS
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Key Benefits of Our Coworking Consulting Services
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover how our consulting services can transform your
                workspace into a thriving community hub.
              </p>
            </div>

            {/* Benefits Grid */}
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

            {/* Image and CTA */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-2xl p-8">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <CloudinaryImage
                  src="images/pages/coworking-travel_drvqnf"
                  alt="Coworking seminar"
                  fill
                  className="object-cover"
                  transformation="hero"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  Ready to Transform Your Workspace?
                </h3>
                <p className="text-gray-600 max-w-md">
                  Let's discuss how we can help optimize your coworking space
                  operations and build a stronger community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="default" asChild>
                    <Link
                      href="https://calendar.app.google/zYZVFkH2prid92Wq5"
                      target="_blank"
                    >
                      Book a Call
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="mailto:mail@twofifty.co">Send an Enquiry</Link>
                  </Button>
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
            <span className="text-primary font-bold">EXPERT</span>
            <h2 className="text-3xl font-bold mb-6">
              Results Driven Expert Coworking Consulting Services
            </h2>
            <p className="text-gray-600 mb-8">
              Welcome to TwoFifty, where our Coworking Consulting services are
              driving forward the future of the modern, flexible workspace. In
              an era of rapid change and increasing need for adaptability, the
              coworking sector is witnessing unparalleled growth along with new
              challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                PROCESS
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                How It Works: Your Journey to a Better Coworking Space
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Embarking on a consulting journey with TwoFifty is a
                straightforward process designed to ensure our common project's
                success from start to finish. Here's how our Coworking
                Consulting services work in four simple steps:
              </p>
            </div>

            {/* Process Steps */}
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

            {/* Image and CTA */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <CloudinaryImage
                  src="images/pages/coworkies-teach_ho15ue"
                  alt="Coworking seminar students"
                  fill
                  className="object-cover"
                  transformation="hero"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-8">
                  Take the first step towards optimizing your coworking space.
                  Schedule a free consultation or send us an inquiry.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" variant="default" asChild>
                    <Link
                      href="https://calendar.app.google/zYZVFkH2prid92Wq5"
                      target="_blank"
                    >
                      Book a Call
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="mailto:mail@twofifty.co">Send an Enquiry</Link>
                  </Button>
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
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider">
                FOCUS
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Our Approach to Coworking Consulting
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                At TwoFifty, we've developed an in-house comprehensive
                consulting methodology that ensures your coworking space isn't
                just another office but a dynamic environment where productivity
                and community thrive. Below, we detail the pillars of our
                approach.
              </p>
            </div>

            {/* Focus Areas Grid */}
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

            {/* Image and CTA */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <CloudinaryImage
                  src="images/pages/twofifty-coworking-consulting-service_drvax1"
                  alt="TwoFifty Coworking Consulting Approach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Transform Your Workspace?
                </h3>
                <p className="text-gray-600 mb-8">
                  Let's discuss how our expert approach can help optimize your
                  coworking space operations.
                </p>
                <Button size="lg" variant="default" asChild>
                  <Link
                    href="https://calendar.app.google/zYZVFkH2prid92Wq5"
                    target="_blank"
                  >
                    Book a Call
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
            {" "}
            {/* Increased max-width for 2 columns */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions About Our Coworking Consulting
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Find answers to frequently asked questions about our Coworking
                Consulting services. This FAQ section addresses common queries
                to ensure you have a clear understanding of our consulting
                process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {/* Added 2 columns for md breakpoint */}
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
                          {faq.q}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule an initial consultation with our team to discuss how we can
            help optimize your coworking space operations.
          </p>
          <div className="flex flex-col gap-4 items-center justify-center sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-12 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-bold transition-all duration-300 transform hover:scale-105"
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
                Book a 30min Call
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-12 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-bold transition-all duration-300 transform hover:scale-105"
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
                Connect on Linkedin
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-12 py-6 border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-bold transition-all duration-300 transform hover:scale-105"
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
                Connect via Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
