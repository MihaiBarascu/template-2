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
  badge?: string | null
  link?: CardLink | null
}

interface PreviewCardsProps {
  style?: 'small' | 'large' | 'gymso-team' | 'gymso-class'
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

// Wrapper component for card with link
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

export const PreviewCards: React.FC<PreviewCardsProps> = ({ style = 'gymso-team', cards }) => {
  if (!cards || cards.length === 0) {
    return null
  }

  // Gymso Team style - Original template team cards
  if (style === 'gymso-team') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
              <div className="gymso-card-team">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-sm">
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
                <div className="gymso-card-info flex flex-col">
                  <h3 className="text-[28px] font-bold tracking-tight text-transilvania-dark m-0">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <span className="text-base font-light opacity-85 mt-1">{card.subtitle}</span>
                  )}
                </div>
              </div>
            </CardWrapper>
          )
        })}
      </div>
    )
  }

  // Gymso Class style - Original template class cards
  if (style === 'gymso-class') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="gymso-card-class">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-sm">
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
                <div className="gymso-card-info-class relative">
                  <h3 className="text-[28px] font-bold tracking-tight text-transilvania-dark mb-1">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <span className="text-base text-transilvania-gray">
                      <strong className="text-transilvania-gray">Antrenat de</strong> •{' '}
                      {card.subtitle}
                    </span>
                  )}

                  {/* Price badge */}
                  {card.badge && (
                    <span className="gymso-class-price absolute -top-12 right-4">
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>
            </CardWrapper>
          )
        })}
      </div>
    )
  }

  // Small style - Simple team-like cards
  if (style === 'small') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="relative h-[320px] sm:h-[380px]">
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
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-transilvania-dark mb-1 group-hover:text-transilvania-primary transition-colors">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="text-transilvania-gray text-sm">{card.subtitle}</p>
                )}
              </div>
            </CardWrapper>
          )
        })}
      </div>
    )
  }

  // Large style - Cards with overlay text
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="relative h-[350px] overflow-hidden rounded-lg">
              {image ? (
                <Image
                  src={image.url || ''}
                  alt={image.alt || card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badge */}
              {card.badge && (
                <div className="absolute top-4 right-4 bg-transilvania-primary text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold text-center">
                  <span className="text-xs leading-tight">{card.badge}</span>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {card.title}
                </h3>
                {card.subtitle && <p className="text-sm opacity-90">{card.subtitle}</p>}
              </div>
            </div>
          </CardWrapper>
        )
      })}
    </div>
  )
}
