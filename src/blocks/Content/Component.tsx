import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { RenderBlocks } from '@/blocks/RenderBlocks'

// Text style utility classes - using !important to override globals.css
const lineHeightClasses: Record<string, string> = {
  none: '[&_*]:!leading-none',      // 1.0
  tight: '[&_*]:!leading-tight',    // 1.25
  snug: '[&_*]:!leading-snug',      // 1.375
  normal: '[&_*]:!leading-normal',  // 1.5
  relaxed: '[&_*]:!leading-relaxed', // 1.625
  loose: '[&_*]:!leading-loose',    // 2.0
}

const fontSizeClasses: Record<string, string> = {
  xs: '[&_p]:text-xs',     // 12px
  sm: '[&_p]:text-sm',     // 14px
  base: '[&_p]:text-base', // 16px
  lg: '[&_p]:text-lg',     // 18px
  xl: '[&_p]:text-xl',     // 20px
  '2xl': '[&_p]:text-2xl', // 24px
}

const letterSpacingClasses: Record<string, string> = {
  tighter: '[&_*]:tracking-tighter',
  tight: '[&_*]:tracking-tight',
  normal: '[&_*]:tracking-normal',
  wide: '[&_*]:tracking-wide',
  wider: '[&_*]:tracking-wider',
}

const paragraphSpacingClasses: Record<string, string> = {
  none: '[&_p]:!mb-0',
  sm: '[&_p]:!mb-2',
  normal: '[&_p]:!mb-4',
  lg: '[&_p]:!mb-6',
  xl: '[&_p]:!mb-8',
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor = 'white' } = props

  // Use full class names - Tailwind can't detect dynamic classes like `lg:col-span-${number}`
  const colsSpanClasses: Record<string, string> = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#f9f9f9]',
    dark: 'bg-theme-dark',
  }

  const isDark = backgroundColor === 'dark'
  const isLight = backgroundColor === 'light'
  const bgClass = bgClasses[backgroundColor || 'white'] || bgClasses.white

  return (
    <section className={cn('py-12 lg:py-20', bgClass)}>
      <div className="container">
        <div
          className={cn('grid grid-cols-4 lg:grid-cols-12 gap-y-6 gap-x-12 items-start', {
            'text-white [&_h2]:text-white [&_h3]:text-white [&_p]:text-white/85': isDark,
            '[&_h2]:text-[36px] [&_h2]:mb-4 [&_p]:text-[18px] [&_p]:leading-relaxed': isLight,
          })}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, blocks, size, textStyle } = col

              // Get text style classes from settings
              const lineHeight = textStyle?.lineHeight || 'normal'
              const fontSize = textStyle?.fontSize || 'base'
              const letterSpacing = textStyle?.letterSpacing || 'normal'
              const paragraphSpacing = textStyle?.paragraphSpacing || 'normal'

              const textStyleClasses = cn(
                lineHeightClasses[lineHeight],
                fontSizeClasses[fontSize],
                letterSpacingClasses[letterSpacing],
                paragraphSpacingClasses[paragraphSpacing],
              )

              return (
                <div
                  className={cn('col-span-4', colsSpanClasses[size!], {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {richText && (
                    <div className={textStyleClasses}>
                      <RichText data={richText} enableGutter={false} enableProse={false} />
                    </div>
                  )}

                  {blocks && blocks.length > 0 && (
                    <div className="[&>*:first-child]:mt-0">
                      <RenderBlocks blocks={blocks} nested />
                    </div>
                  )}

                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
