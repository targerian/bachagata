import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { FadeIn } from "@/common/animations";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContactInfo } from "@/hooks/useContactInfo";

export const Footer: React.FC = () => {
  const { data: contactInfo } = useContactInfo();

  // Build Instagram accounts from database
  const instagramAccounts = contactInfo
    ? [
        ...(contactInfo.instagram_url && contactInfo.instagram_url !== "#"
          ? [
              {
                label: "Personal",
                href: contactInfo.instagram_url,
              },
            ]
          : []),
        ...(contactInfo.instagram_url_2 && contactInfo.instagram_url_2 !== "#"
          ? [
              {
                label: "Bachagata",
                href: contactInfo.instagram_url_2,
              },
            ]
          : []),
      ]
    : [];

  // Build social links from database
  const socialLinks = contactInfo
    ? [
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
              © {new Date().getFullYear()} Looci. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              {/* Instagram Accounts */}
              {instagramAccounts.length > 0 && (
                <div className="flex items-center gap-3">
                  {instagramAccounts.length === 1 ? (
                    <FadeIn delay={0} useInView={false}>
                      <Link
                        href={instagramAccounts[0].href}
                        className="text-text-secondary hover:text-rose-gold transition-colors"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-6 w-6" />
                      </Link>
                    </FadeIn>
                  ) : (
                    instagramAccounts.map((account) => (
                      <FadeIn key={account.href} delay={0.1} useInView={false}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={account.href}
                              className="relative group flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Instagram ${account.label}`}
                            >
                              <Instagram className="h-6 w-6 text-text-secondary group-hover:text-rose-gold transition-colors" />
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 h-4 border-rose-gold/30 text-rose-gold group-hover:bg-rose-gold/10 transition-colors"
                              >
                                {account.label}
                              </Badge>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{account.label} Instagram</p>
                          </TooltipContent>
                        </Tooltip>
                      </FadeIn>
                    ))
                  )}
                </div>
              )}

              {/* Other Social Links */}
              {socialLinks.map((social, index) => (
                <FadeIn
                  key={social.name}
                  delay={(instagramAccounts.length + index) * 0.1}
                  useInView={false}
                >
                  <Link
                    href={social.href}
                    className="text-text-secondary hover:text-rose-gold transition-colors"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </Link>
                </FadeIn>
              ))}
            </div>
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
