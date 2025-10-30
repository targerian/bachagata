import { motion } from "framer-motion";
import type React from "react";
import { ANIMATION_DURATION, EASING, shouldReduceMotion } from "./constants";

interface SlideInProps {
  children: React.ReactNode;
  direction: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  useInView?: boolean;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction,
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  className,
  useInView = true,
}) => {
  const getDirectionOffset = () => {
    if (shouldReduceMotion()) return { x: 0, y: 0 };

    switch (direction) {
      case "left":
        return { x: -60, y: 0 };
      case "right":
        return { x: 60, y: 0 };
      case "up":
        return { x: 0, y: 60 };
      case "down":
        return { x: 0, y: -60 };
    }
  };

  const offset = getDirectionOffset();

  const animationProps = useInView
    ? {
        initial: { opacity: 0, ...offset },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "-50px", amount: 0.3 },
      }
    : {
        initial: { opacity: 0, ...offset },
        animate: { opacity: 1, x: 0, y: 0 },
      };

  return (
    <motion.div
      {...animationProps}
      transition={{
        duration: shouldReduceMotion() ? 0 : duration,
        delay: shouldReduceMotion() ? 0 : delay,
        ease: EASING.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

