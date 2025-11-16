'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

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
      {/* Gymso Background Overlay */}
      <div className="gymso-bg-overlay"></div>

      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText
              className="mb-6 [&_h6]:text-gymso-h6 [&_h6]:text-gymso-gray [&_h6]:font-gymso-normal [&_h6]:mb-4 [&_h1]:text-gymso-white [&_h1]:mb-8"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className={`gymso-btn ${i === 0 ? 'gymso-btn-primary' : 'gymso-btn-bordered'}`}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-20 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
