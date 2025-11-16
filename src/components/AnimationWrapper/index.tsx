'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { fadeInUp, fadeIn, scaleIn, viewportSettings } from '@/utilities/animations'

interface AnimationWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn'
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  delay = 0,
  className = '',
  animation = 'fadeInUp',
}) => {
  const animations: Record<string, Variants> = {
    fadeInUp,
    fadeIn,
    scaleIn,
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={animations[animation]}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper