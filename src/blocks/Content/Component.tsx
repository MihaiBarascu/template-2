import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, backgroundColor = 'white' } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#f9f9f9]',
    dark: 'bg-transilvania-dark',
  }

  const isDark = backgroundColor === 'dark'
  const isLight = backgroundColor === 'light'
  const bgClass = bgClasses[backgroundColor || 'white'] || bgClasses.white

  return (
    <section className={cn('py-16 lg:py-28', bgClass)}>
      <div className="container">
        <div
          className={cn('grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 items-start', {
            'text-white [&_h2]:text-white [&_h3]:text-white [&_p]:text-white/85': isDark,
            '[&_h2]:text-[42px] [&_h2]:mb-6 [&_p]:text-[20px] [&_p]:leading-relaxed': isLight,
          })}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, blocks, size } = col

              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}

                  {blocks && blocks.length > 0 && (
                    <div className="mt-8 [&>*]:my-0">
                      <RenderBlocks blocks={blocks} />
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
