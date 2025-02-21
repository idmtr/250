import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/blog'
import type { Locale } from '@/i18n-config'

interface FeaturedPostProps {
  post: Post
  lang: Locale
  dictionary?: any
}

export default function FeaturedPost({ post, lang }: FeaturedPostProps) {
  return (
    <article className="bg-[#F8F5F1] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/${lang}/blog/${post.slug}`} className="block">
        <div className="grid md:grid-cols-2 gap-6">
          <figure className="relative h-[400px] md:h-[500px]">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </figure>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center mt-auto">
              {post.authorImage && (
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
              )}
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {post.authorRole} 
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  {formatDate(post.date, lang)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}