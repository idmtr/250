'use client'

import { CldImage, type CldImageProps } from 'next-cloudinary'

interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  src: string
  alt: string
  className?: string
}

export function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  // Remove /images/ prefix and file extension if present
  const publicId = src
    .replace(/^\/images\//, '')
    .replace(/\.(jpg|jpeg|png|gif|webp)$/, '')

  return (
    <CldImage
      src={publicId}
      alt={alt}
      {...props}
    />
  )
}