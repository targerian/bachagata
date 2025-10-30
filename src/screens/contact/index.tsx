import type React from "react";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/common/animations";
import {
  Button,
  GlassCard,
  IconText,
  Input,
  Textarea,
} from "@/common/components";

export const ContactScreen: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log("Form submitted");
  };

  const contactInfo = [
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
      value: "looci@email.com",
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
      value: "+1 (234) 567-890",
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
      value: "123 Dance Avenue, New York, NY",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.178-1.336.23-2.04.188.608 1.923 2.366 3.235 4.453 3.272-1.763 1.37-3.973 2.163-6.357 2.163-.414 0-.82-.024-1.22-.074 2.279 1.455 4.981 2.3 7.875 2.3 9.421 0 14.58-7.822 14.53-14.583v-.651c1.001-.72 1.868-1.616 2.557-2.65z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex flex-col gap-16 md:gap-24 py-16 md:py-24 px-4 md:px-10 lg:px-30 max-w-[1200px] mx-auto">
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
          <StaggerContainer className="flex flex-col gap-8">
            {contactInfo.map((info) => (
              <StaggerItem key={info.label}>
                <IconText
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                />
              </StaggerItem>
            ))}
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
          </StaggerContainer>
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
