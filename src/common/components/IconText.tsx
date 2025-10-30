import React from "react";
import { cn } from "@/lib/utils";

export interface IconTextProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export const IconText: React.FC<IconTextProps> = ({
  icon,
  label,
  value,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="text-rose-gold text-2xl">{icon}</div>
      <div className="flex flex-col">
        <p className="text-text-secondary text-sm font-normal leading-normal">
          {label}
        </p>
        <p className="text-text-primary text-base font-medium leading-normal">
          {value}
        </p>
      </div>
    </div>
  );
};
