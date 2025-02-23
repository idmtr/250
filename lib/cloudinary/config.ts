import { CloudinaryConfig } from './types'

export const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ddqw1uuhd',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folders: {
    blog: 'images/blog',
    pages: 'images/pages',
    team: 'images/team',
    workshops: 'images/workshops',
    speaking: 'images/speaking',
    placeholders: 'images/placeholders',
    assets: 'images/assets',
    testimonials: 'images/testimonials'
  },
  transformations: {
    thumbnail: { 
      width: 200, 
      height: 200, 
      crop: 'fill',
      format: 'webp'
    },
    blog: { 
      width: 800, 
      quality: 'auto:good',
      format: 'webp',
      dpr: '2.0'
    },
    blogCover: {
      width: 1200,
      height: 630,
      crop: 'fill',
      quality: 'auto:good',
      format: 'webp',
      gravity: 'auto',
      dpr: '2.0'
    },
    preview: { 
      width: 300, 
      height: 200, 
      crop: 'fill',
      gravity: 'auto',
      format: 'webp',
      quality: 'auto'
    },
    hero: { 
      width: 1920, 
      height: 1080, 
      crop: 'fill', 
      quality: 'auto:good',
      format: 'webp',
      dpr: '2.0'
    },
    avatar: { 
      width: 40, 
      height: 40, 
      crop: 'fill', 
      gravity: 'face',
      format: 'webp',
      quality: 'auto',
      dpr: '2.0'
    },
    optimized: { 
      fetch_format: 'auto', 
      quality: 'auto',
      format: 'webp'
    },
    blogInline: {
      width: 800,
      height: 450,
      crop: 'fill',
      gravity: 'auto',
      format: 'webp',
      quality: 'auto',
      dpr: '2.0'
    }
  }
}