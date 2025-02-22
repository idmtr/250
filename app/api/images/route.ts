import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const folder = searchParams.get('folder')

  if (!folder) {
    return Response.json({ error: 'Folder parameter is required' }, { status: 400 })
  }

  try {
    const publicPath = join(process.cwd(), 'public', folder)
    const files = await readdir(publicPath)
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      // Ensure image paths always start with a slash and include the folder
      .map(file => file.startsWith('/') ? `${folder}/${file.slice(1)}` : `/${folder}/${file}`)

    return Response.json({ images })
  } catch (error) {
    console.error('Error reading images:', error)
    return Response.json({ error: 'Failed to load images' }, { status: 500 })
  }
}