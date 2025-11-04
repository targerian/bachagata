import type React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Edit2, Trash2 } from "lucide-react";
import type { Class } from "@/lib/supabase";
import { Button } from "@/common/components";
import {
  createWhatsAppEnquiryUrl,
  createWhatsAppBookingUrl,
} from "@/lib/whatsapp";
import { useContactInfo } from "@/hooks/useContactInfo";

export interface ClassListCardProps {
  classData: Class;
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ClassListCard: React.FC<ClassListCardProps> = ({
  classData,
  isEditMode,
  onEdit,
  onDelete,
}) => {
  const { data: contactInfo } = useContactInfo();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isPastClass = new Date(classData.date_time) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 ${isPastClass ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-48 h-48 flex-shrink-0">
          <img
            src={classData.image_url || "/images/lucy/DSC07535.JPG"}
            alt={classData.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-text-primary text-2xl font-bold mb-1">
                {classData.name}
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                {formatDate(classData.date_time)} at {formatTime(classData.date_time)}
              </p>
              {classData.is_recurring && (
                <span className="inline-block px-3 py-1 bg-rose-gold/20 text-rose-gold text-xs font-medium rounded-full">
                  Recurring Weekly
                </span>
              )}
            </div>

            {isEditMode && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onEdit}
                  className="glass-card p-2 hover:bg-white/10 transition-colors rounded"
                  title="Edit class"
                >
                  <Edit2 className="h-5 w-5 text-text-primary" />
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="glass-card p-2 hover:bg-red-500/20 transition-colors rounded"
                  title="Delete class"
                >
                  <Trash2 className="h-5 w-5 text-red-400" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {classData.place}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {classData.duration} mins
            </div>
            {classData.price && (
              <div className="flex items-center gap-2 text-rose-gold font-medium">
                <DollarSign className="h-5 w-5" />
                {classData.price}
              </div>
            )}
          </div>

          <p className="text-text-secondary text-sm line-clamp-2">
            {classData.description}
          </p>

          {!isEditMode && !isPastClass && contactInfo && (
            <div className="mt-2 flex flex-col md:flex-row gap-3">
              <Button
                size="sm"
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => {
                  const url = createWhatsAppEnquiryUrl(contactInfo.phone, {
                    name: classData.name,
                    place: classData.place,
                    dateTime: classData.date_time,
                    isRecurring: classData.is_recurring,
                  });
                  window.open(url, "_blank");
                }}
              >
                Enquire
              </Button>
              <Button
                size="sm"
                className="w-full md:w-auto"
                onClick={() => {
                  const url = createWhatsAppBookingUrl(contactInfo.phone, {
                    name: classData.name,
                    place: classData.place,
                    dateTime: classData.date_time,
                    isRecurring: classData.is_recurring,
                  });
                  window.open(url, "_blank");
                }}
              >
                Book
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

