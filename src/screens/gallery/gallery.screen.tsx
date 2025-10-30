import { AnimatePresence } from "framer-motion";
import type React from "react";
import { useState } from "react";
import {
  FadeIn,
  STAGGER_DELAY,
  StaggerContainer,
  StaggerItem,
} from "@/common/animations";
import {
  FilterChip,
  ImageGalleryItem,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/common/components";

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
        <Pagination className="p-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </FadeIn>
    </main>
  );
};
