"use client";

// import Image from "next/image";
import { CldImage } from 'next-cloudinary';
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

export default function OtherProjects({ lang, dictionary }: OtherProjectsProps) {
  if (!dictionary || !dictionary.title) {
    console.error("Invalid other projects dictionary:", dictionary);
    return null;
  }

  const projects = [
    {
      title: dictionary.communityManagersGroup,
      alt: "Community Managers",
      image: "images/pages/community-managers-group_glare1",
      aspectRatio: "aspect-[3/1]",
    },
    {
      title: dictionary.coworkingJobBoard,
      alt: "Coworkies",
      image: "images/team/coworkies-logo_w7nzqp",
      aspectRatio: "aspect-[2/1]",
    },
    {
      title: dictionary.coworkingHackathon,
      alt: "Hack Coworking",
      image: "images/pages/hack-coworking-logo_tv7csa",
      aspectRatio: "aspect-square",
    },
    {
      title: dictionary.coworkingPodcast,
      alt: "Hot Water Podcast",
      image: "images/pages/hot-water-podcast_rnyoki",
      aspectRatio: "aspect-[3/2]",
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
                <CldImage
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain rounded-lg"
                  priority={index < 2}
                  transformation="logo"
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
