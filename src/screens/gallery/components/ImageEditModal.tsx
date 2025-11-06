import type React from "react";
import { useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Modal, Button, Input, Select, ImageCropper } from "@/common/components";
import { supabase, type GalleryImage } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  image: GalleryImage;
}

const categoryOptions = [
  { value: "Performances", label: "Performances" },
  { value: "Workshops", label: "Workshops" },
  { value: "Socials", label: "Socials" },
];

export const ImageEditModal: React.FC<ImageEditModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  image,
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [category, setCategory] = useState(image.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image replacement states
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");

  const handleDeleteAndReplace = () => {
    // Just show file picker
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setShowImageUpload(true);
      }
    };
    input.click();
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      // Delete old image from storage
      const oldImagePath = image.image_url.split("/").pop();
      if (oldImagePath) {
        await supabase.storage.from("gallery-images").remove([oldImagePath]);
      }

      // Upload new cropped image
      const fileName = `${Date.now()}-${selectedFile?.name || "image.jpg"}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, croppedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

      setNewImageUrl(publicUrl);
      setShowImageUpload(false);
      setPreviewUrl("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updateData: any = {
        category,
        title,
        description,
      };

      // If new image was uploaded, update the image_url too
      if (newImageUrl) {
        updateData.image_url = newImageUrl;
      }

      const { error: updateError } = await supabase
        .from("gallery_images")
        .update(updateData)
        .eq("id", image.id);

      if (updateError) throw updateError;

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating image:", err);
      setError(err instanceof Error ? err.message : "Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Image">
      {showImageUpload && previewUrl ? (
        <ImageCropper
          src={previewUrl}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowImageUpload(false);
            setPreviewUrl("");
            setSelectedFile(null);
          }}
          loading={loading}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <div className="relative">
              <img
                src={newImageUrl || image.image_url}
                alt={image.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleDeleteAndReplace}
                className="absolute top-2 right-2 glass-card p-2 hover:bg-rose-gold/20 transition-colors rounded flex items-center gap-2"
                title="Replace image"
              >
                <Trash2 className="h-4 w-4 text-rose-gold" />
                <ImagePlus className="h-4 w-4 text-rose-gold" />
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-2 text-center">
              Click the icon to delete and upload a new image
            </p>
          </div>

        <Select
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as GalleryImage["category"])
          }
          required
        />

        <Input
          label="Title"
          placeholder="Enter image title"
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
            placeholder="Enter image description"
            className="w-full min-h-24 px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-gold transition-colors"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose} size="md">
              Cancel
            </Button>
            <Button type="submit" size="md" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

