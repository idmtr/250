import { cloudinaryConfig } from './config'
import type { CloudinaryTransformation } from './types'

export function getCloudinaryUrl(
  publicId: string, 
  transformation: CloudinaryTransformation | keyof typeof cloudinaryConfig.transformations
): string {
  const config = cloudinaryConfig

  // Get transformation options
  const trans = typeof transformation === 'string' 
    ? config.transformations[transformation]
    : transformation

  // Build transformation string
  const transformationStr = Object.entries(trans)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')

  return `https://res.cloudinary.com/${config.cloud_name}/image/upload/${transformationStr}/${publicId}`
}