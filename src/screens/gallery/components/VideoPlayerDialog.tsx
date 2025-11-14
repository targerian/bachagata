import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export interface VideoPlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export const VideoPlayerDialog: React.FC<VideoPlayerDialogProps> = ({
  isOpen,
  onClose,
  videoId,
  title,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] md:!max-w-[70vw] w-full p-0 overflow-hidden bg-background border-white/20">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-text-primary text-xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full pb-[56.25%]">
          {/* 16:9 Aspect Ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYouTubeEmbedUrl(videoId)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
