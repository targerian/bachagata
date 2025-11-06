import React from "react";
import { InlineWidget } from "react-calendly";
import { FadeIn } from "@/common/animations";
import { GlassCard } from "@/common/components";
import { CheckCircle2 } from "lucide-react";

export const PrivateClassesTab: React.FC = () => {
  const benefits = [
    {
      title: "One-on-One Personalized Attention",
      description:
        "Get focused instruction tailored specifically to your needs and goals",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Choose times that work best for your lifestyle and availability",
    },
    {
      title: "Custom Choreography",
      description:
        "Learn routines and techniques designed around your skill level and interests",
    },
    {
      title: "Progress at Your Own Pace",
      description:
        "No pressure to keep up with a group - move forward when you're ready",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Benefits Section */}
      <FadeIn direction="up" delay={0} useInView={false}>
        <GlassCard className="p-6 md:p-8">
          <h2 className="text-text-primary text-2xl md:text-3xl font-serif mb-4">
            Why Choose Private Classes?
          </h2>
          <p className="text-text-secondary text-base md:text-lg mb-6 leading-relaxed">
            Experience personalized dance instruction with Looci in a private
            setting designed just for you. Whether you're a beginner looking to
            build confidence or an experienced dancer seeking to refine your
            technique, private classes offer the perfect environment for growth.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <FadeIn
                key={benefit.title}
                direction="up"
                delay={index * 0.05}
                useInView={false}
              >
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-6 w-6 text-rose-gold flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-text-primary font-semibold text-base md:text-lg">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Calendly Booking Section */}
      <FadeIn direction="up" delay={0.2} threshold={0.1}>
        <GlassCard noPadding>
          <div className="p-4 md:p-6 border-b border-white/10">
            <h2 className="text-text-primary text-xl md:text-2xl font-serif">
              Book Your Private Session
            </h2>
            <p className="text-text-secondary text-sm md:text-base mt-2">
              Select a time that works best for you
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="w-full h-[1000px] md:h-[1100px]">
            <InlineWidget
              url="https://calendly.com/bachagata/1hourprivate"
              styles={{
                height: "1000px",
                width: "100%",
              }}
              pageSettings={{
                backgroundColor: "transparent",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "b76e79",
                textColor: "f5f5dc",
              }}
            />
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
};

