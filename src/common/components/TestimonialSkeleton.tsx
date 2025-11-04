import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="flex-1 p-8 glass-card">
      {/* Rating stars skeleton */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded" />
        ))}
      </div>

      {/* Quote skeleton - 3 lines */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Author skeleton */}
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

