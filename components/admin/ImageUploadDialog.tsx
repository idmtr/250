"use client"

import React, { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, Link2, FolderOpen } from 'lucide-react'
// import { uploadImage, createImageMarkdown } from '@/lib/utils/image'
// import Image from "next/image"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

import { SmartImage } from "@/components/common/SmartImage";
import { CldImage } from 'next-cloudinary'
import { cloudinaryConfig } from '@/lib/cloudinary/config'

interface CloudinaryImage {
  url: string;
  publicId: string;
  created: string;
  width: number;
  height: number;
}

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageSelect: (url: string) => void;
  folder: string;
  title?: string;
  mode?: 'field' | 'editor';  // Add mode prop to differentiate usage
}

export function ImageUploadDialog({
  open,
  onOpenChange,
  onImageSelect,
  folder,
  title = 'Select Image',
  mode = 'field'
}: ImageUploadDialogProps) {
  const [images, setImages] = useState<Array<{ url: string; publicId: string; width: number; height: number }>>([])
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, folder]);

  const normalizeFolder = (path: string): string => {
    return path
      .replace(/^\//, '')          // Remove leading slash
      .replace(/\/$/, '')          // Remove trailing slash
      .replace(/^images\//, '')    // Remove 'images/' prefix if present
  }

  const fetchImages = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Remove leading slash if present
      const normalizedFolder = folder.replace(/^\/+/, '')
      
      const res = await fetch(`/api/images?folder=${encodeURIComponent(normalizedFolder)}`)
      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch images')
      }

      console.log(`Loaded ${data.images?.length || 0} images`)
      setImages(data.images || [])
    } catch (error) {
      console.error('Failed to fetch images:', error)
      setError(error.message || 'Failed to load images')
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", normalizeFolder(folder))

    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      
      const data = await res.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Use the Cloudinary URL directly
      onImageSelect(data.url)
      onOpenChange(false)
      
      // Refresh the image list
      fetchImages()
    } catch (error) {
      console.error("Failed to upload image:", error)
      setError(error.message || 'Failed to upload image')
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (imageUrl: string) => {
    // For Cloudinary images, use the secure_url directly
    if (imageUrl.includes('cloudinary.com')) {
      onImageSelect(imageUrl)
    } else {
      // For other images, ensure proper path formatting
      const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
      onImageSelect(imagePath)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="url">
              <Link2 className="w-4 h-4 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger value="browse" onClick={() => fetchImages()}>
              <FolderOpen className="w-4 h-4 mr-2" />
              Browse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full h-32 border-2 border-dashed"
            >
              {loading ? "Uploading..." : "Click or drag to upload"}
            </Button>
          </TabsContent>

          <TabsContent value="url" className="py-4">
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image URL..."
              />
              <Button 
                onClick={() => {
                  onImageSelect(urlInput)
                  onOpenChange(false)
                }}
              >
                Add
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="browse" className="py-4">
            <div className="min-h-[200px] max-h-[80vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center h-40">
                  <span className="loading loading-spinner" />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-3 gap-4 p-2">
                  {images.map((image) => (
                    <div
                      key={image.publicId}
                      onClick={() => handleImageSelect(image.url)} // Use image.url instead of transforming
                      className="relative aspect-video cursor-pointer rounded-md overflow-hidden hover:ring-2 hover:ring-primary"
                    >
                      <CldImage
                        src={image.publicId}
                        width={300}
                        height={200}
                        alt=""
                        className="object-cover"
                        {...cloudinaryConfig.transformations.preview}
                      />
                    </div>
                  ))}
                  {images.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">
                      No images found in folder: {folder}
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}