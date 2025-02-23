'use client'

import Link from 'next/link'
import { SmartImage } from '@/components/common/SmartImage'
import type { Post } from '@/types/blog'
import type { Locale } from '@/i18n-config'
import { normalizeTag } from '@/lib/tag-utils'

export function BlogCard({ post, lang }: { post: Post; lang: Locale }) {
  const tags = Array.isArray(post.tags) ? post.tags : []
  const displayTags = tags.slice(0, 2)

  return (
    <article className="h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 flex-shrink-0">
          {post.coverImage && (
            <SmartImage
              src={post.coverImage}
              alt={post.title || 'Blog post cover image'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              transformation="blogCover"
            />
          )}
        </div>
        
        {/* ...rest of the card content... */}
      </div>
    </article>
  )
}