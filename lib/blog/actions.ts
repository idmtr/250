'use server'

import fs, { readFile, readdir } from 'fs/promises'
import path, { join } from 'path'
import { createSlug } from '@/lib/utils/slugify'
import { format } from 'date-fns'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import { revalidatePath } from 'next/cache'

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

export async function updateArticle(data: any) {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'blog', data.lang)
    const filePath = path.join(contentDir, `${data.slug}.md`)

    // Clean up frontmatter by removing undefined values
    const frontmatter = Object.fromEntries(
      Object.entries({
        title: data.title,
        date: data.publishDate,
        updatedOn: data.updatedOn,
        author: data.author,
        authorRole: data.authorRole || null,
        authorImage: data.authorImage || null,
        coverImage: data.coverImage || null,
        excerpt: data.excerpt,
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        published: Boolean(data.published),
        readingTime: data.readingTime || null
      }).filter(([_, value]) => value !== undefined)
    )

    // Ensure content is a string
    const content = String(data.content || '')

    // Create markdown content
    const markdown = matter.stringify(content, frontmatter)

    // Debug log
    console.log('Saving article with:', {
      path: filePath,
      frontmatterKeys: Object.keys(frontmatter),
      contentLength: content.length
    })

    // Ensure directory exists
    await fs.mkdir(contentDir, { recursive: true })

    // Write file
    await fs.writeFile(filePath, markdown, 'utf8')

    // Revalidate cache
    revalidatePath(`/${data.lang}/blog/${data.slug}`)
    revalidatePath(`/${data.lang}/blog`)
    revalidatePath(`/${data.lang}/admin/articles`)

    return { slug: data.slug }
  } catch (error) {
    console.error('Error updating article:', error)
    throw new Error(`Failed to update article: ${error.message}`)
  }
}

export async function getArticles(lang: string) {
  const contentDir = join(process.cwd(), 'content/blog', lang)
  const files = await readdir(contentDir)
  
  const articles = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(join(contentDir, file), 'utf8')
      const { data } = matter(content)
      return data
    })
  )

  return articles.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export async function getArticleBySlug(slug: string, lang: string) {
  try {
    const filePath = join(process.cwd(), 'content/blog', lang, `${slug}.md`)
    const content = await readFile(filePath, 'utf8')
    const { data, content: markdown } = matter(content)
    
    return {
      ...data,
      content: markdown
    }
  } catch (error) {
    return null
  }
}