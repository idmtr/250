import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create folders if they don't exist
    const publicPath = join(process.cwd(), 'public')
    const folderPath = join(publicPath, folder)
    await mkdir(folderPath, { recursive: true })

    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + (file.name.match(/\.[^/.]+$/) || ['.jpg'])[0]
    const filepath = join(folderPath, filename)

    // Write file
    await writeFile(filepath, buffer)

    // Return public URL
    return NextResponse.json({ url: `/${folder}/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}