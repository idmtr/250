'use client'

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
import { createArticle } from '@/lib/blog/actions'
import { ImageField } from './ImageField'
import { debounce } from 'lodash'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { articleTemplates } from '@/lib/blog/templates'
import { SocialPreview } from './SocialPreview'
import { TagInput } from './TagInput'
import { SaveConfirmDialog } from './SaveConfirmDialog'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
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

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  publishDate: z.date({
    required_error: "Please select a publish date",
  }),
  updatedOn: z.date().optional().nullable(),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  authorRole: z.string().optional(),
  authorImage: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  readingTime: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  lang: z.string().default('en'),
})

export function ArticleForm({ lang }: { lang: string }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [formData, setFormData] = useState<z.infer<typeof articleSchema> | null>(null)
  const [autoSlug, setAutoSlug] = useState(true)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const router = useRouter()
  const [saveState, setSaveState] = useState<'idle' | 'confirming' | 'saving'>('idle')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [savedSlug, setSavedSlug] = useState<string>('')

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      publishDate: new Date(), // Today's date by default
      updatedOn: undefined,
      excerpt: '',
      content: '',
      author: '', // Could be pulled from user session
      authorRole: '',
      authorImage: '',
      coverImage: '',
      featured: false,
      readingTime: '',
      tags: [],
      published: true,
    },
  })

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
    const saveDraft = debounce(() => {
      localStorage.setItem(
        `article-draft-${lang}`,
        JSON.stringify(formValues)
      )
    }, 1000)

    saveDraft()
    return () => saveDraft.cancel()
  }, [formValues, lang])

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(`article-draft-${lang}`)
    if (draft) {
      form.reset(JSON.parse(draft))
    }
  }, [])

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

  // Add actual submit function
  const handleConfirmSubmit = async () => {
    try {
      setSaveStatus('saving')
      
      const formData = form.getValues()
      const articleData = {
        ...formData,
        lang,
        readingTime: calculateReadingTime(formData.content), // Calculate once here
        publishDate: format(formData.publishDate, 'yyyy-MM-dd'),
        updatedOn: formData.updatedOn ? format(formData.updatedOn, 'yyyy-MM-dd') : undefined
      }
      
      const result = await createArticle(articleData)
      
      if (!result?.slug) {
        throw new Error('Failed to create article')
      }

      setSavedSlug(result.slug)
      setSaveStatus('success')
      
      // Clear the draft
      localStorage.removeItem(`article-draft-${lang}`)
      
    } catch (error) {
      console.error('Failed to save article:', error)
      setSaveStatus('error')
      toast({
        title: "Error",
        description: "Failed to save article. Please try again.",
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
    if (autoSlug && form.watch('title')) {
      form.setValue('slug', createSlug(form.watch('title'), lang))
    }
  }, [form.watch('title'), autoSlug, lang])

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

  return (
    <>
      <Form {...form}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {form.getValues('title') || 'New Article'}
          </h2>
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
                      disabled={autoSlug}
                      placeholder="article-slug"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAutoSlug(!autoSlug)}
                  >
                    {autoSlug ? 'Edit' : 'Auto'}
                  </Button>
                </div>
                <FormDescription>
                  The URL-friendly version of the title
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
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value instanceof Date ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value instanceof Date ? field.value : undefined}
                      onSelect={(date) => field.onChange(date || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                          {field.value instanceof Date ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value instanceof Date ? field.value : undefined}
                        onSelect={(date) => field.onChange(date || new Date())}
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
                  folder="images/team"
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
                  onChange={(value) => field.onChange(value)}
                  folder="images/blog"
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Article'
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
      </Form>

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
            <AlertDialogAction
              onClick={() => {
                resetForm()
                setShowResetDialog(false)
              }}
            >
              Start New
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ImageUploadDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onImageSelect={(imageUrl) => {
          // Create markdown format
          const markdown = `![](${imageUrl})`
          
          // Get the MDEditor textarea
          const textarea = document.querySelector('.w-md-editor-text-input') as HTMLTextAreaElement
          
          if (textarea) {
            // Get the current cursor position
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const content = form.getValues('content')
            
            // Insert markdown at cursor position
            const newContent = content.substring(0, start) + 
              markdown + 
              content.substring(end)
            
            // Update form content
            form.setValue('content', newContent)
            
            // Close dialog
            setImageDialogOpen(false)
            
            // Focus back on editor
            setTimeout(() => {
              textarea.focus()
              textarea.setSelectionRange(
                start + markdown.length,
                start + markdown.length
              )
            }, 100)
          } else {
            // Fallback if textarea not found
            const content = form.getValues('content')
            form.setValue('content', content + '\n' + markdown)
            setImageDialogOpen(false)
          }
        }}
        folder="images/blog"
        title="Insert Image"
        mode="editor"
      />
    </>
  )
}