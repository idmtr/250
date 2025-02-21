import Link from 'next/link'
import { Post } from '@/types/blog'
import type { Locale } from '@/i18n-config'
import { formatDate } from '@/lib/utils'

interface BlogListProps {
  posts: Post[]
  dictionary: {
    publishedOn: string
  }
  lang: Locale
}

export default function BlogList({ posts, dictionary, lang }: BlogListProps) {
  const formatPostDate = (date: string) => {
    try {
      return formatDate(date, lang);
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.slug} className="border rounded-lg overflow-hidden">
          {post.coverImage && (
            <div className="relative h-48">
              <img
                src={post.coverImage}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
              {dictionary.publishedOn} {formatPostDate(post.date)}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}