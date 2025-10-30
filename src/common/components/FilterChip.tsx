import React from "react";
import { cn } from "@/lib/utils";

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-full px-5",
          "text-sm font-medium leading-normal transition-all duration-200",
          active
            ? "bg-rose-gold text-background-dark"
            : "border border-rose-gold/40 bg-transparent text-text-primary hover:bg-rose-gold/20",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

FilterChip.displayName = "FilterChip";
