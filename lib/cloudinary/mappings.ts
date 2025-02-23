import type { ImageCategory } from './types'
import { cloudinaryConfig } from './config'
import mappings from '@/cloudinary-mappings.json'

interface ImageMapping {
  localPath: string
  cloudinaryUrl: string
  publicId: string
  folder: string
  size: number
  uploadedAt: string
}

// Helper to detect image context and apply appropriate transformation
function detectImageContext(path: string): keyof typeof cloudinaryConfig.transformations {
  if (path.includes('/blog/')) return 'blog'
  if (path.includes('/team/')) return 'avatar'
  if (path.includes('hero') || path.includes('banner')) return 'hero'
  if (path.includes('/testimonials/')) return 'avatar'
  if (path.includes('/workshops/')) return 'hero'
  if (path.includes('/speaking/')) return 'preview'
  if (path.includes('/pages/')) return 'optimized'
  return 'optimized'
}

export function getImageInfo(path: string) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Find the mapping
  const image = mappings.mappings.find(m => m.localPath.includes(cleanPath))
  
  if (!image) {
    console.warn(`Image not found in mappings: ${path}`)
    return {
      url: path,
      publicId: path,
      transformation: 'optimized' as keyof typeof cloudinaryConfig.transformations
    }
  }
  
  return {
    url: image.cloudinaryUrl,
    publicId: image.publicId,
    transformation: detectImageContext(image.localPath)
  }
}

// Usage examples:
// getImageInfo('/images/blog/my-post.jpg')
// getImageInfo('/images/team/member.jpg')
// getImageInfo('/images/workshops/presentation.jpg')