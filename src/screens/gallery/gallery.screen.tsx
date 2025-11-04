import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { FadeIn } from "@/common/animations";
import {
  AdminEditToggle,
  Button,
  ConfirmDialog,
  FilterChip,
  GallerySkeleton,
  ImageGalleryItem,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/common/components";
import { useAuth } from "@/hooks/useAuth";
import { type GalleryImage, supabase } from "@/lib/supabase";
import { AdminControls, ImageEditModal, ImageUploadModal } from "./components";

type FilterType = "All" | "Performances" | "Workshops" | "Socials";

const ITEMS_PER_PAGE = 12;

export const GalleryScreen: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [isEditMode, setIsEditMode] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filters: FilterType[] = ["All", "Performances", "Workshops", "Socials"];

  const fetchImages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("upload_date", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDeleteImage = async () => {
    if (!deletingImage) return;

    try {
      // Extract file name from URL
      const fileName = deletingImage.image_url.split("/").pop();

      // Delete from storage
      if (fileName) {
        await supabase.storage.from("gallery-images").remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", deletingImage.id);

      if (error) throw error;

      // Refresh images
      await fetchImages();
    } catch (err) {
      console.error("Error deleting image:", err);
    } finally {
      setDeletingImage(null);
    }
  };

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only want to reset on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <main className="w-full flex-1 px-4 py-8 sm:px-6 md:py-16 max-w-6xl mx-auto">
      {/* Admin Edit Toggle */}
      {isAdmin && (
        <AdminEditToggle isEditMode={isEditMode} onToggle={setIsEditMode} />
      )}

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={fetchImages}
      />

      {/* Edit Modal */}
      {editingImage && (
        <ImageEditModal
          isOpen={true}
          onClose={() => setEditingImage(null)}
          onSuccess={fetchImages}
          image={editingImage}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingImage !== null}
        onClose={() => setDeletingImage(null)}
        onConfirm={handleDeleteImage}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />

      {/* Hero Section */}
      <section className="mb-12 md:mb-20">
        <div
          className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-4 text-center md:gap-8"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/lucy/hero.webp")',
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
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter, index) => (
            <FadeIn key={filter} delay={index * 0.05} useInView={false}>
              <FilterChip
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterChip>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Add Image Button (Admin Only) */}
      {isAdmin && isEditMode && (
        <section className="mb-8 px-4">
          <FadeIn delay={0.2} useInView={false}>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              size="md"
              className="flex items-center justify-center gap-2 w-full"
            >
              Add Image
            </Button>
          </FadeIn>
        </section>
      )}

      {/* Image Grid */}
      <section className="mb-12 md:mb-20">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <GallerySkeleton key={`gallery-skeleton-${i}-${Math.random()}`} />
            ))}
          </div>
        ) : paginatedImages.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <p className="text-text-secondary text-lg">No images found</p>
            {isAdmin && isEditMode && (
              <Button onClick={() => setIsUploadModalOpen(true)} size="md">
                Upload First Image
              </Button>
            )}
          </div>
        ) : (
          <div
            key={`gallery-${currentPage}-${activeFilter}`}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {paginatedImages.map((image, index) => (
              <FadeIn
                key={image.id}
                delay={index * 0.05}
                useInView={false}
                className={
                  index === 0
                    ? "col-span-1 row-span-2 h-full"
                    : index === 4
                      ? "col-span-2 md:col-span-1"
                      : ""
                }
              >
                <div className={index === 0 ? "relative h-full" : "relative"}>
                  {isAdmin && isEditMode && (
                    <AdminControls
                      image={image}
                      onEdit={() => setEditingImage(image)}
                      onDelete={() => setDeletingImage(image)}
                    />
                  )}
                  <ImageGalleryItem
                    src={image.image_url}
                    alt={image.title}
                    aspectRatio="portrait"
                    fillHeight={index === 0}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <FadeIn>
          <Pagination className="p-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page) => (
                <PaginationItem key={`page-${page}-${Math.random()}`}>
                  {typeof page === "number" ? (
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </FadeIn>
      )}
    </main>
  );
};
