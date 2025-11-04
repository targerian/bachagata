/**
 * WhatsApp Utility Functions
 * Generates WhatsApp URLs with pre-filled messages for enquiries and bookings
 */

/**
 * Format phone number for WhatsApp URL
 * Removes all non-numeric characters
 */
const formatPhoneForWhatsApp = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Format date for WhatsApp message
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time for WhatsApp message
 */
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

interface ClassDetails {
  name: string;
  place: string;
  dateTime: string;
  isRecurring: boolean;
}

/**
 * Create WhatsApp URL for class enquiry
 * Opens WhatsApp with pre-filled enquiry message
 */
export const createWhatsAppEnquiryUrl = (
  phone: string,
  classDetails: ClassDetails,
): string => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const recurringText = classDetails.isRecurring
    ? "that happens weekly"
    : "that is a one-time class";

  const message = `Hello, I would like to know more info about ${classDetails.name} that is happening at ${classDetails.place} on ${formatDate(classDetails.dateTime)} at ${formatTime(classDetails.dateTime)} ${recurringText}.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Create WhatsApp URL for class booking
 * Opens WhatsApp with pre-filled booking message
 */
export const createWhatsAppBookingUrl = (
  phone: string,
  classDetails: ClassDetails,
): string => {
  const formattedPhone = formatPhoneForWhatsApp(phone);

  const message = `Hello, I want to reserve my spot in ${classDetails.name} on ${formatDate(classDetails.dateTime)} at ${formatTime(classDetails.dateTime)} at ${classDetails.place}.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Create WhatsApp URL for general inquiry
 * Opens WhatsApp with pre-filled general inquiry message
 */
export const createWhatsAppGeneralInquiryUrl = (phone: string): string => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const message = "Hello Looci, I'd like to know more about ";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};
