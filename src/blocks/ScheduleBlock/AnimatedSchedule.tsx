'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, fadeInDown, viewportSettings } from '@/utilities/animations'

interface AnimatedScheduleProps {
  children: React.ReactNode
  title: string
}

export const AnimatedSchedule: React.FC<AnimatedScheduleProps> = ({ children, title }) => {
  return (
    <>
      {/* Animated Title */}
      <motion.div
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInDown}
        custom={0}
      >
        <h2 className="text-white text-3xl md:text-4xl font-bold">{title}</h2>
      </motion.div>

      {/* Animated Table Container */}
      <motion.div
        className="overflow-x-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
        custom={200}
      >
        {children}
      </motion.div>
    </>
  )
}
