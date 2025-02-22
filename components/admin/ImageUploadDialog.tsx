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
import Image from "next/image"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

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
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, folder]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/images?folder=${folder}`);
      const data = await res.json();

      // Handle both array response and error response
      if (data.error) {
        throw new Error(data.error);
      }

      // Ensure we have an array of images
      const imageArray = Array.isArray(data.images) ? data.images : [];
      
      // Format paths based on mode
      const formattedImages = imageArray.map((img: string) => {
        if (mode === 'editor') {
          // For editor, return markdown format
          return img.startsWith('/') ? img : `/${img}`;
        }
        // For field mode, return normal path
        return img.startsWith('/') ? img : `/${img}`;
      });

      setImages(formattedImages);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setError('Failed to load images. Please try again.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      setLoading(true)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      onImageSelect(data.url)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (image: string) => {
    // Ensure image path starts with a slash
    const imagePath = image.startsWith('/') ? image : `/${image}`
    
    // For editor mode, just return the URL
    onImageSelect(imagePath)
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
            <div className="min-h-[200px]">
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
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div
                      key={image}
                      onClick={() => handleImageSelect(image)}
                      className="relative aspect-video cursor-pointer rounded-md overflow-hidden hover:ring-2 hover:ring-primary"
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                  {images.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">
                      No images found in this folder
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