import type React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import type { GalleryImage } from "@/lib/supabase";

export interface AdminControlsProps {
  image: GalleryImage;
  onEdit: () => void;
  onDelete: () => void;
}

export const AdminControls: React.FC<AdminControlsProps> = ({
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-2 right-2 flex gap-2 z-10"
    >
      <button
        type="button"
        onClick={onEdit}
        className="glass-card p-2 hover:bg-white/20 transition-colors rounded"
        title="Edit image"
      >
        <Edit2 className="h-4 w-4 text-text-primary" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="glass-card p-2 hover:bg-red-500/20 transition-colors rounded"
        title="Delete image"
      >
        <Trash2 className="h-4 w-4 text-red-400" />
      </button>
    </motion.div>
  );
};

