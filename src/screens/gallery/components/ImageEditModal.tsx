import type React from "react";
import { useState } from "react";
import { Modal, Button, Input, Select } from "@/common/components";
import { supabase, type GalleryImage } from "@/lib/supabase";

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
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [category, setCategory] = useState(image.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("gallery_images")
        .update({
          category,
          title,
          description,
        })
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb-4">
          <img
            src={image.image_url}
            alt={image.title}
            className="w-full h-48 object-cover rounded-lg"
          />
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
    </Modal>
  );
};

