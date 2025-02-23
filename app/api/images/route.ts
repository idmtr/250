import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with proper credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    let folder = searchParams.get('folder') || ''
    
    // Debug log the configuration
    console.log('Cloudinary Config:', {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
    })

    // Ensure folder has 'images/' prefix
    const prefix = folder.startsWith('images/') ? folder : `images/${folder}`
    console.log('Searching in folder:', prefix)

    // Test connection first
    try {
      await cloudinary.api.ping()
    } catch (error) {
      throw new Error(`Cloudinary connection failed: ${error.message}`)
    }

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix,
      max_results: 100
    })

    const images = result.resources.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      created: resource.created_at,
      width: resource.width,
      height: resource.height
    }))

    return NextResponse.json({ images })

  } catch (error) {
    console.error('Cloudinary API error:', {
      message: error.message,
      config: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
      }
    })
    
    return NextResponse.json({ 
      error: `Failed to fetch images: ${error.message}`,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { 
      status: 500 
    })
  }
}