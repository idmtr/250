import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { cache } from "react";
import type { Post } from "@/types/blog";
import type { Locale } from "@/i18n-config";
import { processMarkdown } from "./markdown";
import { normalizeTag } from '@/lib/tag-utils'

const postsDirectory = path.join(process.cwd(), "content/blog");

export const getPostBySlug = cache(
  async (slug: string, locale: Locale): Promise<Post | null> => {
    try {
      // Check if the locale directory exists
      const localeDir = path.join(postsDirectory, locale);
      if (!fs.existsSync(localeDir)) {
        console.warn(`No posts directory found for locale: ${locale}`);
        return null;
      }

      const fullPath = path.join(localeDir, `${slug}.md`);
      if (!fs.existsSync(fullPath)) {
        console.warn(`No post found for slug "${slug}" in locale "${locale}"`);
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Convert published to boolean
      const published = data.published === false ? false : true;

      return {
        ...data,
        slug,
        published,
        lang: locale,
        content: await processMarkdown(content),
      } as Post;
    } catch (error) {
      console.error(`Error loading post ${slug} for locale ${locale}:`, error);
      return null;
    }
  }
);

export const getPosts = cache(
  async (locale: Locale): Promise<Post[]> => {
    const dir = path.join(postsDirectory, locale);
    
    // Check if directory exists for locale
    if (!fs.existsSync(dir)) {
      console.warn(`No posts directory found for locale: ${locale}`);
      return [];
    }

    const files = fs.readdirSync(dir);

    const posts = await Promise.all(
      files
        .filter(fileName => fileName.endsWith(".md"))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, "");
          return await getPostBySlug(slug, locale);
        })
    );

    return posts
      .filter((post): post is Post => {
        if (!post) return false;
        return post.published !== false;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);

export async function getAllTags(lang: Locale): Promise<string[]> {
  const posts = await getPosts(lang);
  const tags = new Set<string>();

  posts.forEach((post) => {
    // Ensure post.tags is an array before using forEach
    const postTags = Array.isArray(post.tags) ? post.tags : [];
    postTags.forEach((tag) => {
      // Normalize tag before adding to set
      const normalizedTag = normalizeTag(tag);
      tags.add(normalizedTag);
    });
  });

  return Array.from(tags).sort();
}

export async function getPostsByTag(tag: string, lang: Locale): Promise<Post[]> {
  const posts = await getPosts(lang);
  const normalizedSearchTag = normalizeTag(tag);

  return posts.filter((post) => {
    const postTags = Array.isArray(post.tags) ? post.tags : [];
    return postTags.some((t) => normalizeTag(t) === normalizedSearchTag);
  });
}

export async function getRelatedPosts(
  currentPost: Post,
  lang: Locale,
  limit = 3
): Promise<Post[]> {
  const posts = await getPosts(lang);
  const currentTags = Array.isArray(currentPost.tags) ? currentPost.tags : [];

  // Only process if current post has tags
  if (currentTags.length === 0) {
    return [];
  }

  return posts
    .filter((post) => {
      // Skip current post
      if (post.slug === currentPost.slug) {
        return false;
      }

      // Ensure post.tags is an array
      const postTags = Array.isArray(post.tags) ? post.tags : [];
      
      // Check for common tags
      return postTags.some((tag) => 
        currentTags.includes(tag)
      );
    })
    .sort(() => Math.random() - 0.5) // Randomize order
    .slice(0, limit);
}

export const getLatestPosts = cache(
  async (locale: Locale, count: number = 3): Promise<Post[]> => {
    const allPosts = await getPosts(locale);
    return allPosts.slice(0, count);
  }
);
