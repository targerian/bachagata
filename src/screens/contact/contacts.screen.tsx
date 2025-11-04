import type React from "react";
import { useState } from "react";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { FadeIn, SlideIn } from "@/common/animations";
import {
  AdminEditToggle,
  Button,
  GlassCard,
  IconText,
  Input,
  Textarea,
} from "@/common/components";
import { useAuth } from "@/hooks/useAuth";
import { useContactInfo } from "@/hooks/useContactInfo";
import { EditContactModal } from "./components";

export const ContactScreen: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: contactInfo, isLoading: loading } = useContactInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log("Form submitted");
  };

  const contactInfoItems = contactInfo
    ? [
        {
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ),
          label: "Email",
          value: contactInfo.email,
        },
        {
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          ),
          label: "Phone",
          value: contactInfo.phone,
        },
        {
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ),
          label: "Studio Location",
          value: contactInfo.address,
        },
      ]
    : [];

  const socialLinks = contactInfo
    ? [
        ...(contactInfo.instagram_url && contactInfo.instagram_url !== "#"
          ? [
              {
                name: "Instagram",
                href: contactInfo.instagram_url,
                icon: <Instagram className="h-6 w-6" />,
              },
            ]
          : []),
        ...(contactInfo.twitter_url && contactInfo.twitter_url !== "#"
          ? [
              {
                name: "Twitter",
                href: contactInfo.twitter_url,
                icon: <Twitter className="h-6 w-6" />,
              },
            ]
          : []),
        ...(contactInfo.facebook_url && contactInfo.facebook_url !== "#"
          ? [
              {
                name: "Facebook",
                href: contactInfo.facebook_url,
                icon: <Facebook className="h-6 w-6" />,
              },
            ]
          : []),
      ]
    : [];

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-[600px]">
        <p className="text-text-secondary">Loading contact information...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-16 md:gap-24 py-16 md:py-24 px-4 md:px-10 lg:px-30 max-w-[1200px] mx-auto">
      {/* Admin Edit Toggle */}
      {isAdmin && (
        <AdminEditToggle isEditMode={isEditMode} onToggle={setIsEditMode} />
      )}

      {/* Edit Modal */}
      {contactInfo && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contactInfo={contactInfo}
        />
      )}

      {/* Page Heading */}
      <div className="flex flex-wrap justify-center text-center gap-4 p-4">
        <div className="flex flex-col gap-4 max-w-2xl">
          <FadeIn direction="up" delay={0.1} useInView={false}>
            <h1 className="font-serif text-rose-gold text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Let's Dance
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} useInView={false}>
            <p className="text-text-secondary text-base md:text-lg font-normal leading-normal">
              Reach out for private lessons, event bookings, or any other
              inquiries. I'd love to hear from you.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        {/* Contact Info */}
        <SlideIn direction="left" delay={0.2} useInView={false}>
          <div className="flex flex-col gap-4">
            {isAdmin && isEditMode && (
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  Edit Contact Info
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-8">
              {contactInfoItems.map((info, index) => (
                <FadeIn key={info.label} delay={index * 0.1} useInView={false}>
                  <IconText
                    icon={info.icon}
                    label={info.label}
                    value={info.value}
                  />
                </FadeIn>
              ))}
              {socialLinks.length > 0 && (
                <FadeIn delay={0.5} useInView={false}>
                  <div className="flex items-center gap-4 pt-4 border-t border-border-color">
                    <p className="text-text-secondary text-sm font-medium">
                      Follow Me:
                    </p>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          className="text-text-primary hover:text-rose-gold transition-colors"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </SlideIn>

        {/* Contact Form */}
        <SlideIn direction="right" delay={0.4} useInView={false}>
          <GlassCard className="p-8">
            <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
              Send an Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <Input
                  label="Name"
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <Input
                label="Subject"
                placeholder="e.g., Private Lessons Inquiry"
                required
              />
              <Textarea
                label="Message"
                placeholder="Tell me more about what you're looking for..."
                required
              />
              <Button type="submit" size="lg" className="w-full mt-2">
                Send Message
              </Button>
            </form>
          </GlassCard>
        </SlideIn>
      </div>
    </main>
  );
};
