import { getArticles } from '@/lib/blog/articles'
import { format, parseISO, isValid } from 'date-fns'
import Link from 'next/link'
import { Edit, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminNav } from '@/components/admin/AdminNav'
import { getValidatedParams } from '@/lib/params-helper'

// Add helper function for safe date formatting
function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'No date'
  try {
    const date = parseISO(dateString)
    return isValid(date) ? format(date, 'PP') : 'Invalid date'
  } catch {
    return 'Invalid date'
  }
}

interface PageProps {
  params: Promise<{ lang: string }>
}

async function getPageData(params: PageProps['params']) {
  const resolvedParams = await params
  const { lang: validLang } = await getValidatedParams(resolvedParams)
  const articles = await getArticles(validLang)
  
  return { validLang, articles }
}

export default async function ArticlesPage({ params }: PageProps) {
  const { validLang, articles } = await getPageData(params)

  return (
    <>
      <AdminNav lang={validLang} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Articles</h1>
          <Link href={`/${validLang}/admin/articles/new`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {articles.map((article) => (
            <div 
              key={article.slug}
              className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h2 className="font-medium">{article.title}</h2>
                <div className="text-sm text-muted-foreground">
                  Published: {formatDate(article.publishDate)}
                  {article.updatedOn && ` • Updated: ${formatDate(article.updatedOn)}`}
                </div>
              </div>
              <Link href={`/${validLang}/admin/articles/${article.slug}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No articles found. Create your first article!
            </div>
          )}
        </div>
      </main>
    </>
  )
}