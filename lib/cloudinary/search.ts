import { v2 as cloudinary } from 'cloudinary'
import { getImageInfo } from './mappings'
import { cloudinaryConfig } from './config'

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function searchImages(folder: string) {
  try {
    // Remove leading slash if present
    const normalizedFolder = folder.replace(/^\/+/, '')
    const folderPath = `images/${normalizedFolder}`
    
    console.log('Searching in Cloudinary folder:', folderPath)

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 40,
      context: true
    })

    return result.resources.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      created: resource.created_at,
      width: resource.width,
      height: resource.height
    }))

  } catch (error) {
    console.error('Cloudinary search error:', error)
    throw error
  }
}