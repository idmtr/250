import { cloudinaryConfig } from './config'
import { getPublicId } from './mappings'

export function getBlogImage(slug: string) {
  const publicId = getPublicId(`images/blog/${slug}.webp`)
  return {
    publicId,
    ...cloudinaryConfig.transformations.blogCover
  }
}

export function getAuthorImage(name: string) {
  const publicId = getPublicId(`images/team/${name}.webp`)
  return {
    publicId,
    ...cloudinaryConfig.transformations.avatar
  }
}