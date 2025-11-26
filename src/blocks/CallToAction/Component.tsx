'use client'
import React from 'react'
import { motion } from 'framer-motion'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { fadeInUp, animationDelays, viewportSettings } from '@/utilities/animations'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  style,
  workingHours,
}) => {
  if (style === 'theme-feature') {
    return (
      <section className="theme-section bg-theme-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Membership Info */}
            <motion.div
              className="flex flex-col justify-center lg:pr-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeInUp}
              custom={0}
            >
              {richText && (
                <RichText
                  className="mb-0 [&_h2]:text-theme-light [&_h2]:mb-3 [&_h6]:text-theme-light [&_h6]:mb-4 [&_p]:text-theme-text"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    className="theme-btn theme-btn-primary mt-6 inline-block w-fit"
                  />
                )
              })}
            </motion.div>

            {/* Right Column - Working Hours */}
            <motion.div
              className="lg:pl-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeInUp}
              custom={animationDelays.fast}
            >
              <div className="border-l-2 border-theme-primary pl-14">
                {workingHours && (
                  <RichText
                    className="mb-0 [&_h2]:text-theme-light [&_h2]:mb-4 [&_strong]:text-theme-light [&_strong]:block [&_strong]:mt-3 [&_p]:text-theme-text [&_p]:mb-0"
                    data={workingHours}
                    enableGutter={false}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // Default CTA styling
  return (
    <div className="container">
      <motion.div
        className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
      >
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </motion.div>
    </div>
  )
}
