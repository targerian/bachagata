import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = "text", ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(
          "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg",
          "text-text-primary focus:outline-0 focus:ring-1 focus:ring-rose-gold",
          "border border-border-color bg-black/30 focus:border-rose-gold",
          "h-12 placeholder:text-text-secondary/70 px-4 py-3",
          "text-base font-normal leading-normal transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    if (label) {
      return (
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-text-secondary text-base font-medium leading-normal pb-2">
            {label}
          </p>
          {input}
        </label>
      );
    }

    return input;
  },
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    const textarea = (
      <textarea
        className={cn(
          "flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg",
          "text-text-primary focus:outline-0 focus:ring-1 focus:ring-rose-gold",
          "border border-border-color bg-black/30 focus:border-rose-gold",
          "min-h-32 placeholder:text-text-secondary/70 px-4 py-3",
          "text-base font-normal leading-normal transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    if (label) {
      return (
        <label className="flex flex-col">
          <p className="text-text-secondary text-base font-medium leading-normal pb-2">
            {label}
          </p>
          {textarea}
        </label>
      );
    }

    return textarea;
  },
);

Textarea.displayName = "Textarea";
