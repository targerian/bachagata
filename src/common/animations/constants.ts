export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
};

export const STAGGER_DELAY = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
};

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  spring: { type: "spring" as const, stiffness: 100, damping: 15 },
};

// Check if user prefers reduced motion
export const shouldReduceMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

