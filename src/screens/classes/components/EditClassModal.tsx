import { ImagePlus, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button, ImageCropper, Input, Modal } from "@/common/components";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { type Class, supabase } from "@/lib/supabase";

export interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  classData: Class;
}

export const EditClassModal: React.FC<EditClassModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  classData,
}) => {
  const { user } = useAuth();
  const [name, setName] = useState(classData.name);
  const [place, setPlace] = useState(classData.place);
  const [dateTime, setDateTime] = useState(
    new Date(classData.date_time).toISOString().slice(0, 16),
  );
  const [duration, setDuration] = useState(classData.duration.toString());
  const [description, setDescription] = useState(classData.description);
  const [price, setPrice] = useState(classData.price?.toString() || "");
  const [isRecurring, setIsRecurring] = useState(classData.is_recurring);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For recurring classes
  const initialDate = new Date(classData.date_time);
  const [dayOfWeek, setDayOfWeek] = useState(initialDate.getDay().toString());
  const [time, setTime] = useState(
    `${initialDate.getHours().toString().padStart(2, "0")}:${initialDate.getMinutes().toString().padStart(2, "0")}`,
  );

  const daysOfWeek = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];

  // Image upload states
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    classData.image_url || "",
  );

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
      setShowImageUpload(false);
      setPreviewUrl("");
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const getNextOccurrence = (dayOfWeek: number, time: string): string => {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    // Start from today
    const targetDate = new Date(now);
    targetDate.setHours(hours, minutes, 0, 0);

    // Calculate days until target day of week
    const currentDay = now.getDay();
    let daysUntilTarget = dayOfWeek - currentDay;

    // If target day is today but time has passed, or target day is before today, go to next week
    if (
      daysUntilTarget < 0 ||
      (daysUntilTarget === 0 &&
        now.getHours() * 60 + now.getMinutes() >= hours * 60 + minutes)
    ) {
      daysUntilTarget += 7;
    }

    targetDate.setDate(targetDate.getDate() + daysUntilTarget);

    return targetDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Calculate date_time based on recurring status
      let finalDateTime: string;
      if (isRecurring) {
        finalDateTime = getNextOccurrence(parseInt(dayOfWeek, 10), time);
      } else {
        finalDateTime = dateTime;
      }

      const { error: updateError } = await supabase
        .from("classes")
        .update({
          name,
          place,
          date_time: finalDateTime,
          duration: parseInt(duration, 10),
          description,
          price: price ? parseFloat(price) : null,
          image_url: uploadedImageUrl || null,
          is_recurring: isRecurring,
        })
        .eq("id", classData.id);

      if (updateError) throw updateError;

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating class:", err);
      setError(err instanceof Error ? err.message : "Failed to update class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Class">
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

          <div className="flex items-center gap-3 mb-2">
            <Checkbox
              id="recurring-edit"
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
            />
            <label
              htmlFor="recurring-edit"
              className="text-text-primary text-sm cursor-pointer select-none"
            >
              This class repeats weekly
            </label>
          </div>

          {isRecurring ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 w-full">
                <label
                  htmlFor="dayOfWeekEdit"
                  className="text-text-secondary text-sm font-medium block mb-2"
                >
                  Day of Week
                </label>
                <select
                  id="dayOfWeekEdit"
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full h-12 px-4 pr-10 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary focus:outline-none focus:border-rose-gold transition-all appearance-none cursor-pointer hover:bg-white/10 hover:border-rose-gold/50"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23B76E79' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                  }}
                  required
                >
                  {daysOfWeek.map((day) => (
                    <option
                      key={day.value}
                      value={day.value}
                      className="bg-background-dark text-text-primary py-2"
                    >
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 w-full">
                <label
                  htmlFor="classTimeEdit"
                  className="text-text-secondary text-sm font-medium block mb-2"
                >
                  Time
                </label>
                <input
                  id="classTimeEdit"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary focus:outline-none focus:border-rose-gold transition-all cursor-pointer hover:bg-white/10 hover:border-rose-gold/50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                  required
                />
              </div>
            </div>
          ) : (
            <Input
              label="Date & Time"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          )}

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
            <label
              htmlFor="description-edit"
              className="text-text-secondary text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description-edit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what students will learn..."
              className="w-full min-h-24 px-4 py-3 rounded-lg border-2 border-white/20 bg-white/5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-rose-gold transition-colors"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary text-sm font-medium">
              Class Image (optional)
            </span>
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

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose} size="md" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" size="md" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
