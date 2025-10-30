import { motion } from "framer-motion";
import type React from "react";
import { ANIMATION_DURATION, EASING, shouldReduceMotion } from "./constants";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion() ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion() ? 0 : ANIMATION_DURATION.normal,
            ease: EASING.easeOut,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

