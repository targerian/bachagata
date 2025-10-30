import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import {
  FadeIn,
  STAGGER_DELAY,
  StaggerContainer,
  StaggerItem,
} from "@/common/animations";
import {
  AdminEditToggle,
  Button,
  ConfirmDialog,
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
import { useAuth } from "@/hooks/useAuth";
import { type GalleryImage, supabase } from "@/lib/supabase";
import { AdminControls, ImageEditModal, ImageUploadModal } from "./components";

type FilterType = "All" | "Performances" | "Workshops" | "Socials";

export const GalleryScreen: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [isEditMode, setIsEditMode] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);

  const filters: FilterType[] = ["All", "Performances", "Workshops", "Socials"];

  const fetchImages = async () => {
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
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
      <section className="mb-8 flex justify-center items-center gap-4">
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

        {/* Add Image Button (Admin Only) */}
        {isAdmin && isEditMode && (
          <FadeIn delay={0.2} useInView={false}>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              size="md"
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Image
            </Button>
          </FadeIn>
        )}
      </section>

      {/* Image Grid */}
      <section className="mb-12 md:mb-20">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-text-secondary">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <p className="text-text-secondary text-lg">No images found</p>
            {isAdmin && isEditMode && (
              <Button onClick={() => setIsUploadModalOpen(true)} size="md">
                Upload First Image
              </Button>
            )}
          </div>
        ) : (
          <StaggerContainer
            staggerDelay={STAGGER_DELAY.fast}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <StaggerItem
                  key={`${image.id}-${activeFilter}`}
                  className={
                    index === 0
                      ? "col-span-1 row-span-2"
                      : index === 4
                        ? "col-span-2 md:col-span-1"
                        : ""
                  }
                >
                  <div className="relative">
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
                    />
                  </div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        )}
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
