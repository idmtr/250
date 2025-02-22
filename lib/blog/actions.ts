'use server'

import fs from 'fs/promises'
import path, { join } from 'path'
import { createSlug } from '@/lib/utils/slugify'
import { format } from 'date-fns'
import yaml from 'js-yaml'

export async function ensureUniqueSlug(title: string, lang: string): Promise<string> {
  const baseSlug = createSlug(title)
  const langPrefix = lang !== 'en' ? `${lang}-` : ''
  const initialSlug = langPrefix + baseSlug
  
  const dir = path.join(process.cwd(), 'content/blog', lang)
  
  try {
    const files = await fs.readdir(dir)
    let counter = 1
    let finalSlug = initialSlug

    while (files.includes(`${finalSlug}.md`)) {
      finalSlug = `${initialSlug}-${counter}`
      counter++
    }

    return finalSlug
  } catch (error) {
    // Directory doesn't exist yet, slug is unique
    return initialSlug
  }
}

interface ArticleData {
  title: string
  slug?: string
  publishDate: Date | string
  updatedOn?: Date | string
  excerpt: string
  author: string
  authorRole?: string
  authorImage?: string
  coverImage?: string
  featured?: boolean
  readingTime?: string
  tags?: string[]
  lang: string
  published?: boolean
  content?: string
}

function generateFrontMatter(data: ArticleData) {
  // Format the date consistently
  const formattedDate = format(
    data.publishDate ? new Date(data.publishDate) : new Date(),
    'yyyy-MM-dd'
  )

  // Create frontmatter manually to ensure exact formatting
  const frontMatter = [
    '---',
    `title: "${data.title}"`,
    `date: "${formattedDate}"`,
    `excerpt: "${data.excerpt.replace(/"/g, '\\"')}"`,
    `author: "${data.author}"`,
    `authorRole: "${data.authorRole || ''}"`,
    `authorImage: "${data.authorImage || ''}"`,
    `coverImage: "${data.coverImage || ''}"`,
    `featured: ${Boolean(data.featured)}`,
    `readingTime: "${data.readingTime || '5 min read'}"`,
    `tags: ${JSON.stringify(Array.isArray(data.tags) ? data.tags : [])}`,
    `slug: "${data.slug}"`,
    `lang: "${data.lang}"`,
    `published: ${Boolean(data.published)}`,
    '---'
  ].join('\n')

  // Add content with double newline for clean separation
  return `${frontMatter}\n\n${data.content || ''}`
}

export async function createArticle(data: ArticleData) {
  try {
    // Validate required fields
    if (!data.title || !data.lang) {
      throw new Error('Title and language are required')
    }

    // Ensure we have a valid slug
    const slug = data.slug || await ensureUniqueSlug(data.title, data.lang)
    const articleData = { ...data, slug }

    // Create content directory if it doesn't exist
    const contentDir = join(process.cwd(), 'content/blog', data.lang)
    await fs.mkdir(contentDir, { recursive: true })

    // Generate the file content
    const fileContent = generateFrontMatter(articleData)

    // Write the file
    const filePath = join(contentDir, `${slug}.md`)
    await fs.writeFile(filePath, fileContent, 'utf8')

    // Add a small delay to ensure file is written
    await new Promise(resolve => setTimeout(resolve, 500))

    return { slug, status: 'success' }
  } catch (error) {
    console.error('Error creating article:', error)
    throw error
  }
}