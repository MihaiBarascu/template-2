'use client'

import React from 'react'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import { getSpacingClasses, type SpacingConfig } from '@/fields/spacing'
import type { Media as MediaType, Page } from '@/payload-types'

interface UniversalCardBlockProps {
  cardType?: CardType
  title: string
  subtitle?: string | null
  description?: string | null
  image?: MediaType | string | null
  imagePosition?: 'top' | 'background'
  price?: {
    amount?: number | null
    period?: string | null
    oldPrice?: number | null
  } | null
  features?: Array<{
    text: string
    included?: boolean | null
  }> | null
  badge?: string | null
  badgeColor?: 'primary' | 'success' | 'warning' | 'dark' | null
  highlighted?: boolean | null
  meta?: {
    duration?: number | null
    capacity?: number | null
    schedule?: string | null
  } | null
  cta?: {
    label?: string | null
    linkType?: 'page' | 'custom' | null
    page?: Page | string | number | null
    url?: string | null
    newTab?: boolean | null
  } | null
  spacing?: SpacingConfig | null
  _nested?: boolean
}

// Helper to get CTA href
function getCtaHref(cta: UniversalCardBlockProps['cta']): string {
  if (!cta) return '#'

  if (cta.linkType === 'custom' && cta.url) {
    return cta.url
  }

  if (cta.linkType === 'page' && cta.page) {
    if (typeof cta.page === 'object' && cta.page !== null && 'slug' in cta.page) {
      return `/${cta.page.slug}`
    }
  }

  return '#'
}

export const UniversalCardBlock: React.FC<UniversalCardBlockProps> = ({
  cardType = 'simple',
  title,
  subtitle,
  description,
  image,
  imagePosition,
  price,
  features,
  badge,
  badgeColor,
  highlighted,
  meta,
  cta,
  spacing,
}) => {
  const spacingClass = getSpacingClasses(spacing)

  // Build CTA data if label exists
  const ctaData = cta?.label
    ? {
        label: cta.label,
        href: getCtaHref(cta),
        newTab: cta.newTab || false,
      }
    : undefined

  // Build price data if amount exists
  const priceData = price?.amount
    ? {
        amount: price.amount,
        period: price.period,
        oldPrice: price.oldPrice,
      }
    : undefined

  // Build meta data if any field exists
  const metaData =
    meta?.duration || meta?.capacity || meta?.schedule
      ? {
          duration: meta.duration,
          capacity: meta.capacity,
          schedule: meta.schedule,
        }
      : undefined

  return (
    <div className={spacingClass}>
      <UniversalCard
        cardType={cardType}
        title={title}
        subtitle={subtitle}
        description={description}
        image={image as MediaType | null}
        imagePosition={imagePosition}
        price={priceData}
        features={features}
        badge={badge}
        badgeColor={badgeColor}
        highlighted={highlighted}
        meta={metaData}
        cta={ctaData}
        index={0}
      />
    </div>
  )
}
