'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, viewportSettings, getStaggerDelay } from '@/utilities/animations'

interface AnimatedColumnProps {
  children: React.ReactNode
  index: number
  className?: string
}

export const AnimatedColumn: React.FC<AnimatedColumnProps> = ({
  children,
  index,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeInUp}
      custom={getStaggerDelay(index, 150)}
    >
      {children}
    </motion.div>
  )
}
