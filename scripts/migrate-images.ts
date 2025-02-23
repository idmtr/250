import * as dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { glob } from 'glob';
import { readFile, writeFile, stat } from 'fs/promises';
import matter from 'gray-matter';
import { cloudinaryConfig } from '../lib/cloudinary/config';

// Add to the top of the file
const FORCE_UPLOAD = process.argv.includes('--force');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ImageMapping {
  localPath: string;
  cloudinaryUrl: string;
  folder: string;
  size: number;
  uploadedAt: string;
  publicId: string;
  transformation?: string;
}

// Use folders from our config
const FOLDER_STRUCTURE = cloudinaryConfig.folders;

// Add transformation detection
function detectTransformation(file: string): string {
  if (file.includes('/blog/')) return 'blog';
  if (file.includes('/team/')) return 'avatar';
  if (file.includes('hero') || file.includes('banner')) return 'hero';
  if (file.includes('/testimonials/')) return 'avatar';
  return 'optimized';
}

async function migrateToCloudinary() {
  const mappings: ImageMapping[] = [];
  const processedImages = new Set<string>();

  // Get all image files
  const files = await glob('public/images/**/*.{jpg,jpeg,png,webp,svg}');

  for (const file of files) {
    const stats = await stat(file);
    const fileName = path.basename(file);
    const relativePath = file.replace('public/', '');
    const folder = path.dirname(relativePath);
    
    try {
      // Search for existing image
      const searchResult = await cloudinary.search
        .expression(`filename:${path.parse(fileName).name}`)
        .execute();

      if (searchResult.total_count > 0 && !FORCE_UPLOAD) {
        console.log(`Image already exists in Cloudinary: ${fileName}`);
        processedImages.add(searchResult.resources[0].secure_url);
        continue;
      }

      // Upload new image
      console.log(`Uploading: ${fileName} to folder: ${folder}`);
      
      const result = await cloudinary.uploader.upload(file, {
        folder: folder,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        resource_type: 'auto'
      });

      mappings.push({
        localPath: file,
        cloudinaryUrl: result.secure_url,
        folder: folder,
        size: stats.size,
        uploadedAt: new Date().toISOString(),
        publicId: result.public_id
      });

      console.log(`Successfully uploaded: ${fileName}`);
      processedImages.add(result.secure_url);

    } catch (error) {
      console.error(`Failed to process ${fileName}:`, error);
    }
  }

  // 2. Update markdown files
  const markdownFiles = await glob('content/**/*.md');

  for (const file of markdownFiles) {
    const content = await readFile(file, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    let updatedContent = markdownContent;

    // Update markdown content with transformed URLs
    const imageMatches = markdownContent.match(/!\[.*?\]\((\/images\/.*?)\)/g) || [];
    for (const match of imageMatches) {
      const [, localPath] = match.match(/!\[.*?\]\((\/images\/.*?)\)/) || [];
      const mapping = mappings.find(m => m.localPath.includes(localPath.replace(/^\//, '')));
      
      if (mapping) {
        // Use the appropriate transformation URL
        const transformedUrl = mapping.cloudinaryUrl;
        updatedContent = updatedContent.replace(localPath, transformedUrl);
      }
    }

    // Update frontmatter with transformed URLs
    const imageFields = ['coverImage', 'authorImage', 'image'];
    for (const field of imageFields) {
      if (data[field] && data[field].startsWith('/images/')) {
        const mapping = mappings.find(m => m.localPath.includes(data[field].replace(/^\//, '')));
        if (mapping) {
          data[field] = mapping.cloudinaryUrl;
        }
      }
    }

    // Save updated markdown
    const updatedFileContent = matter.stringify(updatedContent, data);
    await writeFile(file, updatedFileContent);
  }

  // 3. Save detailed mappings
  await writeFile(
    'cloudinary-mappings.json',
    JSON.stringify({
      mappings,
      stats: {
        totalProcessed: files.length,
        totalUploaded: mappings.length,
        totalExisting: processedImages.size - mappings.length,
        totalSize: mappings.reduce((acc, img) => acc + img.size, 0)
      }
    }, null, 2)
  );
}

// Add logging timestamp
const log = console.log;
console.log = (...args) => {
  log(`[${new Date().toISOString()}]`, ...args);
};

// Run migration with better error handling
migrateToCloudinary()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });