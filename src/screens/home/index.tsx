import React from "react";
import Image from "next/image";
import { Button, ClassCard, TestimonialCard } from "@/common/components";

export const HomeScreen: React.FC = () => {
  const classes = [
    {
      icon: (
        <svg
          className="h-10 w-10 text-rose-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
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
        >
          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
        </svg>
      ),
      title: "Chair Dancing",
      description:
        "Build confidence and express yourself in this empowering solo dance style that combines sensuality with fitness.",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      quote:
        "The best dance instructor I've ever had! Looci's passion is contagious, and the classes are so much fun. I've improved more in a few months than I did in years elsewhere.",
      author: "Jessica L.",
    },
    {
      rating: 5,
      quote:
        "A wonderfully patient and clear teacher. Looci breaks down complex moves in a way that's easy to understand. The atmosphere is always supportive and welcoming.",
      author: "Michael B.",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-6xl px-6 sm:px-10">
        {/* Hero Section */}
        <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center py-20 relative">
          <div
            className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(92, 0, 31, 1) 0%, rgba(92, 0, 31, 0.6) 50%, rgba(0, 0, 0, 0.2) 100%), url("/images/lucy/DSC07535.JPG")',
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 items-center">
            <h1 className="font-serif text-text-primary text-5xl md:text-7xl lg:text-8xl font-bold">
              Feel the Rhythm, Find Your Passion
            </h1>
            <p className="text-text-primary text-base md:text-lg max-w-2xl">
              Transform your dance, one step at a time. Join a community of
              dancers and discover the joy of bachata.
            </p>
            <Button size="lg" className="mt-4">
              Book Now
            </Button>
          </div>
        </section>

        {/* Instructor Introduction Section */}
        <section className="py-24" id="about">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/lucy/20251009_180329.jpg"
                  alt="Looci - Professional bachata instructor"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-2/3">
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
            </div>
          </div>
        </section>

        {/* Class Offerings Section */}
        <section className="py-24" id="classes">
          <div className="text-center mb-12">
            <h2 className="text-text-primary text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] font-serif">
              Class Offerings
            </h2>
            <p className="text-text-secondary mt-2 max-w-xl mx-auto">
              Explore the variety of classes designed to ignite your passion for
              dance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <ClassCard
                key={index}
                icon={classItem.icon}
                title={classItem.title}
                description={classItem.description}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24" id="testimonials">
          <div className="text-center mb-12">
            <h2 className="text-text-primary text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] font-serif">
              What My Students Say
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                rating={testimonial.rating}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
