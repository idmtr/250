export interface CloudinaryTransformation {
  width?: number
  height?: number
  crop?: string
  gravity?: string
  quality?: string
  format?: string
  fetch_format?: string
  dpr?: string
}

export interface CloudinaryFolders {
  blog: string
  pages: string
  team: string
  workshops: string
  speaking: string
  placeholders: string
  assets: string
  testimonials: string
}

export interface CloudinaryConfig {
  cloud_name: string
  api_key?: string
  api_secret?: string
  folders: CloudinaryFolders
  transformations: {
    thumbnail: CloudinaryTransformation
    blog: CloudinaryTransformation
    blogCover: CloudinaryTransformation
    preview: CloudinaryTransformation
    hero: CloudinaryTransformation
    avatar: CloudinaryTransformation
    optimized: CloudinaryTransformation
  }
}