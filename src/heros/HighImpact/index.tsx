'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { fadeInUp, animationDelays } from '@/utilities/animations'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-20 flex items-center justify-center text-white min-h-screen"
      data-theme="dark"
    >
      {/* transilvania Background Overlay */}
      <div className="theme-bg-overlay"></div>

      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] text-center">
          {richText && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={animationDelays.fast}
            >
              <RichText
                className="mb-6 [&_h4]:text-xl [&_h4]:text-gray-400 [&_h4]:font-light [&_h4]:mb-6 [&_h4]:normal-case [&_h1]:text-white [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:mb-8 [&_h1]:leading-tight"
                data={richText}
                enableGutter={false}
              />
            </motion.div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-0.5 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <motion.li
                    key={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    custom={animationDelays.medium + (i * 100)}
                  >
                    <CMSLink
                      {...link}
                      className={`custom-btn ${i === 0 ? '' : 'bordered'} mt-3`}
                    />
                  </motion.li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
