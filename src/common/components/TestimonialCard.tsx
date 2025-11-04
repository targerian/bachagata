import React from "react";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  rating: number;
  quote: string;
  author: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  quote,
  author,
  className,
}) => {
  return (
    <div className={cn("flex-1 p-8 glass-card", className)}>
      <div className="mb-4">
        <Rating rating={rating} size="md" />
      </div>
      <blockquote className="text-text-secondary italic mb-4">
        "{quote}"
      </blockquote>
      <footer className="text-rose-gold font-bold">- {author}</footer>
    </div>
  );
};
