"use client";

import Image from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  loading?: "eager" | "lazy";
}

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  fill,
  className,
  width = 800,
  height = 600,
  priority = false,
}) => {
  const [error, setError] = useState(false);
  const isExternal = src.startsWith("http");
  const isSVG = src.endsWith(".svg");

  // Handle SVGs differently
  if (isSVG && fill) {
    return (
      <div className="relative w-full h-full">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
        />
      </div>
    );
  }

  // Normalize path
  const imagePath = error ? "/images/placeholders/placeholder.webp" : src;

  // Separate props for external and internal images
  const imageProps = {
    src: imagePath,
    alt,
    className,
    priority: priority || fill,
    quality: 90,
    onError: () => setError(true),
    ...(isExternal
      ? {
          unoptimized: true,
          loader: ({ src }: { src: string }) => src,
          blurDataURL: "/images/placeholders/placeholder.webp",
          placeholder: "blur",
        }
      : {}),
  };

  return (
    <div className={fill ? "relative w-full h-full" : "relative"}>
      <Image
        {...imageProps}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={
          fill
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            : undefined
        }
      />
    </div>
  );
};

export default CustomImage;
