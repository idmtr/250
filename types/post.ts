export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  modified?: string;
  featured?: boolean;
  publishDate?: Date;
  authorRole?: string;
  authorImage?: string;
  coverImage?: string;
  readingTime?: string;
  lang: string;
  published: boolean;
}
