"use client";

import { CldImage } from 'next-cloudinary';
import Image from "next/image";
import { useState } from "react";
import { cloudinaryConfig } from '@/lib/cloudinary/config';

interface CustomImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  transformation?: keyof typeof cloudinaryConfig.transformations;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fill,
  className,
  width = 800,
  height = 600,
  priority = false,
  sizes,
  transformation = 'optimized'
}) => {
  const [error, setError] = useState(false);
  const isCloudinary = src.includes('cloudinary.com');

  if (isCloudinary) {
    const publicId = src.split('/upload/')[1];
    return (
      <CldImage
        src={publicId}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        {...cloudinaryConfig.transformations[transformation]}
      />
    );
  }

  return (
    <div className={fill ? "relative w-full h-full" : "relative"}>
      <Image
        src={error ? "/images/placeholders/placeholder.webp" : src}
        alt={alt}
        className={className}
        priority={priority || fill}
        quality={90}
        onError={() => setError(true)}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
      />
    </div>
  );
};

export default CustomImage;
