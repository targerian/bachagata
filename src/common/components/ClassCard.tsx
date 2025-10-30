import React from "react";
import { cn } from "@/lib/utils";

export interface ClassCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-8 glass-card hover:border-rose-gold/50 transition-all duration-300",
        className,
      )}
    >
      <div className="p-4 bg-rose-gold/10 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-center text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};
