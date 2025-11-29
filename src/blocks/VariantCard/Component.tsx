'use client'

import React from 'react'
import { VariantCard, type CardVariant } from '@/components/VariantCard'
import { getSpacingClasses, type SpacingConfig } from '@/fields/spacing'
import type { Media as MediaType, Page } from '@/payload-types'

interface VariantCardBlockProps {
  variant?: CardVariant
  title: string
  subtitle?: string | null
  description?: string | null
  image?: MediaType | string | null
  imagePosition?: 'top' | 'background'
  price?: {
    amount: number
    period?: string | null
    oldPrice?: number | null
  } | null
  features?: Array<{
    text: string
    included?: boolean | null
  }> | null
  badge?: string | null
  highlighted?: boolean | null
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
function getCtaHref(cta: VariantCardBlockProps['cta']): string {
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

export const VariantCardBlock: React.FC<VariantCardBlockProps> = ({
  variant = 'simple',
  title,
  subtitle,
  description,
  image,
  imagePosition,
  price,
  features,
  badge,
  highlighted,
  cta,
  spacing,
  _nested,
}) => {
  const spacingClass = getSpacingClasses(spacing)

  const ctaData = cta?.label
    ? {
        label: cta.label,
        href: getCtaHref(cta),
        newTab: cta.newTab || false,
      }
    : undefined

  return (
    <div className={spacingClass}>
      <VariantCard
        variant={variant}
        title={title}
        subtitle={subtitle}
        description={description}
        image={image as MediaType | null}
        imagePosition={imagePosition}
        price={price}
        features={features}
        badge={badge}
        highlighted={highlighted}
        cta={ctaData}
        index={0}
      />
    </div>
  )
}
