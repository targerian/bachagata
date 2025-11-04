import type React from "react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, Button, Input } from "@/common/components";
import { supabase, type ContactInfo } from "@/lib/supabase";

export interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo;
}

export const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  onClose,
  contactInfo,
}) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState(contactInfo.email);
  const [phone, setPhone] = useState(contactInfo.phone);
  const [address, setAddress] = useState(contactInfo.address);
  const [instagramUrl, setInstagramUrl] = useState(
    contactInfo.instagram_url || "",
  );
  const [twitterUrl, setTwitterUrl] = useState(contactInfo.twitter_url || "");
  const [facebookUrl, setFacebookUrl] = useState(
    contactInfo.facebook_url || "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("contact_info")
        .update({
          email,
          phone,
          address,
          instagram_url: instagramUrl,
          twitter_url: twitterUrl,
          facebook_url: facebookUrl,
        })
        .eq("id", contactInfo.id);

      if (updateError) throw updateError;

      // Invalidate and refetch contact info
      queryClient.invalidateQueries({ queryKey: ["contactInfo"] });
      onClose();
    } catch (err) {
      console.error("Error updating contact info:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update contact info",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Contact Information">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="looci@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (234) 567-890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Input
          label="Studio Address"
          placeholder="123 Dance Avenue, New York, NY"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <Input
          label="Instagram URL"
          type="url"
          placeholder="https://instagram.com/username"
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
        />

        <Input
          label="Twitter/X URL"
          type="url"
          placeholder="https://twitter.com/username"
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
        />

        <Input
          label="Facebook URL"
          type="url"
          placeholder="https://facebook.com/username"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
        />

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

