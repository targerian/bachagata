import { motion } from "framer-motion";
import type React from "react";
import { ANIMATION_DURATION, EASING, shouldReduceMotion } from "./constants";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  useInView?: boolean;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  className,
  useInView = true,
}) => {
  const animationProps = useInView
    ? {
        initial: { opacity: 0, scale: shouldReduceMotion() ? 1 : 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-50px", amount: 0.3 },
      }
    : {
        initial: { opacity: 0, scale: shouldReduceMotion() ? 1 : 0.95 },
        animate: { opacity: 1, scale: 1 },
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

