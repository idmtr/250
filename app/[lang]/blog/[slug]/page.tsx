import { Metadata } from "next";
import { getBaseUrl } from "@/lib/url";
import { getPostBySlug, getPosts, getRelatedPosts } from "@/lib/blog";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import { getValidatedParams } from "@/lib/params-helper";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
// import CustomImage from "@/components/CustomImage";
import BlogGrid from "@/components/BlogGrid"; // Add this import
import { i18n } from "@/i18n-config";
import fs from "fs";
import path from "path";

interface Props {
  params: {
    lang: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { lang, slug } = await getValidatedParams(params);
    const post = await getPostBySlug(slug, lang);

    if (!post) {
      return { title: "Post Not Found" };
    }

    const dictionary = await getDictionary(lang);
    const baseUrl = getBaseUrl();

    // Safely check for available translations
    const availableTranslations = await Promise.all(
      i18n.locales.map(async (locale) => {
        try {
          const filePath = path.join(
            process.cwd(),
            "content/blog",
            locale,
            `${slug}.md`
          );
          const exists = fs.existsSync(filePath);
          return exists ? locale : null;
        } catch {
          return null;
        }
      })
    );

    // Filter out nulls and build languages object
    const languages = Object.fromEntries(
      availableTranslations
        .filter(
          (locale): locale is Locale => locale !== null && locale !== lang
        )
        .map((locale) => [
          locale,
          locale === "en"
            ? `${baseUrl}/blog/${slug}`
            : `${baseUrl}/${locale}/blog/${slug}`,
        ])
    );

    return {
      title: `${post.title} | ${dictionary.blog.title}`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified || post.date,
        authors: post.author ? [post.author] : undefined,
        images: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
      },
      alternates: {
        canonical:
          lang === "en"
            ? `${baseUrl}/blog/${slug}`
            : `${baseUrl}/${lang}/blog/${slug}`,
        languages,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const validatedParams = await getValidatedParams({ lang });
  const posts = await getPosts(validatedParams.lang);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPost({ params }: Props) {
  try {
    const { lang, slug } = await getValidatedParams(params);
    const [post, dictionary] = await Promise.all([
      getPostBySlug(slug, lang),
      getDictionary(lang),
    ]);

    if (!post) {
      notFound();
    }

    const relatedPosts = await getRelatedPosts(post, lang, 3);
    const readingTime = estimateReadingTime(post.content);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article", // Changed from BlogPosting to Article
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage
        ? [
            {
              "@type": "ImageObject",
              url: `${getBaseUrl()}${post.coverImage}`,
              width: 1200,
              height: 630,
              caption: post.title,
            },
          ]
        : undefined,
      datePublished: new Date(post.date).toISOString(),
      dateModified: post.modified
        ? new Date(post.modified).toISOString()
        : new Date(post.date).toISOString(),
      author: {
        "@type": "Person",
        name: post.author,
        image: post.authorImage
          ? `${getBaseUrl()}${post.authorImage}`
          : undefined,
        url: "https://twofifty.co/about",
      },
      publisher: {
        "@type": "Organization",
        name: "Twofifty.co",
        logo: {
          "@type": "ImageObject",
          url: `${getBaseUrl()}/images/logo.png`,
          width: 600,
          height: 60,
        },
        url: "https://twofifty.co",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${getBaseUrl()}/${lang}/blog/${slug}`,
      },
      wordCount: post.content.trim().split(/\s+/).length,
      articleBody: post.content.replace(/<[^>]+>/g, ""), // Strip HTML tags
      timeRequired: `PT${readingTime}M`,
      keywords: post.tags?.join(","),
      inLanguage: lang,
      isAccessibleForFree: "True",
      license: "https://creativecommons.org/licenses/by-nc/4.0/", // Add if applicable
      articleSection: "Blog",
      genre: "Coworking",
      about: post.tags?.map((tag) => ({
        "@type": "Thing",
        name: tag,
      })),
    };

    // Add additional schema for the article series if applicable
    const articleSeriesSchema = post.series
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          name: post.series.name,
          url: `${getBaseUrl()}/${lang}/blog/series/${post.series.slug}`,
          position: post.series.position,
          numberOfItems: post.series.totalPosts,
        }
      : null;

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://twofifty.co/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: dictionary.blog.title,
          item: `https://twofifty.co/${lang}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://twofifty.co/${lang}/blog/${slug}`,
        },
      ],
    };

    return (
      <main className="min-h-screen pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLd,
              breadcrumbJsonLd,
              ...(articleSeriesSchema ? [articleSeriesSchema] : []),
            ]),
          }}
        />

        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: dictionary.blog.title, href: `/${lang}/blog` },
              { label: post.title },
            ]}
            lang={lang}
          />
        </div>

        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {post.author && (
                <div className="flex items-center">
                  {post.authorImage && (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                  )}
                  <span>
                    {dictionary.blog.byAuthor} {post.author}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <time dateTime={post.date}>
                  {dictionary.blog.publishedOn} {formatDate(post.date, lang)}
                </time>
                {post.modified && post.modified !== post.date && (
                  <time dateTime={post.modified} className="text-gray-500">
                    ({dictionary.blog.updated} {formatDate(post.modified, lang)}
                    )
                  </time>
                )}
              </div>

              <span title={`${readingTime} ${dictionary.blog.minutes}`}>
                {readingTime} min read
              </span>
            </div>
          </header>

          {post.coverImage && (
            <figure className="relative h-[460px] mb-8">
              <Image
                src={post.coverImage}
                alt={post.title || "Blog post cover image"}
                fill
                className="object-cover rounded-lg"
                priority // Add priority loading for cover images
              />
            </figure>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <footer className="mt-8 pt-4 border-t">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="font-semibold">{dictionary.blog.tags}:</span>
                <ul className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <a
                        href={`/${lang}/blog/tag/${tag}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </footer>
          )}

          {/* Optional: Show available translations */}
          {post.availableTranslations &&
            post.availableTranslations.length > 1 && (
              <div className="mt-8">
                <h2>{dictionary.blog.availableTranslations}:</h2>
                <ul>
                  {post.availableTranslations
                    .filter((locale) => locale !== lang)
                    .map((locale) => (
                      <li key={locale}>
                        <Link
                          href={
                            locale === "en"
                              ? `/blog/${slug}`
                              : `/${locale}/blog/${slug}`
                          }
                        >
                          {dictionary.languages[locale]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </article>

        {relatedPosts.length > 0 && (
          <aside className="container mx-auto px-4 py-16 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">
              {dictionary.blog.relatedPosts}
            </h2>
            <BlogGrid posts={relatedPosts} lang={lang} />
          </aside>
        )}
      </main>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
