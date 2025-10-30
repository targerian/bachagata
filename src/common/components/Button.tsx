import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-[0.015em] rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-rose-gold text-text-primary hover:bg-opacity-90 hover:scale-105",
      secondary: "bg-wine text-text-primary hover:bg-wine-dark",
      ghost: "bg-transparent text-text-primary hover:bg-white/10",
      outline:
        "bg-transparent border-2 border-rose-gold/40 text-text-primary hover:bg-rose-gold/20 hover:border-rose-gold",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="truncate">{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
