import { motion } from "framer-motion";
import type React from "react";
import { ANIMATION_DURATION, EASING, shouldReduceMotion } from "./constants";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion() ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion() ? 0 : -10 }}
      transition={{
        duration: shouldReduceMotion() ? 0 : ANIMATION_DURATION.fast,
        ease: EASING.easeOut,
      }}
    >
      {children}
    </motion.div>
  );
};

