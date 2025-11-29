'use client'

import type { Media, Page, TeamMember, Clase } from '@/payload-types'
import { fadeInUp, viewportSettings, getCardDelay } from '@/utilities/animations'
import { getCollectionUrl } from '@/utilities/getCollectionUrl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ReferenceValue = Page | TeamMember | Clase

interface CardLink {
  type?: 'reference' | 'custom' | null
  reference?: {
    relationTo: 'pages' | 'team-members' | 'clase'
    value: ReferenceValue | string | number
  } | null
  url?: string | null
  newTab?: boolean | null
}

interface Card {
  id?: string
  image: Media | string
  title: string
  subtitle?: string | null
  description?: string | null
  badge?: string | null
  link?: CardLink | null
}

interface SpacingConfig {
  marginTop?: string | null
  marginBottom?: string | null
}

interface PreviewCardsProps {
  style?: 'team' | 'class'
  cards?: Card[]
  spacing?: SpacingConfig | null
}

// Helper to generate href from link
function getHref(link?: CardLink | null): string | null {
  if (!link) return null

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference

    if (typeof value === 'object' && value !== null && 'slug' in value) {
      return getCollectionUrl(relationTo, value.slug)
    }
  }

  return null
}

// Inline spacing classes (client component)
const marginTopMap: Record<string, string> = {
  none: '',
  xs: 'mt-1',
  sm: 'mt-2',
  md: 'mt-4',
  lg: 'mt-8',
  xl: 'mt-12',
  '2xl': 'mt-16',
  '3xl': 'mt-24',
}
const marginBottomMap: Record<string, string> = {
  none: '',
  xs: 'mb-1',
  sm: 'mb-2',
  md: 'mb-4',
  lg: 'mb-8',
  xl: 'mb-12',
  '2xl': 'mb-16',
  '3xl': 'mb-24',
}

export const PreviewCards: React.FC<PreviewCardsProps> = ({ style = 'team', cards, spacing }) => {
  const spacingClass = [
    spacing?.marginTop ? marginTopMap[spacing.marginTop] : '',
    spacing?.marginBottom ? marginBottomMap[spacing.marginBottom] : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!cards || cards.length === 0) {
    return null
  }

  // Team style - Members with social icons (Gymso original)
  if (style === 'team') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${spacingClass}`}>
        {cards.map((card, index) => {
          const image = typeof card.image === 'object' ? card.image : null
          const href = getHref(card.link)
          const newTabProps = card.link?.newTab
            ? { target: '_blank' as const, rel: 'noopener noreferrer' }
            : {}

          const cardContent = (
            <motion.div
              className="team-thumb group"
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeInUp}
              custom={getCardDelay(index)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-sm">
                {image ? (
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={image.url || ''}
                      alt={image.alt || card.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Info section */}
              <div className="team-info transition-shadow duration-300 group-hover:shadow-xl">
                <h3>{card.title}</h3>
                {card.subtitle && <span>{card.subtitle}</span>}
              </div>
            </motion.div>
          )

          return href ? (
            <Link key={card.id || index} href={href} className="block" {...newTabProps}>
              {cardContent}
            </Link>
          ) : (
            <div key={card.id || index}>{cardContent}</div>
          )
        })}
      </div>
    )
  }

  // Class style - Classes with price badge (Gymso original)
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${spacingClass}`}>
      {cards.map((card, index) => {
        const image = typeof card.image === 'object' ? card.image : null
        const href = getHref(card.link)
        const newTabProps = card.link?.newTab
          ? { target: '_blank' as const, rel: 'noopener noreferrer' }
          : {}

        const cardContent = (
          <motion.div
            className="class-thumb group"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
            custom={getCardDelay(index)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Image with zoom effect */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-sm">
              {image ? (
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Image
                    src={image.url || ''}
                    alt={image.alt || card.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* Info section - fixed height */}
            <div className="class-info transition-shadow duration-300 group-hover:shadow-xl h-[160px] flex flex-col">
              <h3 className="line-clamp-1">{card.title}</h3>
              {card.subtitle && (
                <span className="class-trainer">
                  Trained by - <strong>{card.subtitle}</strong>
                </span>
              )}

              {/* Price badge with scale animation */}
              {card.badge && (
                <motion.span
                  className="class-price"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: getCardDelay(index) / 1000 + 0.2,
                  }}
                >
                  {card.badge}
                </motion.span>
              )}

              {card.description && (
                <p className="class-description line-clamp-3 flex-1">{card.description}</p>
              )}
            </div>
          </motion.div>
        )

        return href ? (
          <Link key={card.id || index} href={href} className="block" {...newTabProps}>
            {cardContent}
          </Link>
        ) : (
          <div key={card.id || index}>{cardContent}</div>
        )
      })}
    </div>
  )
}
