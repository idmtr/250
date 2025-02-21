"use client";

import Link from "next/link";
import CustomImage from "./CustomImage";
import type { Post } from "@/types/blog";
import type { Locale } from "@/i18n-config";

interface BlogGridProps {
  posts: Post[];
  lang: Locale;
}

export default function BlogGrid({ posts, lang }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.slug} className="group">
          <Link href={`/${lang}/blog/${post.slug}`}>
            <div className="relative h-48 mb-4">
              <CustomImage
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
              {post.title}
            </h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
