'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const PageHero: React.FC<Page['hero']> = ({ media, richText }) => {
  const hasImage = media && typeof media === 'object'

  return (
    <div
      className={cn(
        'relative flex items-center justify-center py-20 md:py-32 overflow-hidden',
        !hasImage && 'bg-gradient-to-b from-theme-dark to-black',
      )}
    >
      {/* Background Image (doar dacă există) */}
      {hasImage && (
        <>
          <div className="absolute inset-0">
            <Media
              fill
              imgClassName="object-cover"
              priority
              resource={media}
            />
          </div>
          {/* Overlay - doar peste imagine */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/85" />
        </>
      )}

      {/* Content */}
      <div className="container relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {richText && (
            <RichText
              className={cn(
                'animate-fade-in-up',
                // Subtitle styling (h4)
                '[&_h4]:text-gray-300 [&_h4]:text-sm [&_h4]:md:text-base',
                '[&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:mb-3 [&_h4]:font-normal',
                // Title styling (h1)
                '[&_h1]:text-white [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:xl:text-6xl',
                '[&_h1]:font-bold [&_h1]:mb-4 [&_h1]:drop-shadow-lg',
                // Description styling (p)
                '[&_p]:text-gray-300 [&_p]:text-base [&_p]:md:text-lg [&_p]:lg:text-xl',
                '[&_p]:max-w-2xl [&_p]:mx-auto',
              )}
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
