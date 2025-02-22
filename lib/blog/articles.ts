import { readFile, readdir, access, mkdir } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

export interface Article {
  title: string
  slug: string
  publishDate: string
  updatedOn?: string
  excerpt?: string
  content: string
  author?: string
  authorRole?: string
  authorImage?: string
  coverImage?: string
  tags?: string[]
  featured?: boolean
  published?: boolean
  readingTime?: string
}

async function ensureContentDir(lang: string) {
  const contentDir = join(process.cwd(), 'content/blog', lang)
  try {
    await access(contentDir)
    console.log(`Content directory exists: ${contentDir}`)
  } catch {
    console.log(`Creating directory: ${contentDir}`)
    await mkdir(contentDir, { recursive: true })
  }
  return contentDir
}

export async function getArticleBySlug(slug: string, lang: string): Promise<Article | null> {
  try {
    const contentDir = await ensureContentDir(lang)
    const normalizedSlug = slug.replace(/--+/g, '-').trim()
    
    // Log the actual file path we're trying to read
    const filePath = join(contentDir, `${normalizedSlug}.md`)
    console.log('Reading article from:', filePath)

    const content = await readFile(filePath, 'utf8')
    const { data, content: markdown } = matter(content)
    
    // Transform and validate the data
    const article: Article = {
      title: data.title || '',
      slug: normalizedSlug,
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      updatedOn: data.updatedOn,
      excerpt: data.excerpt || '',
      content: markdown || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      authorImage: data.authorImage || '',
      coverImage: data.coverImage || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: !!data.featured,
      published: data.published !== false,
      readingTime: data.readingTime || ''
    }

    console.log('Parsed article data:', {
      title: article.title,
      slug: article.slug,
      dateFields: {
        publishDate: article.publishDate,
        updatedOn: article.updatedOn
      }
    })

    return article
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error)
    return null
  }
}

export async function getArticles(lang: string): Promise<Article[]> {
  try {
    const contentDir = await ensureContentDir(lang)
    const files = await readdir(contentDir)
    
    const articles = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          try {
            const content = await readFile(join(contentDir, file), 'utf8')
            const { data } = matter(content)
            
            // Use filename as slug if not specified in frontmatter
            const fileSlug = file.replace(/\.md$/, '')
            return {
              ...data,
              slug: data.slug || fileSlug
            }
          } catch (error) {
            console.error(`Error reading article ${file}:`, error)
            return null
          }
        })
    )

    return articles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}