'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setHeaderTheme('dark')
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [setHeaderTheme])

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
            <div
              className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <RichText
                className="mb-6 [&_h4]:text-xl [&_h4]:text-gray-400 [&_h4]:font-light [&_h4]:mb-6 [&_h4]:normal-case [&_h1]:text-white [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:mb-8 [&_h1]:leading-tight"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-0.5 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li
                    key={i}
                    className={cn(
                      'transition-all duration-500 ease-out',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                    )}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <CMSLink
                      {...link}
                      className={`custom-btn ${i === 0 ? '' : 'bordered'} mt-3`}
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
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
