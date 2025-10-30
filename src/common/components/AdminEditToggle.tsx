import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Edit3, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export interface AdminEditToggleProps {
  isEditMode: boolean;
  onToggle: (isEditMode: boolean) => void;
}

export const AdminEditToggle: React.FC<AdminEditToggleProps> = ({
  isEditMode,
  onToggle,
}) => {
  const { isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  if (!isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
      {/* Menu */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="glass-card p-2 flex flex-col gap-1 mb-2"
        >
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded transition-colors text-left"
          >
            Sign Out
          </button>
        </motion.div>
      )}

      {/* Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="glass-card p-3 hover:bg-white/10 transition-colors rounded-full"
          title="Admin Menu"
        >
          <MoreVertical className="h-5 w-5 text-rose-gold" />
        </button>

        <button
          type="button"
          onClick={() => onToggle(!isEditMode)}
          className={`glass-card px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-all ${
            isEditMode ? "ring-2 ring-rose-gold" : ""
          }`}
          title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        >
          <Edit3
            className={`h-5 w-5 ${isEditMode ? "text-rose-gold" : "text-text-secondary"}`}
          />
          <span
            className={`text-sm font-medium ${isEditMode ? "text-rose-gold" : "text-text-secondary"}`}
          >
            {isEditMode ? "Exit Edit" : "Edit Mode"}
          </span>
        </button>
      </div>
    </div>
  );
};

