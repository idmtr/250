// app/[lang]/admin/articles/new/page.tsx
import { Metadata } from 'next'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { AdminNav } from '@/components/admin/AdminNav'
import { getDictionary } from '@/get-dictionary'
import { getValidatedParams } from '@/lib/params-helper'

interface PageProps {
  params: Promise<{ lang: string }>
}

async function getPageData(params: PageProps['params']) {
  const resolvedParams = await params
  const { lang: validLang } = await getValidatedParams(resolvedParams)
  const dictionary = await getDictionary(validLang)
  
  return { 
    validLang, 
    dictionary,
    title: dictionary.admin?.createArticle || 'New Article'
  }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { title } = await getPageData(props.params)
  return { title }
}

export default async function NewArticlePage({ params }: PageProps) {
  const { validLang, dictionary, title } = await getPageData(params)

  return (
    <>
      <AdminNav lang={validLang} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl py-12 font-bold mb-8">{title}</h1>
        <ErrorBoundary>
          <ArticleForm lang={validLang} />
        </ErrorBoundary>
      </main>
    </>
  )
}