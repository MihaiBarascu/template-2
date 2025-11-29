import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export interface StaticPageHeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string | null
  imageAlt?: string
}

export const StaticPageHero: React.FC<StaticPageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  imageAlt,
}) => {
  const hasImage = !!backgroundImage

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
          <Image
            src={backgroundImage}
            alt={imageAlt || title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay - doar peste imagine */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/85" />
        </>
      )}

      {/* Content */}
      <div className="container relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {subtitle && (
            <p className="text-gray-300 text-sm md:text-base uppercase tracking-wider mb-3 animate-fade-in-up">
              {subtitle}
            </p>
          )}
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: '100ms' }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
