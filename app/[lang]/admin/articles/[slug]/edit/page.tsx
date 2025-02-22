import { getArticleBySlug } from '@/lib/blog/articles'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { AdminNav } from '@/components/admin/AdminNav'
import { notFound } from 'next/navigation'
import { getValidatedParams } from '@/lib/params-helper'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

async function getPageData(params: PageProps['params']) {
  const resolvedParams = await params
  const { lang: validLang } = await getValidatedParams(resolvedParams)
  
  console.log(`Fetching article: ${resolvedParams.slug} in ${validLang}`)
  const article = await getArticleBySlug(resolvedParams.slug, validLang)
  
  if (!article) {
    console.log(`Article not found: ${resolvedParams.slug}`)
    notFound()
  }
  
  return { validLang, article }
}

export default async function EditArticlePage({ params }: PageProps) {
  const { validLang, article } = await getPageData(params)

  // Add debug logging
  console.log('EditArticlePage rendering with:', {
    lang: validLang,
    articleData: {
      title: article.title,
      slug: article.slug,
      publishDate: article.publishDate
    }
  })

  return (
    <>
      <AdminNav lang={validLang} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
        <ArticleForm 
          lang={validLang}
          article={article}
          mode="edit"
        />
      </main>
    </>
  )
}