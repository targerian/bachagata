import type React from "react";
import { useState } from "react";
import { Modal, Button, Input, Rating } from "@/common/components";
import { supabase } from "@/lib/supabase";

export interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("testimonials")
        .insert({
          name,
          rating,
          testimonial,
          is_approved: false,
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        // Reset form
        setName("");
        setRating(5);
        setTestimonial("");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit testimonial. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Your Experience"
    >
      {success ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="rounded-full bg-green-500/20 p-4">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            Thank You!
          </h3>
          <p className="text-center text-text-secondary">
            Your testimonial has been submitted and is pending approval.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-text-secondary text-sm leading-relaxed">
              Have we met or danced together? Been through one of my classes? I'd
              love to hear about your experience! Your feedback helps others
              discover the joy of dance and means the world to me. 💃✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-primary">
                Rating
              </label>
              <Rating
                rating={rating}
                size="lg"
                interactive
                onChange={setRating}
                className="justify-center py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimonial"
                className="text-sm font-medium text-text-primary"
              >
                Your Testimonial
              </label>
              <textarea
                id="testimonial"
                placeholder="Share your experience with us..."
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                required
                rows={5}
                className="w-full rounded-lg bg-background-dark border border-border-color px-4 py-3 text-text-primary placeholder-text-secondary focus:border-rose-gold focus:outline-none focus:ring-2 focus:ring-rose-gold/20 resize-none"
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
                onClick={onClose}
                size="md"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" size="md" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};

