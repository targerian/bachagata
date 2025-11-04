import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ClassSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image skeleton */}
        <Skeleton className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg" />

        {/* Content skeleton */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Title and date */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Details */}
          <div className="flex gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Button */}
          <Skeleton className="h-9 w-24 mt-2" />
        </div>
      </div>
    </div>
  );
};

