import React, { useState } from "react";
import { FilterChip, ImageGalleryItem } from "@/common/components";
import { AnimatePresence } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  STAGGER_DELAY,
} from "@/common/animations";

type FilterType = "All" | "Performances" | "Workshops" | "Socials";

export const GalleryScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const images = [
    {
      src: "/images/lucy/DSC07535.JPG",
      alt: "Looci dancing at a performance",
      category: "Performances" as FilterType,
      aspectRatio: "portrait" as const,
    },
    {
      src: "/images/lucy/20251009_180329.jpg",
      alt: "Looci teaching a workshop",
      category: "Workshops" as FilterType,
      aspectRatio: "square" as const,
    },
    {
      src: "/images/lucy/DSC03883.jpg",
      alt: "Looci at a social dance event",
      category: "Socials" as FilterType,
      aspectRatio: "landscape" as const,
    },
    {
      src: "/images/lucy/FB_IMG_1717517803090.jpg",
      alt: "Looci performing bachata",
      category: "Performances" as FilterType,
      aspectRatio: "square" as const,
    },
    {
      src: "/images/lucy/IMG-20241229-WA0001.jpg",
      alt: "Looci with students",
      category: "Workshops" as FilterType,
      aspectRatio: "landscape" as const,
    },
  ];

  const filters: FilterType[] = ["All", "Performances", "Workshops", "Socials"];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <main className="w-full flex-1 px-4 py-8 sm:px-6 md:py-16 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 md:mb-20">
        <div
          className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-4 text-center md:gap-8"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/lucy/DSC07535.JPG")',
          }}
        >
          <div className="flex flex-col gap-2">
            <FadeIn direction="up" delay={0.2} useInView={false}>
              <h1 className="font-serif text-5xl font-black leading-tight tracking-normal text-white md:text-7xl">
                Capturing the Moment
              </h1>
            </FadeIn>
            <FadeIn delay={0.4} useInView={false}>
              <h2 className="text-base font-normal leading-normal text-text-light md:text-lg">
                Explore the passion, connection, and elegance of bachata through
                our gallery.
              </h2>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-8 flex justify-center">
        <StaggerContainer
          staggerDelay={STAGGER_DELAY.fast}
          className="flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter) => (
            <StaggerItem key={filter}>
              <FilterChip
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterChip>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Image Grid */}
      <section className="mb-12 md:mb-20">
        <StaggerContainer
          staggerDelay={STAGGER_DELAY.fast}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <StaggerItem
                key={`${image.src}-${index}-${activeFilter}`}
                className={
                  index === 0
                    ? "col-span-1 row-span-2"
                    : index === 4
                      ? "col-span-2 md:col-span-1"
                      : ""
                }
              >
                <ImageGalleryItem
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={image.aspectRatio}
                />
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </section>

      {/* Pagination */}
      <FadeIn>
        <nav className="flex items-center justify-center p-4">
        <button
          className="flex size-10 items-center justify-center text-text-light/60 hover:text-rose-gold"
          aria-label="Previous page"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="flex size-10 items-center justify-center rounded-full bg-rose-gold text-sm font-bold leading-normal tracking-[0.015em] text-background-dark">
          1
        </button>
        <button className="flex size-10 items-center justify-center rounded-full text-sm font-normal leading-normal text-text-light hover:bg-rose-gold/20">
          2
        </button>
        <button className="flex size-10 items-center justify-center rounded-full text-sm font-normal leading-normal text-text-light hover:bg-rose-gold/20">
          3
        </button>
        <span className="flex size-10 items-center justify-center rounded-full text-sm font-normal leading-normal text-text-light">
          ...
        </span>
        <button
          className="flex size-10 items-center justify-center text-text-light/60 hover:text-rose-gold"
          aria-label="Next page"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
      </FadeIn>
    </main>
  );
};
