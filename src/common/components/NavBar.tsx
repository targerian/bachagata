import { AnimatePresence, motion } from "framer-motion";
import { Cat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type React from "react";
import { useState } from "react";
import {
  ANIMATION_DURATION,
  EASING,
  shouldReduceMotion,
} from "@/common/animations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KnowMoreButton } from "./KnowMoreButton";

export const NavBar: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/classes", label: "Classes" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => router.pathname === path;

  const handleAdminClick = () => {
    router.push("/admin/login");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion() ? 0 : ANIMATION_DURATION.normal,
          ease: EASING.easeOut,
        }}
        className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-rose-gold/20 bg-background-dark/50 backdrop-blur-md px-6 py-2 md:px-10"
      >
        <Link href="/" className="flex items-center gap-4 text-text-primary">
          <div className="text-rose-gold relative">
            <Image
              src="/images/logos/logo.png"
              alt="Looci Logo"
              width={100}
              height={50}
              className="object-contain w-[100px]"
            />
          </div>
          {/* <h2 className="text-text-primary text-xl font-bold leading-tight tracking-[-0.015em]">
            Looci
          </h2> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex flex-1 justify-end">
          <div className="flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium leading-normal transition-colors",
                  isActive(link.href)
                    ? "text-rose-gold font-bold"
                    : "text-text-secondary hover:text-rose-gold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Admin Login Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdminClick}
            className="text-text-secondary hover:text-rose-gold"
            title="Admin Login"
          >
            <Cat className="h-5 w-5" />
          </Button>

          <KnowMoreButton size="md" />
        </nav>

        {/* Mobile Menu & Admin Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdminClick}
            className="text-text-secondary hover:text-rose-gold"
            title="Admin Login"
          >
            <Cat className="h-5 w-5" />
          </Button>

          <button
            className="text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu - Outside header to avoid transform context issues */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: shouldReduceMotion() ? 0 : ANIMATION_DURATION.fast,
              ease: EASING.easeOut,
            }}
            className="fixed top-[73px] left-0 right-0 md:hidden z-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(109, 26, 54, 0.98) 0%, rgba(18, 18, 18, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 32px 0 rgba(183, 110, 121, 0.15), inset 0 1px 0 0 rgba(183, 110, 121, 0.1)",
              maxHeight: "calc(100vh - 73px)",
              overflowY: "auto",
            }}
          >
            <div className="border-t border-rose-gold/20" />
            <nav className="flex flex-col p-8 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-lg font-medium leading-normal transition-all duration-300 py-3 px-4 rounded-lg",
                      isActive(link.href)
                        ? "text-text-primary font-bold bg-rose-gold/20 border border-rose-gold/30"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <KnowMoreButton
                  size="lg"
                  className="w-full shadow-lg"
                  onMobileMenuClose={() => setMobileMenuOpen(false)}
                />
              </motion.div>
            </nav>
            <div className="border-b border-rose-gold/10 mb-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
