import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <Skeleton className="w-full aspect-[3/4]" />
    </div>
  );
};

