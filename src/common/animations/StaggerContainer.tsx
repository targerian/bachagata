import { motion } from "framer-motion";
import type React from "react";
import { STAGGER_DELAY, shouldReduceMotion } from "./constants";

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  useInView?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = STAGGER_DELAY.normal,
  className,
  useInView = true,
}) => {
  const animationProps = useInView
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-50px", amount: 0.3 },
      }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <motion.div
      {...animationProps}
      variants={{
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion() ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

