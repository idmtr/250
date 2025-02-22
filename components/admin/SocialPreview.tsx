'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SocialPreviewProps {
  title: string
  excerpt: string
  coverImage: string
  author: string
  authorImage: string
}

export function SocialPreview({
  title,
  excerpt,
  coverImage,
  author,
  authorImage,
}: SocialPreviewProps) {
  // Helper function to ensure proper image path
  const getImagePath = (path: string) => {
    if (!path) return ''
    // If it's already an absolute URL, return as is
    if (path.startsWith('http')) return path
    // If it's a relative path, ensure it starts with /
    return path.startsWith('/') ? path : `/${path}`
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Social Media Preview</h3>
      <Tabs defaultValue="twitter" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="twitter" className="flex-1">Twitter</TabsTrigger>
          <TabsTrigger value="linkedin" className="flex-1">LinkedIn</TabsTrigger>
          <TabsTrigger value="facebook" className="flex-1">Facebook</TabsTrigger>
        </TabsList>

        <TabsContent value="twitter">
          <Card className="max-w-[450px] overflow-hidden">
            {coverImage && (
              <div className="relative aspect-[1.91/1]">
                <Image
                  src={getImagePath(coverImage) || '/images/blog/placeholder.svg'}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="450px"
                />
              </div>
            )}
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">twofifty.co</p>
              <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
              <p className="text-gray-600 line-clamp-2">{excerpt}</p>
              <div className="flex items-center gap-2 pt-2">
                {authorImage && (
                  <Image
                    src={getImagePath(authorImage) || '/images/team/placeholder.svg'}
                    alt={author}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{author}</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin">
          <Card className="max-w-[552px] overflow-hidden">
            {coverImage && (
              <div className="relative aspect-[1.91/1]">
                <Image
                  src={getImagePath(coverImage) || '/images/blog/placeholder.svg'}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="552px"
                />
              </div>
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                {authorImage && (
                  <Image
                    src={getImagePath(authorImage) || '/images/team/placeholder.svg'}
                    alt={author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">{author}</p>
                  <p className="text-sm text-gray-500">Published on TwoFifty</p>
                </div>
              </div>
              <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
              <p className="text-gray-600 line-clamp-3">{excerpt}</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="facebook">
          <Card className="max-w-[527px] overflow-hidden">
            {coverImage && (
              <div className="relative aspect-[1.91/1]">
                <Image
                  src={getImagePath(coverImage) || '/images/blog/placeholder.svg'}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="527px"
                />
              </div>
            )}
            <div className="p-4 space-y-1">
              <p className="text-xs text-gray-500 uppercase">twofifty.co</p>
              <h3 className="font-bold text-[16px] line-clamp-2">{title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}