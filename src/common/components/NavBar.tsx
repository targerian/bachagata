import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

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

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-rose-gold/20 bg-background-dark/50 backdrop-blur-md px-6 py-4 md:px-10">
      <Link href="/" className="flex items-center gap-4 text-text-primary">
        <div className="w-8 h-8 text-rose-gold relative">
          <Image
            src="/images/logos/Bachagata_20251028_103342_0000.png"
            alt="Looci Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <h2 className="text-text-primary text-xl font-bold leading-tight tracking-[-0.015em]">
          Looci
        </h2>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 md:flex flex-1 justify-end">
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
        <Button size="md">Book Now</Button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-text-primary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background-dark/95 backdrop-blur-md border-b border-rose-gold/20 md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium leading-normal transition-colors py-2",
                  isActive(link.href)
                    ? "text-rose-gold font-bold"
                    : "text-text-secondary hover:text-rose-gold",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button size="md" className="mt-2">
              Book Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
