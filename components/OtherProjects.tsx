"use client";
import Image from "next/image";
// import CustomImage from "./CustomImage";
import type { Locale } from "@/i18n-config";

interface OtherProjectsProps {
  lang: Locale;
  dictionary: {
    title: string;
    coworkingJobBoard: string;
    coworkingPodcast: string;
    coworkingHackathon: string;
    communityManagersGroup: string;
    book: string;
  };
}

export default function OtherProjects({
  lang,
  dictionary,
}: OtherProjectsProps) {
  if (!dictionary || !dictionary.title) {
    console.error("Invalid other projects dictionary:", dictionary);
    return null;
  }

  const projects = [
    // {
    //   title: dictionary.book || "Around The World in 250 Coworking Spaces",
    //   alt: "Coworking book",
    //   image: "https://twofifty.co/wp-content/uploads/2021/02/book_ks_vid.jpg",
    //   aspectRatio: "aspect-[4/3]", // Book cover ratio
    // },
    {
      title: dictionary.communityManagersGroup,
      alt: "Community Managers",
      image: "/images/pages/community-managers-group.png",
      aspectRatio: "aspect-[3/1]", // Wide logo ratio
    },
    {
      title: dictionary.coworkingJobBoard,
      alt: "Coworkies",
      image: "/images/pages/coworkies-logo.png",
      aspectRatio: "aspect-[2/1]", // Logo ratio
    },
    {
      title: dictionary.coworkingHackathon,
      alt: "Hack Coworking",
      image: "/images/pages/hack-coworking-logo.png",
      aspectRatio: "aspect-square", // Square logo
    },
    {
      title: dictionary.coworkingPodcast,
      alt: "Hot Water Podcast",
      image: "/images/pages/hot-water-podcast.png",
      aspectRatio: "aspect-[3/2]", // Podcast cover ratio
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dictionary.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain rounded-lg"
                  loading={index < 2 ? "eager" : "lazy"}
                  priority={index < 2}
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 text-center line-clamp-2">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
