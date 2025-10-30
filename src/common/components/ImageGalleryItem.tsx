import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageGalleryItemProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  src,
  alt,
  className,
  aspectRatio = "square",
}) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-xl", className)}>
      <div
        className={cn(
          "w-full transform bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-105",
          aspectRatioClasses[aspectRatio],
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};
