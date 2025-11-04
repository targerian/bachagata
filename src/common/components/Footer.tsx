import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/common/animations";
import { useContactInfo } from "@/hooks/useContactInfo";

export const Footer: React.FC = () => {
  const { data: contactInfo } = useContactInfo();

  // Build social links from database
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

  return (
    <FadeIn>
      <footer className="w-full border-t border-rose-gold/20 bg-background-dark/50 mt-24">
        <div className="max-w-6xl mx-auto py-10 px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-text-secondary">
              © 2024 Looci. All Rights Reserved.
            </p>
            <StaggerContainer className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <StaggerItem key={social.name}>
                  <Link
                    href={social.href}
                    className="text-text-secondary hover:text-rose-gold transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          {contactInfo && (
            <div className="flex justify-center gap-6 mt-6 text-center">
              <p className="text-sm text-text-secondary">
                {contactInfo.email} | {contactInfo.phone}
              </p>
            </div>
          )}
        </div>
      </footer>
    </FadeIn>
  );
};
