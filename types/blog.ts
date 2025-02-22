import type { Locale } from '@/i18n-config'

export interface Post {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
  published: boolean;  // Make this required, not optional
  tags?: string[];
  author?: string;
  authorImage?: string;
  lang: string;
  readingTime?: string;
}

export interface ArticleFormData {
  title: string
  excerpt: string
  content: string
  coverImage?: string
  tags?: string
  lang: string
}

export interface BlogDictionary {
  title: string
  readMore: string
  latestPosts: string
  allPosts: string
  publishedOn: string
  byAuthor: string
  tags: string
}

export interface BlogListProps {
  posts: Post[]
  featured?: boolean
  showAuthor?: boolean
  limit?: number
}