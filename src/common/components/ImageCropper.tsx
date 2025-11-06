import { Loader2 } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "./Button";

export interface ImageCropperProps {
  src: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
  aspect?: number;
  loading?: boolean;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  onCropComplete,
  onCancel,
  aspect,
  loading = false,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: aspect ? 80 / aspect : 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImg = useCallback(
    async (
      image: HTMLImageElement,
      pixelCrop: PixelCrop,
    ): Promise<Blob | null> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return null;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      });
    },
    [],
  );

  const handleCropComplete = async () => {
    if (completedCrop && imgRef.current) {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      if (croppedBlob) {
        onCropComplete(croppedBlob);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-[500px] overflow-auto">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            src={src}
            alt="Crop preview"
            className="max-w-full h-auto"
          />
        </ReactCrop>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          size="md"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleCropComplete}
          size="md"
          disabled={!completedCrop || loading}
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying...
            </div>
          ) : (
            "Apply Crop"
          )}
        </Button>
      </div>
    </div>
  );
};
