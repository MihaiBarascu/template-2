'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, viewportSettings } from '@/utilities/animations'

interface SimpleHour {
  days?: string | null
  hours?: string | null
}

interface SimpleScheduleProps {
  title: string
  hours: SimpleHour[]
  style?: 'default' | 'compact' | 'card' | null
  spacingClass?: string
}

export const SimpleSchedule: React.FC<SimpleScheduleProps> = ({
  title,
  hours,
  style = 'default',
  spacingClass = '',
}) => {
  // Card style
  if (style === 'card') {
    return (
      <motion.div
        className={`bg-white rounded-lg shadow-lg p-6 ${spacingClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
      >
        <h3 className="text-xl font-bold text-theme-dark mb-4">{title}</h3>
        <div className="space-y-2">
          {hours.map((item, index) => (
            <div key={index} className="flex justify-between text-[15px]">
              <span className="font-medium text-theme-dark">{item.days}</span>
              <span className="text-theme-text">{item.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Compact style (for sidebar)
  if (style === 'compact') {
    return (
      <motion.div
        className={`${spacingClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
      >
        <h4 className="text-lg font-bold text-theme-dark mb-3">{title}</h4>
        <div className="space-y-1 text-sm">
          {hours.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-theme-text">{item.days}</span>
              <span className="font-medium text-theme-dark">{item.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Default style (like working hours in CTA)
  return (
    <section className={`py-12 ${spacingClass}`}>
      <div className="container">
        <motion.div
          className="max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-theme-dark mb-6 text-center">
            {title}
          </h2>
          <div className="space-y-3">
            {hours.map((item, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeInUp}
                custom={index * 100}
              >
                <span className="font-medium text-theme-dark text-lg">{item.days}</span>
                <span className="text-theme-primary font-bold text-lg">{item.hours}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
