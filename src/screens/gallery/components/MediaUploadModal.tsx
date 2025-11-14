import type React from "react";
import { useState } from "react";
import { ImagePlus, Video } from "lucide-react";
import { Modal, Button, Input, Select, ImageCropper } from "@/common/components";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import {
  extractYouTubeVideoId,
  getYouTubeThumbnailUrl,
  isValidYouTubeUrl,
} from "@/lib/youtube";

export interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const categoryOptions = [
  { value: "Performances", label: "Performances" },
  { value: "Workshops", label: "Workshops" },
  { value: "Socials", label: "Socials" },
];

type MediaType = "image" | "video";
type ImageStep = "select" | "crop" | "details";
type VideoStep = "url" | "details";

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [mediaType, setMediaType] = useState<MediaType>("image");
  
  // Image-specific state
  const [imageStep, setImageStep] = useState<ImageStep>("select");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  
  // Video-specific state
  const [videoStep, setVideoStep] = useState<VideoStep>("url");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  
  // Shared state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Performances");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageStep("crop");
    }
  };

  const handleCropComplete = (blob: Blob) => {
    setCroppedBlob(blob);
    setImageStep("details");
  };

  const handleYoutubeUrlSubmit = () => {
    setError("");
    
    if (!isValidYouTubeUrl(youtubeUrl)) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    
    const extractedVideoId = extractYouTubeVideoId(youtubeUrl);
    if (!extractedVideoId) {
      setError("Could not extract video ID from URL");
      return;
    }
    
    setVideoId(extractedVideoId);
    setThumbnailUrl(getYouTubeThumbnailUrl(extractedVideoId));
    setVideoStep("details");
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!croppedBlob || !user) return;

    setLoading(true);
    setError("");

    try {
      // Upload image to Supabase Storage
      const fileName = `${Date.now()}-${selectedFile?.name || "image.jpg"}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, croppedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

      // Insert into database
      const { error: dbError } = await supabase.from("gallery_images").insert({
        category,
        title,
        description,
        image_url: publicUrl,
        media_type: "image",
        created_by: user.id,
      });

      if (dbError) throw dbError;

      // Success
      onSuccess();
      handleClose();
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoId || !user) return;

    setLoading(true);
    setError("");

    try {
      // Insert into database
      const { error: dbError } = await supabase.from("gallery_images").insert({
        category,
        title,
        description,
        image_url: thumbnailUrl,
        media_type: "video",
        youtube_video_id: videoId,
        thumbnail_url: thumbnailUrl,
        created_by: user.id,
      });

      if (dbError) throw dbError;

      // Success
      onSuccess();
      handleClose();
    } catch (err) {
      console.error("Error uploading video:", err);
      setError(err instanceof Error ? err.message : "Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset all state
    setMediaType("image");
    setImageStep("select");
    setVideoStep("url");
    setSelectedFile(null);
    setPreviewUrl("");
    setCroppedBlob(null);
    setYoutubeUrl("");
    setVideoId("");
    setThumbnailUrl("");
    setTitle("");
    setDescription("");
    setCategory("Performances");
    setError("");
    onClose();
  };

  const renderMediaTypeSelector = () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-text-primary text-lg font-medium text-center">
        Choose media type
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <label className="glass-card p-8 border-2 border-white/20 hover:border-rose-gold/50 transition-all cursor-pointer text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <ImagePlus className="h-12 w-12 mx-auto mb-3 text-text-secondary" />
          <p className="text-text-primary font-medium">Image</p>
          <p className="text-text-secondary text-sm mt-1">Upload a photo</p>
        </label>
        <button
          type="button"
          onClick={() => {
            setMediaType("video");
            setVideoStep("url");
          }}
          className="glass-card p-8 border-2 border-white/20 hover:border-rose-gold/50 transition-all cursor-pointer text-center"
        >
          <Video className="h-12 w-12 mx-auto mb-3 text-text-secondary" />
          <p className="text-text-primary font-medium">Video</p>
          <p className="text-text-secondary text-sm mt-1">YouTube link</p>
        </button>
      </div>
    </div>
  );

  const renderVideoUrlStep = () => (
    <div className="flex flex-col gap-4">
      <Input
        label="YouTube URL"
        placeholder="https://www.youtube.com/watch?v=..."
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        required
      />
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div className="flex justify-end gap-3 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          size="md"
        >
          Cancel
        </Button>
        <Button onClick={handleYoutubeUrlSubmit} size="md">
          Continue
        </Button>
      </div>
    </div>
  );

  const renderDetailsForm = () => {
    const isImage = mediaType === "image";
    const handleSubmit = isImage ? handleImageSubmit : handleVideoSubmit;

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Show thumbnail preview for videos */}
        {!isImage && thumbnailUrl && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-auto"
            />
          </div>
        )}

        <Select
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <Input
          label="Title"
          placeholder={`Enter ${mediaType} title`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-text-secondary text-sm font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Enter ${mediaType} description`}
            className="w-full min-h-24 px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-gold transition-colors"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            size="md"
          >
            Cancel
          </Button>
          <Button type="submit" size="md" disabled={loading}>
            {loading ? "Uploading..." : `Upload ${mediaType === "image" ? "Image" : "Video"}`}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload New Media">
      {mediaType === "image" && imageStep === "select" && renderMediaTypeSelector()}
      {mediaType === "image" && imageStep === "crop" && previewUrl && (
        <ImageCropper
          src={previewUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleClose}
        />
      )}
      {mediaType === "image" && imageStep === "details" && renderDetailsForm()}
      {mediaType === "video" && videoStep === "url" && renderVideoUrlStep()}
      {mediaType === "video" && videoStep === "details" && renderDetailsForm()}
    </Modal>
  );
};

