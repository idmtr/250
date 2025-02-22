"use client";

import { useState } from "react";
import Image from "next/image";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageUploadDialog } from "./ImageUploadDialog";
import { ImageIcon, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Add allowed domains array
const ALLOWED_DOMAINS = [
  'twofifty-consulting.com',
  'localhost',
  // add other allowed domains here
];

interface ImageFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  folder: string;
}

export function ImageField({
  label,
  value = "",
  onChange,
  folder,
}: ImageFieldProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidImage, setIsValidImage] = useState(true);

  // Validate if URL is from allowed domains
  const isAllowedImageUrl = (url: string) => {
    if (!url) return true;
    if (url.startsWith('/')) return true;
    
    try {
      const { hostname } = new URL(url);
      return ALLOWED_DOMAINS.includes(hostname);
    } catch {
      return false;
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setError(null);
    
    if (!imageUrl) {
      onChange("");
      return;
    }

    if (!isAllowedImageUrl(imageUrl)) {
      setError(`Image URL must be from an allowed domain. Please upload the image first or use a URL from: ${ALLOWED_DOMAINS.join(', ')}`);
      return;
    }

    onChange(imageUrl);
    setDialogOpen(false);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDialogOpen(true)}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Select Image
          </Button>
          {value && (
            <Button
              type="button"
              variant="outline"
              onClick={() => handleImageSelect("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {value && !error && (
          <div className="relative aspect-video rounded-lg border overflow-hidden">
            <Image
              src={value}
              alt=""
              fill
              className="object-cover"
              onError={() => {
                setIsValidImage(false);
                setError("Failed to load image. Please check the URL or try uploading the image.");
              }}
              onLoad={() => {
                setIsValidImage(true);
                setError(null);
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <ImageUploadDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onImageSelect={handleImageSelect}
          folder={folder}
          title={`Select ${label}`}
        />
      </div>
    </FormItem>
  );
}
