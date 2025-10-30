import type React from "react";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Modal, Button, Input, ImageCropper } from "@/common/components";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image upload states
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCropComplete = async (blob: Blob) => {
    if (!user) return;

    setLoading(true);
    try {
      const fileName = `${Date.now()}-${selectedFile?.name || "class.jpg"}`;
      const { error: uploadError } = await supabase.storage
        .from("class-images")
        .upload(fileName, blob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("class-images").getPublicUrl(fileName);

      setUploadedImageUrl(publicUrl);
      setCroppedBlob(blob);
      setShowImageUpload(false);
      setPreviewUrl("");
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const { error: dbError } = await supabase.from("classes").insert({
        name,
        place,
        date_time: dateTime,
        duration: parseInt(duration, 10),
        description,
        price: price ? parseFloat(price) : null,
        image_url: uploadedImageUrl || null,
        is_recurring: isRecurring,
        created_by: user.id,
      });

      if (dbError) throw dbError;

      onSuccess();
      handleClose();
    } catch (err) {
      console.error("Error creating class:", err);
      setError(err instanceof Error ? err.message : "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPlace("");
    setDateTime("");
    setDuration("60");
    setDescription("");
    setPrice("");
    setIsRecurring(false);
    setShowImageUpload(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setCroppedBlob(null);
    setUploadedImageUrl("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Class">
      {showImageUpload && previewUrl ? (
        <ImageCropper
          src={previewUrl}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowImageUpload(false);
            setPreviewUrl("");
          }}
          aspect={4 / 3}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Class Name"
            placeholder="e.g., Sensual Bachata Fundamentals"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Location"
            placeholder="e.g., Studio 123, New York"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />

          <Input
            label="Date & Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />

          <Input
            label="Duration (minutes)"
            type="number"
            placeholder="60"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <Input
            label="Price (optional)"
            type="number"
            step="0.01"
            placeholder="25.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="text-text-secondary text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what students will learn..."
              className="w-full min-h-24 px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-gold transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-rose-gold checked:border-rose-gold focus:ring-2 focus:ring-rose-gold focus:ring-offset-0"
            />
            <label htmlFor="recurring" className="text-text-primary text-sm cursor-pointer">
              This class repeats weekly
            </label>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-text-secondary text-sm font-medium">
              Class Image (optional)
            </label>
            {uploadedImageUrl ? (
              <div className="relative">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImageUrl("")}
                  className="absolute top-2 right-2 glass-card p-2 hover:bg-red-500/20 transition-colors rounded"
                >
                  <X className="h-4 w-4 text-red-400" />
                </button>
              </div>
            ) : (
              <label className="glass-card p-4 border-2 border-dashed border-white/20 hover:border-rose-gold/50 transition-colors cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileSelect(e);
                    setShowImageUpload(true);
                  }}
                  className="hidden"
                />
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-text-secondary" />
                <p className="text-text-secondary text-sm">
                  Click to upload image
                </p>
              </label>
            )}
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
              {loading ? "Adding..." : "Add Class"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

