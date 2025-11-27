import { Variants } from 'framer-motion'

// ============================================
// FRAMER MOTION ANIMATIONS - Clean & Modern
// Simple, smooth, no glitches
// ============================================

// Smooth ease curve (Apple-style)
const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

// Fade in from bottom (primary)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Fade in from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Simple fade
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: delay / 1000,
      ease: 'easeOut',
    },
  }),
}

// Scale in
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Scale with subtle bounce
export const scaleInBounce: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: delay / 1000,
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  }),
}

// Slide up
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

// Card hover
export const cardHover: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -6,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
}

// Image zoom on hover
export const imageZoom: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
}

// Button hover
export const buttonHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
  },
}

// Text reveal
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

// Line grow
export const lineGrow: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: {
      duration: 0.6,
      delay: delay / 1000,
      ease: smoothEase,
    },
  }),
}

// ============================================
// VIEWPORT SETTINGS
// once: true = animations play once (smooth, no glitches)
// ============================================

export const viewportSettings = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -80px 0px',
}

export const viewportSettingsLarge = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -100px 0px',
}

export const viewportSettingsOnce = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -80px 0px',
}

// ============================================
// DELAYS & HELPERS
// ============================================

export const animationDelays = {
  none: 0,
  fast: 100,
  medium: 200,
  slow: 350,
  xslow: 500,
}

export const getStaggerDelay = (index: number, baseDelay: number = 80): number => {
  return index * baseDelay
}

export const getCardDelay = (index: number): number => {
  return animationDelays.fast + index * 80
}
