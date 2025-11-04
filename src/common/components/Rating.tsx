import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const displayRating = interactive && hoverRating !== null ? hoverRating : rating;

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const difference = displayRating - index;

    // Full star
    if (difference >= 1) {
  return (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            "fill-warm-gold text-warm-gold transition-all",
            interactive && "cursor-pointer hover:scale-110",
          )}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      );
    }

    // Half star
    if (difference > 0 && difference < 1) {
        return (
        <div key={index} className="relative">
          <Star
            className={cn(
              sizeClasses[size],
              "text-warm-gold transition-all",
              interactive && "cursor-pointer hover:scale-110",
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${difference * 100}%` }}
          >
            <Star
              className={cn(sizeClasses[size], "fill-warm-gold text-warm-gold")}
            />
          </div>
        </div>
      );
    }

    // Empty star
    return (
                <Star
        key={index}
                  className={cn(
                    sizeClasses[size],
          "text-warm-gold transition-all",
          interactive && "cursor-pointer hover:scale-110 hover:fill-warm-gold/50",
                  )}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
                />
    );
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
    </div>
  );
};
