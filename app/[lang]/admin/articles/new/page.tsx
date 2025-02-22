// app/[lang]/admin/articles/new/page.tsx
import { Metadata } from 'next'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { getDictionary } from '@/get-dictionary'
import { getValidatedParams } from '@/lib/params-helper'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string }>
}

// Single source of truth for page data
async function getPageData(params: PageProps['params']) {
  try {
    const resolvedParams = await params
    const { lang: validLang } = await getValidatedParams({ lang: resolvedParams.lang })
    const dictionary = await getDictionary(validLang)
    
    return { 
      validLang, 
      dictionary,
      title: dictionary.admin?.createArticle || 'New Article Maker'
    }
  } catch (error) {
    redirect('/') // Redirect to home if validation fails
  }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { title } = await getPageData(props.params)
  return { title }
}

export default async function NewArticlePage(props: PageProps) {
  const { validLang, dictionary, title } = await getPageData(props.params)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl py-12 font-bold mb-8">{title}</h1>
      <ErrorBoundary>
        <ArticleForm lang={validLang} />
      </ErrorBoundary>
    </main>
  )
}