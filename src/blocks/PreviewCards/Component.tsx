'use client'

import type { Media, Page, TeamMember, Class } from '@/payload-types'
import { animationDelays, fadeInUp } from '@/utilities/animations'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ReferenceValue = Page | TeamMember | Class

interface CardLink {
  type?: 'reference' | 'custom' | null
  reference?: {
    relationTo: 'pages' | 'team-members' | 'classes'
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

interface PreviewCardsProps {
  style?: 'team' | 'class'
  cards?: Card[]
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
      const slug = value.slug

      switch (relationTo) {
        case 'pages':
          return `/${slug}`
        case 'team-members':
          return `/team-members/${slug}`
        case 'classes':
          return `/classes/${slug}`
        default:
          return `/${slug}`
      }
    }
  }

  return null
}

// Wrapper component for card with link and animation
const CardWrapper: React.FC<{
  href: string | null
  newTab?: boolean | null
  children: React.ReactNode
  index: number
  cardId?: string
}> = ({ href, newTab, children, index, cardId }) => {
  const newTabProps = newTab ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <motion.div
      key={cardId || index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      custom={animationDelays.medium + index * 0.1}
    >
      {href ? (
        <Link href={href} className="group block" {...newTabProps}>
          {children}
        </Link>
      ) : (
        <div className="group block">{children}</div>
      )}
    </motion.div>
  )
}

export const PreviewCards: React.FC<PreviewCardsProps> = ({ style = 'team', cards }) => {
  if (!cards || cards.length === 0) {
    return null
  }

  // Team style - Members with social icons (Gymso original)
  if (style === 'team') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          const image = typeof card.image === 'object' ? card.image : null
          const href = getHref(card.link)

          return (
            <CardWrapper
              key={card.id || index}
              href={href}
              newTab={card.link?.newTab}
              index={index}
              cardId={card.id}
            >
              <div className="team-thumb">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {image ? (
                    <Image
                      src={image.url || ''}
                      alt={image.alt || card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* Info section */}
                <div className="team-info">
                  <h3>{card.title}</h3>
                  {card.subtitle && <span>{card.subtitle}</span>}
                </div>
              </div>
            </CardWrapper>
          )
        })}
      </div>
    )
  }

  // Class style - Classes with price badge (Gymso original)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const image = typeof card.image === 'object' ? card.image : null
        const href = getHref(card.link)

        return (
          <CardWrapper
            key={card.id || index}
            href={href}
            newTab={card.link?.newTab}
            index={index}
            cardId={card.id}
          >
            <div className="class-thumb">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {image ? (
                  <Image
                    src={image.url || ''}
                    alt={image.alt || card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Info section */}
              <div className="class-info">
                <h3>{card.title}</h3>
                {card.subtitle && (
                  <span className="class-trainer">
                    Trained by - <strong>{card.subtitle}</strong>
                  </span>
                )}

                {/* Price badge */}
                {card.badge && <span className="class-price">{card.badge}</span>}

                {card.description && <p className="class-description">{card.description}</p>}
              </div>
            </div>
          </CardWrapper>
        )
      })}
    </div>
  )
}
