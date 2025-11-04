import React from "react";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";

export interface OverallRatingProps {
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export const OverallRating: React.FC<OverallRatingProps> = ({
  averageRating,
  totalReviews,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
      <Rating rating={averageRating} size="lg" />
        <span className="text-2xl font-bold text-text-primary">
          {averageRating.toFixed(1)}
        </span>
      </div>
      <p className="text-text-secondary text-sm">
        Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
      </p>
    </div>
  );
};
