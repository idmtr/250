'use client'

import { createArticle, updateArticle } from '@/lib/blog/actions'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import MDEditor from '@uiw/react-md-editor'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ChevronRight, ChevronLeft, Upload, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageField } from './ImageField'
import { debounce } from 'lodash'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { articleTemplates } from '@/lib/blog/templates'
import { SocialPreview } from './SocialPreview'
import { TagInput } from './TagInput'
import { SaveConfirmDialog } from './SaveConfirmDialog'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO, isValid } from 'date-fns'
import { cn } from "@/lib/utils"
import { createSlug } from '@/lib/utils/slugify'
import { useToast } from '@/components/ui/use-toast'
import { ImageUploadDialog } from './ImageUploadDialog'
// import { insertMarkdown } from '@/lib/utils/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { calculateReadingTime } from '@/lib/utils/reading-time'

// Add better date handling and validation
const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  publishDate: z.union([
    z.date(),
    z.string().transform((str) => {
      const parsed = parseDateSafely(str)
      if (!parsed) throw new Error('Invalid date')
      return parsed
    })
  ]),
  updatedOn: z.union([
    z.date(),
    z.string(),
    z.null(),
    z.undefined()
  ]).transform((date) => {
    if (!date) return undefined
    const parsed = parseDateSafely(date)
    return parsed
  }).optional(),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  authorRole: z.string().optional(),
  coverImage: z.string().url().optional(),
  authorImage: z.string().url().optional(),
  featured: z.boolean().default(false),
  readingTime: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  lang: z.string().default('en'),
})

interface ArticleFormProps {
  lang: string
  article?: any // Replace with proper type
  mode?: 'create' | 'edit'
}

export function ArticleForm({ lang, article, mode = 'create' }: ArticleFormProps) {
  // Replace initializedWith state with more specific dateInitialized
  const [dateInitialized, setDateInitialized] = useState(false)
  const [dateError, setDateError] = useState<string | null>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [imageField, setImageField] = useState<'cover' | 'author'>('cover')

  // Improve date parsing for form initialization
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: article ? {
      ...article,
      // More robust date parsing
      publishDate: parseDateSafely(article.date || article.publishDate) || new Date(),
      updatedOn: parseDateSafely(article.updatedOn),
      // Maintain other fields
      title: article.title || '',
      slug: article.slug || '',
      content: article.content || '',
      excerpt: article.excerpt || '',
      author: article.author || '',
      authorRole: article.authorRole || '',
      authorImage: article.authorImage || '',
      coverImage: article.coverImage || '',
      tags: Array.isArray(article.tags) ? article.tags : [],
      featured: !!article.featured,
      published: article.published !== false
    } : DEFAULT_VALUES,
    resetOptions: {
      keepDirtyValues: true, // Prevent form from resetting dirty values
      keepValues: mode === 'edit' // Keep values in edit mode
    }
  })

  // Add single effect to handle date initialization
  useEffect(() => {
    if (article && !dateInitialized && mode === 'edit') {
      console.log('Initializing dates with:', {
        publishDate: article.date || article.publishDate,
        updatedOn: article.updatedOn
      })

      const publishDate = parseDateSafely(article.date || article.publishDate)
      const updatedOn = parseDateSafely(article.updatedOn)

      if (publishDate) {
        form.setValue('publishDate', publishDate, {
          shouldValidate: true,
          shouldDirty: false
        })
      }

      if (updatedOn) {
        form.setValue('updatedOn', updatedOn, {
          shouldValidate: true,
          shouldDirty: false
        })
      }

      setDateInitialized(true)
    }
  }, [article, dateInitialized, form, mode])

  // Track initial article data
  useEffect(() => {
    if (article?.slug && dateInitialized !== article.slug) {
      console.log('Initializing form with article:', article.slug)
      form.reset(article)
      setDateInitialized(article.slug)
    }
  }, [article, form, dateInitialized])

  // Remove resetForm state if it exists
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  // Improve form initialization
  // Add date parsing helper
  function tryParseDate(date: string | Date | undefined): Date {
    if (!date) return new Date()
    try {
      const parsed = typeof date === 'string' ? parseISO(date) : date
      return isValid(parsed) ? parsed : new Date()
    } catch (error) {
      console.error('Date parsing error:', error)
      setDateError('Invalid date format')
      return new Date()
    }
  }

  // Add debug logging
  useEffect(() => {
    console.log('ArticleForm mounted with mode:', mode)
    console.log('Article data:', article)
  }, [mode, article])

  const { toast } = useToast()
  const [formData, setFormData] = useState<z.infer<typeof articleSchema> | null>(null)
  const [autoSlug, setAutoSlug] = useState(mode === 'create')
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const router = useRouter()
  const [saveState, setSaveState] = useState<'idle' | 'confirming' | 'saving'>('idle')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [savedSlug, setSavedSlug] = useState<string>('')

  // Add validation logging
  useEffect(() => {
    console.log('Form values after initialization:', form.getValues())
  }, [form])

  const content = form.watch('content')

  // Add markdown shortcuts
  const markdownShortcuts = [
    { key: 'b', pattern: '**', description: 'Bold' },
    { key: 'i', pattern: '_', description: 'Italic' },
    { key: 'k', pattern: '`', description: 'Code' },
    { key: 'l', pattern: '[]()', description: 'Link' },
    { key: 'shift+i', pattern: '![', description: 'Upload Image' },
  ]

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        const shortcut = markdownShortcuts.find(s => s.key === e.key)
        if (shortcut) {
          e.preventDefault()
          const selection = window.getSelection()?.toString()
          const content = form.getValues('content')
          const { pattern } = shortcut
          
          if (selection) {
            if (pattern.includes('[]()')) {
              form.setValue('content', content.replace(
                selection,
                `[${selection}]()`
              ))
            } else {
              form.setValue('content', content.replace(
                selection,
                `${pattern}${selection}${pattern}`
              ))
            }
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [form])

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch(e.key) {
          case 's':
            e.preventDefault()
            form.handleSubmit(onSubmit)()
            break
          case 'p':
            e.preventDefault()
            setShowPreview(!showPreview)
            break
          case 'b':
            e.preventDefault()
            const selection = window.getSelection()?.toString()
            if (selection) {
              const content = form.getValues('content')
              form.setValue('content', content.replace(
                selection,
                `**${selection}**`
              ))
            }
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  // Auto-save to localStorage
  const formValues = form.watch()
  useEffect(() => {
    if (mode === 'edit') return // Don't auto-save in edit mode
    
    const saveDraft = debounce(() => {
      localStorage.setItem(
        `article-draft-${lang}`,
        JSON.stringify(formValues)
      )
    }, 1000)

    saveDraft()
    return () => saveDraft.cancel()
  }, [formValues, lang, mode])

  // Load draft on mount
  useEffect(() => {
    if (mode === 'edit') return // Don't load drafts in edit mode
    
    const draft = localStorage.getItem(`article-draft-${lang}`)
    if (draft) {
      form.reset(JSON.parse(draft))
    }
  }, [mode, lang])

  // Clear draft after successful submission
  async function onSubmit(data: z.infer<typeof articleSchema>) {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
        lang,
        readingTime: data.readingTime || `${Math.ceil(data.content.split(/\s+/).length / 200)} min read`,
        featured: data.featured ?? false,
        published: data.published ?? true,
        authorRole: data.authorRole || '',
        authorImage: data.authorImage || '',
        coverImage: data.coverImage || '/images/blog/placeholder.svg'
      }

      const result = await createArticle(formData)
      
      if (result.slug) {
        window.location.href = `/${lang}/blog/${result.slug}`
      }
      localStorage.removeItem(`article-draft-${lang}`)
    } catch (error) {
      console.error('Error creating article:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add template selector
  const handleTemplateSelect = (templateKey: keyof typeof articleTemplates) => {
    const template = articleTemplates[templateKey]
    form.reset({
      ...form.getValues(),
      ...template
    })
  }

  // Update form onSubmit handler
  const handleSubmit = (data: z.infer<typeof articleSchema>) => {
    setFormData(data)
    setSaveState('confirming')
  }

  const handleConfirmSubmit = async () => {
    try {
      setSaveStatus('saving')
      
      const formData = form.getValues()
      
      // Ensure dates are valid before formatting
      const publishDate = formData.publishDate instanceof Date 
        ? formData.publishDate 
        : parseDateSafely(formData.publishDate)
        
      const updatedOn = formData.updatedOn instanceof Date 
        ? formData.updatedOn 
        : parseDateSafely(formData.updatedOn)
  
      if (!publishDate) {
        throw new Error('Invalid publish date')
      }
  
      const articleData = {
        ...formData,
        lang,
        readingTime: calculateReadingTime(formData.content),
        // Format dates to YYYY-MM-DD
        publishDate: format(publishDate, 'yyyy-MM-dd'),
        updatedOn: updatedOn ? format(updatedOn, 'yyyy-MM-dd') : undefined
      }
      
      // Add debug logging
      console.log('Submitting article data:', {
        publishDate: articleData.publishDate,
        updatedOn: articleData.updatedOn,
        originalPublishDate: formData.publishDate,
        originalUpdatedOn: formData.updatedOn
      })
      
      const result = mode === 'edit' 
        ? await updateArticle(articleData)
        : await createArticle(articleData)
      
      if (!result?.slug) {
        throw new Error(`Failed to ${mode} article`)
      }
  
      setSavedSlug(result.slug)
      setSaveStatus('success')
      localStorage.removeItem(`article-draft-${lang}`)
      
    } catch (error) {
      console.error(`Failed to ${mode} article:`, error)
      setSaveStatus('error')
      toast({
        title: "Error",
        description: `Failed to ${mode} article: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSaveStatus('idle')
    }
  }

  const handleViewArticle = () => {
    // Simple delay to ensure filesystem operations are complete
    setTimeout(() => {
      window.location.href = `/${lang}/blog/${savedSlug}`
    }, 1500)
  }

  const handleContinueEditing = () => {
    setSaveStatus('idle')
    setSaveState('idle')
  }

  // Auto-generate slug from title if autoSlug is true
  useEffect(() => {
    if (autoSlug && form.watch('title') && mode === 'create') {
      form.setValue('slug', createSlug(form.watch('title'), lang))
    }
  }, [form.watch('title'), autoSlug, lang, mode])

  // Add this function to handle file uploads
  const handleImageUpload = () => {
    setImageDialogOpen(true)
  }

  const handleImageInsert = (markdown: string) => {
    const content = form.getValues('content')
    const textarea = document.querySelector('.w-md-editor-text-input') as HTMLTextAreaElement
    
    if (textarea) {
      const newContent = insertMarkdown(content, markdown, {
        start: textarea.selectionStart,
        end: textarea.selectionEnd
      })
      form.setValue('content', newContent)
    } else {
      form.setValue('content', insertMarkdown(content, markdown))
    }
  }

  // Update the keyboard shortcuts effect
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch(e.key) {
          case 's':
            e.preventDefault()
            form.handleSubmit(onSubmit)()
            break
          case 'p':
            e.preventDefault()
            setShowPreview(!showPreview)
            break
          case 'b':
            e.preventDefault()
            const selection = window.getSelection()?.toString()
            if (selection) {
              const content = form.getValues('content')
              form.setValue('content', content.replace(
                selection,
                `**${selection}**`
              ))
            }
            break
          case 'i':
            if (e.shiftKey) {  // Ctrl/Cmd + Shift + I for image upload
              e.preventDefault()
              handleImageUpload()
            }
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  // Add resetForm function
  const resetForm = useCallback(() => {
    form.reset({
      title: '',
      slug: '',
      publishDate: new Date(),
      updatedOn: undefined,
      excerpt: '',
      content: '',
      author: '',
      authorRole: '',
      authorImage: '',
      coverImage: '',
      featured: false,
      readingTime: '',
      tags: [],
      published: true,
    })
    setShowPreview(false)
    setAutoSlug(true)
  }, [form])

  // Improve date format display
  const formatDateValue = useCallback((date: Date | undefined | string) => {
    if (!date) return <span className="text-muted-foreground">Pick a date</span>
    
    try {
      // Convert string dates to Date objects
      const dateObj = typeof date === 'string' ? new Date(date) : date
      
      // Handle UTC dates properly
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        return format(dateObj, 'PPP')
      }

      console.warn('Invalid date value:', date)
      return <span className="text-red-500">Invalid date</span>
    } catch (error) {
      console.error('Date formatting error:', error)
      return <span className="text-red-500">Invalid date</span>
    }
  }, [])

  // Add error handling for date fields
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'publishDate' || name === 'updatedOn') {
        const date = value[name]
        if (date && !isValid(new Date(date))) {
          setDateError(`Invalid ${name === 'publishDate' ? 'publish' : 'update'} date`)
        } else {
          setDateError(null)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  // Modify the header to show correct mode and remove New Article button in edit mode
  return (
    <Form {...form}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {mode === 'edit' ? 'Edit Article' : 'New Article'}
        </h2>
        {mode === 'create' && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowResetDialog(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </div>
        )}
      </div>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-8"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
          }
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">New Article</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Use Template</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                {Object.entries(articleTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleTemplateSelect(key as keyof typeof articleTemplates)}
                  >
                    {template.title}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={autoSlug && mode === 'create'}
                    placeholder="article-slug"
                  />
                </FormControl>
                {mode === 'create' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAutoSlug(!autoSlug)}
                  >
                    {autoSlug ? 'Edit' : 'Auto'}
                  </Button>
                )}
              </div>
              <FormDescription>
                {mode === 'edit' 
                  ? "The article's URL identifier"
                  : "The URL-friendly version of the title"
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Publish Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                        dateError && 'border-red-500'
                      )}
                    >
                      {formatDateValue(field.value)}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value instanceof Date ? field.value : parseISO(String(field.value))}
                    onSelect={(date) => {
                      if (date) {
                        // Ensure consistent UTC handling
                        const utcDate = new Date(Date.UTC(
                          date.getUTCFullYear(),
                          date.getUTCMonth(),
                          date.getUTCDate(),
                          12, 0, 0
                        ))
                        field.onChange(utcDate)
                        setDateError(null)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateError && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {dateError}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('updatedOn') && (
          <FormField
            control={form.control}
            name="updatedOn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Last Updated</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-[240px] pl-3 text-left font-normal"
                      >
                        {formatDateValue(field.value)}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value instanceof Date ? field.value : parseISO(String(field.value))}
                      onSelect={(date) => {
                        if (date) {
                          // Ensure consistent UTC handling
                          const utcDate = new Date(Date.UTC(
                            date.getUTCFullYear(),
                            date.getUTCMonth(),
                            date.getUTCDate(),
                            12, 0, 0
                          ))
                          field.onChange(utcDate)
                          setDateError(null)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Role</FormLabel>
                <FormControl>
                  <Input placeholder="Author role..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="authorImage"
            render={({ field }) => (
              <ImageField
                label="Author Image"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                folder="/team"
              />

            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <ImageField
                label="Cover Image"
                value={field.value}
                onChange={(url) => {
                  // Accept the URL directly from Cloudinary
                  field.onChange(url)
                }}
                folder="blog"
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  suggestions={[
                    'ai',
                    'technology',
                    'future',
                    'development',
                    'design',
                    'web',
                    'mobile',
                    'cloud',
                    'security'
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <div className={`flex-1 transition-all ${showPreview ? 'w-1/2' : 'w-full'}`}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Content (Markdown)</FormLabel>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleImageUpload}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        {showPreview ? <ChevronLeft /> : <ChevronRight />}
                      </Button>
                    </div>
                  </div>
                  <FormControl>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      preview="edit"
                      height={600}
                      className="md-editor-dark"
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder: 'Write your content here...',
                      }}
                      shortcuts="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {showPreview && (
            <div className="flex-1 w-1/2">
              <div className="sticky top-0">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert p-4 rounded-md border min-h-[600px] overflow-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {content || '*No content yet*'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Featured Article</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Published</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Add social preview before submit button */}
        <SocialPreview
          title={form.watch('title')}
          excerpt={form.watch('excerpt')}
          coverImage={form.watch('coverImage')}
          author={form.watch('author')}
          authorImage={form.watch('authorImage')}
        />

        {/* Show markdown shortcuts help */}
        <div className="text-sm text-gray-500">
          <p className="font-medium mb-1">Markdown Shortcuts:</p>
          <div className="grid grid-cols-2 gap-2">
            {markdownShortcuts.map(shortcut => (
              <div key={shortcut.key} className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 rounded">
                  ⌘{shortcut.key.toUpperCase()}
                </kbd>
                <span>{shortcut.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Update submit button text */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 
            (mode === 'edit' ? 'Saving...' : 'Creating...') : 
            (mode === 'edit' ? 'Save Changes' : 'Create Article')
          }
        </Button>

        <SaveConfirmDialog
          isOpen={saveState !== 'idle'}
          onConfirm={handleConfirmSubmit}
          onCancel={() => {
            setSaveStatus('idle')
            setSaveState('idle')
          }}
          onViewArticle={handleViewArticle}
          onContinueEditing={handleContinueEditing}
          isSaving={saveStatus === 'saving'}
          status={saveStatus}
          slug={savedSlug}
        />
      </form>

      {/* Only show reset dialog in create mode */}
      {mode === 'create' && (
        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start New Article?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all current content. Make sure you've saved your changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => form.reset(DEFAULT_VALUES)}>
                Start New
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        open={isImageDialogOpen}
        onOpenChange={setIsImageDialogOpen}
        onImageSelect={(url: string) => {
          if (imageField === 'cover') {
            form.setValue('coverImage', url)
          } else {
            form.setValue('authorImage', url)
          }
          setIsImageDialogOpen(false)
        }}
        folder={imageField === 'cover' ? 'blog' : 'team'} // Match Cloudinary folder structure
        title={`Select ${imageField === 'cover' ? 'Cover' : 'Author'} Image`}
      />
    </Form>
  )
}

// Add default values constant
const DEFAULT_VALUES = {
  title: '',
  slug: '',
  publishDate: new Date(),
  content: '',
  excerpt: '',
  author: '',
  authorRole: '',
  authorImage: '',
  coverImage: '',
  tags: [],
  featured: false,
  published: false
}

// Update parseDateSafely function
function parseDateSafely(dateStr: string | Date | undefined): Date | undefined {
  if (!dateStr) return undefined
  
  try {
    // Handle Date objects
    if (dateStr instanceof Date && isValid(dateStr)) {
      return dateStr
    }
    
    // Handle string dates
    if (typeof dateStr === 'string') {
      // Try parsing YYYY-MM-DD format first
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateStr.split('-').map(Number)
        // Create date at noon UTC to avoid timezone issues
        const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
        if (isValid(date)) {
          return date
        }
      }
      
      // Try parsing ISO format
      const isoDate = parseISO(dateStr)
      if (isValid(isoDate)) {
        return isoDate
      }
    }
    
    console.warn('Could not parse date:', dateStr)
    return new Date() // Fallback to current date instead of undefined
  } catch (error) {
    console.error('Date parsing error:', error, dateStr)
    return new Date() // Fallback to current date instead of undefined
  }
}