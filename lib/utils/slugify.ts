import slugify from 'slugify'

export function createSlug(text: string): string {
  return slugify(text, {
    lower: true,    // convert to lowercase
    strict: true,   // strip special characters
    trim: true,     // trim leading/trailing spaces
  })
}