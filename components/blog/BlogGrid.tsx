import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/blog'
import type { Locale } from '@/i18n-config'
import { normalizeTag } from '@/lib/tag-utils'

interface BlogGridProps {
  posts: Post[]
  lang: Locale
}

interface BlogCardProps {
  post: Post
  lang: Locale
}

interface Post {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
  tags?: string[];         // Was missing
  author?: string;         // Was missing
  authorImage?: string;    // Was missing
  readingTime?: string;    // Was missing
  published: boolean;      // Was missing
  lang: string;            // Was missing
}

const BlogCard: FC<BlogCardProps> = ({ post, lang }) => {
  const tags = Array.isArray(post.tags) ? post.tags : []
  const displayTags = tags.slice(0, 2)

  return (
    <article className="h-full"> {/* Add h-full here */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"> {/* Add h-full and flex flex-col */}
        {/* Image stays fixed height */}
        <div className="relative h-48 flex-shrink-0"> {/* Add flex-shrink-0 */}
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title || 'Blog post cover image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        {/* Content section grows to fill space */}
        <div className="p-6 flex flex-col flex-grow"> {/* Add flex-grow */}
          {/* Tags at top */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {displayTags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/${lang}/blog/tag/${normalizeTag(tag)}`}
                  className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title and excerpt in middle */}
          <div className="flex-grow"> {/* Add flex-grow */}
            <Link 
              href={`/${lang}/blog/${post.slug}`}
              className="block group"
            >
              <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
            </Link>
            {post.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Author and time at bottom */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t"> {/* Add margin-top and border */}
            <div className="flex items-center space-x-2">
              {post.authorImage && (
                <Image
                  src={post.authorImage}
                  alt={`${post.author || 'Author'}'s profile picture`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              {post.author && <span>{post.author}</span>}
            </div>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </div>
      </div>
    </article>
  )
}

const BlogGrid: FC<BlogGridProps> = ({ posts, lang }) => {
  // Add debug logging
  // console.log('BlogGrid received posts:', posts.map(p => ({
  //   title: p.title,
  //   published: p.published,
  //   type: typeof p.published
  // })));

  // Filter out posts where published is explicitly false
  const publishedPosts = posts.filter(post => post.published !== false);

  // console.log('After filtering:', publishedPosts.map(p => ({
  //   title: p.title,
  //   published: p.published
  // })));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {publishedPosts.map((post) => (
        <BlogCard 
          key={post.slug} 
          post={post} 
          lang={lang} 
        />
      ))}
    </div>
  );
};

export default BlogGrid;