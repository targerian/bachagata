import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/common/animations";
import {
  AdminEditToggle,
  Button,
  ClassCard,
  ConfirmDialog,
  OverallRating,
  TestimonialCard,
  TestimonialSkeleton,
} from "@/common/components";
import { useAuth } from "@/hooks/useAuth";
import { supabase, type Testimonial } from "@/lib/supabase";
import { AddTestimonialModal, TestimonialAdminControls } from "./components";

const DISPLAYED_TESTIMONIALS_LIMIT = 8; // Max testimonials to show on page

export const HomeScreen: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [totalRatingCount, setTotalRatingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingTestimonial, setDeletingTestimonial] =
    useState<Testimonial | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      if (isEditMode) {
        // In edit mode: show all testimonials
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } else {
        // For public view: calculate overall rating from ALL testimonials (approved + pending)
        const { data: allForRating, error: ratingError } = await supabase
          .from("testimonials")
          .select("rating");

        if (ratingError) throw ratingError;

        const ratingsData = allForRating || [];
        setTotalRatingCount(ratingsData.length);

        if (ratingsData.length > 0) {
          const avg =
            ratingsData.reduce((sum, t) => sum + t.rating, 0) /
            ratingsData.length;
          setOverallRating(avg);
        }

        // Fetch limited testimonials to display (approved, 4+ stars, max 8)
        const { data: displayData, error: displayError } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_approved", true)
          .gte("rating", 4)
          .order("created_at", { ascending: false })
          .limit(DISPLAYED_TESTIMONIALS_LIMIT);

        if (displayError) throw displayError;
        setTestimonials(displayData || []);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  }, [isEditMode]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: true })
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (err) {
      console.error("Error approving testimonial:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: false })
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (err) {
      console.error("Error rejecting testimonial:", err);
    }
  };

  const handleDelete = async () => {
    if (!deletingTestimonial) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", deletingTestimonial.id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    } finally {
      setDeletingTestimonial(null);
    }
  };

  const classes = [
    {
      icon: (
        <svg
          className="h-10 w-10 text-rose-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Bachata",
      description:
        "Dive into the heart of Dominican rhythm. Learn fundamental steps, sensual body movement, and intricate partner work.",
    },
    {
      icon: (
        <svg
          className="h-10 w-10 text-rose-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      title: "Salsa",
      description:
        "Experience the energy and fire of Salsa. Master the timing, spins, and stylish footwork of this vibrant Latin dance.",
    },
    {
      icon: (
        <svg
          className="h-10 w-10 text-rose-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
        </svg>
      ),
      title: "Chair Dancing",
      description:
        "Build confidence and express yourself in this empowering solo dance style that combines sensuality with fitness.",
    },
  ];

  // Calculate counts for admin
  const pendingCount = testimonials.filter((t) => !t.is_approved).length;
  const approvedCount = testimonials.filter((t) => t.is_approved).length;

  return (
    <main className="flex flex-col items-center overflow-x-hidden w-full">
      <div className="w-full max-w-6xl px-6 sm:px-10">
        {/* Admin Edit Toggle */}
        {isAdmin && (
          <AdminEditToggle isEditMode={isEditMode} onToggle={setIsEditMode} />
        )}

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={deletingTestimonial !== null}
          onClose={() => setDeletingTestimonial(null)}
          onConfirm={handleDelete}
          title="Delete Testimonial"
          message="Are you sure you want to delete this testimonial? This action cannot be undone."
          confirmText="Delete"
          isDestructive={true}
        />
        {/* Hero Section */}
        <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center py-20 relative overflow-hidden">
          <div
            className="w-full h-full absolute top-0 left-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(92, 0, 31, 1) 0%, rgba(92, 0, 31, 0.6) 50%, rgba(0, 0, 0, 0.2) 100%), url("/images/lucy/hero.webp")',
              backgroundPosition: "center 35%",
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 items-center">
            <FadeIn direction="up" delay={0.2} useInView={false}>
              <h1 className="font-serif text-text-primary text-5xl md:text-7xl lg:text-8xl font-bold">
                Feel the Rhythm, Find Your Passion
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4} useInView={false}>
              <p className="text-text-primary text-base md:text-lg max-w-2xl">
                Transform your dance, one step at a time. Join a community of
                dancers and discover the joy of bachata.
              </p>
            </FadeIn>
            <ScaleIn delay={0.6} useInView={false}>
              <Button size="lg" className="mt-4">
                Book Now
              </Button>
            </ScaleIn>
          </div>
        </section>

        {/* Instructor Introduction Section */}
        <section className="py-24" id="about">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <SlideIn direction="left" delay={0.1} className="w-full md:w-1/3">
              <div className="relative aspect-3/4 rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/lucy/about-looci.webp"
                  alt="Looci - Professional bachata instructor"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SlideIn>
            <SlideIn
              direction="right"
              delay={0.3}
              className="flex flex-col gap-4 w-full md:w-2/3"
            >
              <h2 className="text-text-primary text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] font-serif">
                Meet Your Instructor
              </h2>
              <p className="text-rose-gold text-lg font-semibold">
                Looci's Bio
              </p>
              <p className="text-text-secondary text-base font-normal leading-relaxed">
                With over a decade of experience, I am dedicated to sharing the
                joy and connection of bachata. My teaching philosophy focuses on
                building a strong foundation, fostering musicality, and creating
                a supportive, fun atmosphere for all students, from absolute
                beginners to advanced dancers. Let's dance together and create
                unforgettable memories on the dance floor.
              </p>
            </SlideIn>
          </div>
        </section>

        {/* Class Offerings Section */}
        <section className="py-24" id="classes">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-text-primary text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] font-serif">
                Class Offerings
              </h2>
              <p className="text-text-secondary mt-2 max-w-xl mx-auto">
                Explore the variety of classes designed to ignite your passion
                for dance.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {classes.map((classItem) => (
              <StaggerItem key={classItem.title} className="h-full">
                <ClassCard
                  icon={classItem.icon}
                  title={classItem.title}
                  description={classItem.description}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Testimonials Section */}
        <section className="py-24" id="testimonials">
          {/* Add Testimonial Modal */}
          <AddTestimonialModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={fetchTestimonials}
          />

          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-text-primary text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] font-serif">
                What My Students Say
              </h2>
              {isEditMode && (
                <p className="text-text-secondary text-sm mt-2">
                  {pendingCount} pending · {approvedCount} approved
                </p>
              )}
            </div>
          </FadeIn>

          {/* Overall Rating - only show in non-edit mode */}
          {!isEditMode && totalRatingCount > 0 && (
            <FadeIn delay={0.2}>
              <OverallRating
                averageRating={overallRating}
                totalReviews={totalRatingCount}
                className="mb-12"
              />
            </FadeIn>
          )}

          {/* Testimonials Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <TestimonialSkeleton key={`skeleton-${i}-${Math.random()}`} />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <FadeIn>
              <div className="flex flex-col items-center justify-center gap-6 py-12">
                <p className="text-text-secondary text-center max-w-md">
                  Be the first to share your experience! Your feedback helps
                  others discover the joy of dance.
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} size="lg">
                  Share Your Experience
                </Button>
              </div>
            </FadeIn>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {testimonials.map((testimonial, index) => (
                  <FadeIn
                    key={testimonial.id}
                    delay={index * 0.1}
                    useInView={false}
                  >
                    <div className="relative h-full">
                      {/* Admin Controls */}
                      {isAdmin && isEditMode && (
                        <TestimonialAdminControls
                          testimonial={testimonial}
                          onApprove={() => handleApprove(testimonial.id)}
                          onReject={() => handleReject(testimonial.id)}
                          onDelete={() => setDeletingTestimonial(testimonial)}
                        />
                      )}

                      {/* Status Badge in Edit Mode */}
                      {isEditMode && (
                        <div className="absolute top-2 left-2 z-10">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              testimonial.is_approved
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {testimonial.is_approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                      )}

                      <TestimonialCard
                        rating={testimonial.rating}
                        quote={testimonial.testimonial}
                        author={testimonial.name}
                        className="h-full"
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Add Testimonial Button */}
              <FadeIn delay={0.6}>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    size="lg"
                    variant="outline"
                  >
                    Share Your Experience
                  </Button>
                </div>
              </FadeIn>
            </>
          )}
        </section>
      </div>
    </main>
  );
};
