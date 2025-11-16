import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  style,
  workingHours,
}) => {
  if (style === 'transilvania-feature') {
    return (
      <section className="transilvania-section bg-transilvania-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Membership Info */}
            <div className="flex flex-col justify-center lg:pr-8">
              {richText && (
                <RichText
                  className="mb-0 [&_h2]:text-transilvania-white [&_h2]:mb-3 [&_h6]:text-transilvania-white [&_h6]:mb-4 [&_p]:text-transilvania-text"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {(links || []).map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    className="transilvania-btn transilvania-btn-primary mt-6 inline-block w-fit"
                  />
                )
              })}
            </div>

            {/* Right Column - Working Hours */}
            <div className="lg:pl-8">
              <div className="border-l-2 border-transilvania-primary pl-14">
                {workingHours && (
                  <RichText
                    className="mb-0 [&_h2]:text-transilvania-white [&_h2]:mb-4 [&_strong]:text-transilvania-white [&_strong]:block [&_strong]:mt-3 [&_p]:text-transilvania-text [&_p]:mb-0"
                    data={workingHours}
                    enableGutter={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default CTA styling
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
