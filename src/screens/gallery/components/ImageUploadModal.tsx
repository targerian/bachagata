import type React from "react";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Modal, Button, Input, Select, ImageCropper } from "@/common/components";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const categoryOptions = [
  { value: "Performances", label: "Performances" },
  { value: "Workshops", label: "Workshops" },
  { value: "Socials", label: "Socials" },
];

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<"select" | "crop" | "details">("select");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
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
      setStep("crop");
    }
  };

  const handleCropComplete = (blob: Blob) => {
    setCroppedBlob(blob);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleClose = () => {
    setStep("select");
    setSelectedFile(null);
    setPreviewUrl("");
    setCroppedBlob(null);
    setTitle("");
    setDescription("");
    setCategory("Performances");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload New Image">
      {step === "select" && (
        <div className="flex flex-col items-center gap-4">
          <label className="w-full glass-card p-8 border-2 border-dashed border-white/20 hover:border-rose-gold/50 transition-colors cursor-pointer text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <ImagePlus className="h-12 w-12 mx-auto mb-3 text-text-secondary" />
            <p className="text-text-primary font-medium mb-1">
              Click to select image
            </p>
            <p className="text-text-secondary text-sm">
              PNG, JPG, GIF up to 10MB
            </p>
          </label>
        </div>
      )}

      {step === "crop" && previewUrl && (
        <ImageCropper
          src={previewUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleClose}
        />
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              size="md"
            >
              Cancel
            </Button>
            <Button type="submit" size="md" disabled={loading}>
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

