import { Variants } from 'framer-motion'

// Animation variants matching original Gymso AOS animations
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay / 1000,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

// Viewport settings for scroll-triggered animations
export const viewportSettings = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -100px 0px',
}

// Animation delays matching Gymso template
export const animationDelays = {
  fast: 300,
  medium: 500,
  slow: 700,
  xslow: 900,
}

// Helper function to get delay based on index
export const getStaggerDelay = (index: number, baseDelay: number = 300): number => {
  return baseDelay + index * 100
}