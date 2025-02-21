import { getPostsByTag, getAllTags } from "@/lib/blog";
import { getDictionary } from "@/get-dictionary";
import { getBaseUrl } from "@/lib/url";
import BlogGrid from "@/components/blog/BlogGrid";
import { denormalizeTag, normalizeTag } from "@/lib/tag-utils";
import { generatePageMetadata } from "@/lib/metadata";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n-config";

interface Props {
  params: {
    lang: string;
    tag: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { lang, tag } = await getValidatedParams(params);
    const dictionary = await getDictionary(lang);
    const baseUrl = getBaseUrl();
    const decodedTag = denormalizeTag(tag);
    
    // Get all available tags in current locale
    const allTags = await getAllTags(lang);
    const normalizedCurrentTag = normalizeTag(decodedTag);
    
    // Check if tag exists
    if (!allTags.some(t => normalizeTag(t) === normalizedCurrentTag)) {
      return {
        title: "Tag Not Found",
      };
    }

    return {
      title: `${dictionary.blog.postsTaggedWith} "${decodedTag}" | ${dictionary.blog.title}`,
      description: `${dictionary.blog.explorePostsTagged} "${decodedTag}"`,
      alternates: {
        canonical: `${baseUrl}/${lang}/blog/tag/${tag}`,
        languages: {
          en: `${baseUrl}/blog/tag/${tag}`,
          fr: `${baseUrl}/fr/blog/tag/${tag}`,
          de: `${baseUrl}/de/blog/tag/${tag}`,
          es: `${baseUrl}/es/blog/tag/${tag}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

export default async function TagPage({ params }: Props) {
  try {
    const { lang, tag } = await getValidatedParams(params);
    const dictionary = await getDictionary(lang);
    const decodedTag = denormalizeTag(tag);
    
    const posts = await getPostsByTag(decodedTag, lang);
    const allTags = await getAllTags(lang);
    
    // Verify tag exists
    if (!allTags.some(t => normalizeTag(t) === normalizeTag(decodedTag))) {
      notFound();
    }

    if (!posts.length) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {dictionary.blog.postsTaggedWith} "{decodedTag}"
            </h1>
            <p className="text-xl text-gray-600">
              {posts.length} {posts.length === 1 ? dictionary.blog.post : dictionary.blog.posts}
            </p>
          </header>

          <section>
            <BlogGrid posts={posts} lang={lang} />
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in tag page:", error);
    notFound();
  }
}
