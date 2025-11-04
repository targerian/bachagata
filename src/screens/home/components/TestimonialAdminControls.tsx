import type React from "react";
import { useState } from "react";
import { Check, X, Trash2, Loader2 } from "lucide-react";
import type { Testimonial } from "@/lib/supabase";

export interface TestimonialAdminControlsProps {
  testimonial: Testimonial;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  onDelete: () => void;
}

export const TestimonialAdminControls: React.FC<TestimonialAdminControlsProps> = ({
  testimonial,
  onApprove,
  onReject,
  onDelete,
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await onApprove();
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await onReject();
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="absolute top-2 right-2 flex gap-2 z-10">
      {!testimonial.is_approved ? (
        <button
          type="button"
          onClick={handleApprove}
          disabled={isApproving}
          className="glass-card p-2 hover:bg-green-500/20 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Approve and show in app"
        >
          {isApproving ? (
            <Loader2 className="h-5 w-5 text-green-400 animate-spin" />
          ) : (
            <Check className="h-5 w-5 text-green-400" />
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleReject}
          disabled={isRejecting}
          className="glass-card p-2 hover:bg-yellow-500/20 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Hide from app"
        >
          {isRejecting ? (
            <Loader2 className="h-5 w-5 text-yellow-400 animate-spin" />
          ) : (
            <X className="h-5 w-5 text-yellow-400" />
          )}
        </button>
      )}
      <button
        type="button"
        onClick={onDelete}
        className="glass-card p-2 hover:bg-red-500/20 transition-colors rounded"
        title="Delete testimonial"
      >
        <Trash2 className="h-5 w-5 text-red-400" />
      </button>
    </div>
  );
};

