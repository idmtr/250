import { getPosts } from "@/lib/blog";
import { getDictionary } from "@/get-dictionary";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import type { Locale } from "@/i18n-config";
import { getValidatedParams } from "@/lib/params-helper";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { i18n } from '@/i18n-config'

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await getValidatedParams(params);
  const dictionary = await getDictionary(lang);

  return generatePageMetadata({
    lang,
    path: "/blog",
    title: dictionary.blog?.title || "Blog | TwoFifty Consulting",
    description:
      dictionary.blog?.description ||
      "Latest insights about coworking and digital transformation",
  });
}

export async function generateStaticParams() {
  // Generate params for all supported locales
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function BlogPage(props: Props) {
  try {
    const { lang } = await getValidatedParams(props.params);
    const dictionary = await getDictionary(lang);
    const allPosts = await getPosts(lang);

    // If no posts found for locale, show appropriate message
    if (allPosts.length === 0) {
      return (
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {dictionary.blog.title}
            </h1>
            <p className="text-xl text-gray-600">
              {dictionary.blog.noPostsAvailable || "No posts available in this language."}
            </p>
          </div>
        </div>
      );
    }

    // Debug the incoming posts
    // console.log('Raw posts:', allPosts.map(p => ({
    //   title: p.title,
    //   published: p.published,
    //   frontmatterPublished: p.data?.published // Check if we have raw frontmatter
    // })));

    // Filter posts based on published status
    const publishedPosts = allPosts.filter(post => post.published !== false);

    // Separate into featured and regular
    const featuredPost = publishedPosts.find(post => post.featured);
    const regularPosts = publishedPosts.filter(post => !post.featured);

    // Debug filtered posts
    // console.log('Filtered posts:', {
    //   total: publishedPosts.length,
    //   featured: featuredPost?.title,
    //   regular: regularPosts.map(p => p.title)
    // });

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {dictionary.blog.title}
            </h1>
            {"subtitle" in dictionary.blog && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {dictionary.blog.subtitle}
              </p>
            )}
          </header>

          {featuredPost && "featuredPost" in dictionary.blog && (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8 px-4">
                {dictionary.blog.featuredPost}
              </h2>
              <FeaturedPost post={featuredPost} lang={lang} />
            </section>
          )}

          <section className="px-4">
            <h2 className="text-2xl font-semibold mb-8">
              {dictionary.blog.latestPosts}
            </h2>
            <BlogGrid posts={regularPosts} lang={lang} />
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load blog page:", error);
    notFound();
  }
}
