import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, children, ...props }, ref) => {
    const select = (
      <div className="relative">
        <select
          className={cn(
            "w-full appearance-none rounded-lg",
            "border-2 border-white/20 bg-white/5 px-4 py-3",
            "text-text-primary focus:border-rose-gold focus:outline-none focus:ring-0",
            "text-base font-normal transition-colors",
            className,
          )}
          ref={ref}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    );

    if (label) {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary text-sm font-medium">
            {label}
          </label>
          {select}
        </div>
      );
    }

    return select;
  },
);

Select.displayName = "Select";
