'use client'

import { CldImage } from 'next-cloudinary'
import { getImageInfo } from '@/lib/cloudinary/mappings'
import { cloudinaryConfig } from '@/lib/cloudinary/config'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  fill?: boolean
  overrideTransformation?: keyof typeof cloudinaryConfig.transformations
}

export function SmartImage({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  priority,
  fill,
  overrideTransformation
}: SmartImageProps) {
  const { publicId, transformation } = getImageInfo(src)
  const transformationConfig = cloudinaryConfig.transformations[overrideTransformation || transformation]

  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width || transformationConfig.width}
      height={height || transformationConfig.height}
      className={className}
      {...transformationConfig}
      sizes={sizes}
      priority={priority}
      fill={fill}
    />
  )
}