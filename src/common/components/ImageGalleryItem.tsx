import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageGalleryItemProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  fillHeight?: boolean;
  isVideo?: boolean;
  onClick?: () => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  src,
  alt,
  className,
  aspectRatio = "square",
  fillHeight = false,
  isVideo = false,
  onClick,
}) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const handleClick = () => {
    if (isVideo && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl",
        fillHeight && "h-full",
        isVideo && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (isVideo && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={isVideo ? "button" : undefined}
      tabIndex={isVideo ? 0 : undefined}
    >
      <div
        className={cn(
          "w-full transform bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-105",
          fillHeight ? "h-full" : aspectRatioClasses[aspectRatio],
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
      {/* Video overlay with play icon */}
      {isVideo && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
          <div className="bg-white/90 rounded-full p-4 transform transition-all duration-300 group-hover:scale-110">
            <Play className="h-8 w-8 text-black fill-black" />
          </div>
        </div>
      )}
    </div>
  );
};
