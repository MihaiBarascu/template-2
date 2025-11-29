'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Check, X } from 'lucide-react'
import type { Media as MediaType } from '@/payload-types'

export type CardVariant = 'pricing' | 'product' | 'team' | 'class' | 'offer' | 'simple'

export interface VariantCardProps {
  // Stil vizual
  variant?: CardVariant

  // Conținut
  title: string
  subtitle?: string | null
  description?: string | null

  // Imagine
  image?: MediaType | string | null
  imagePosition?: 'top' | 'background'

  // Preț (opțional)
  price?: {
    amount: number
    period?: string | null
    oldPrice?: number | null
  } | null

  // Features (opțional)
  features?: Array<{
    text: string
    included?: boolean | null
  }> | null

  // Badge (opțional)
  badge?: string | null
  highlighted?: boolean | null

  // CTA Button
  cta?: {
    label: string
    href: string
    newTab?: boolean
  } | null

  // Extra
  className?: string
  index?: number
}

// CSS-based animation classes for better performance
const getAnimationDelay = (index: number) => ({
  animationDelay: `${index * 100}ms`,
})

export const VariantCard: React.FC<VariantCardProps> = ({
  variant = 'simple',
  title,
  subtitle,
  description,
  image,
  imagePosition = 'top',
  price,
  features,
  badge,
  highlighted,
  cta,
  className,
  index = 0,
}) => {
  const imageUrl = typeof image === 'object' && image !== null ? image.url : image
  const imageAlt = typeof image === 'object' && image !== null ? image.alt || title : title

  // Render based on variant
  switch (variant) {
    case 'pricing':
      return (
        <PricingCard
          title={title}
          subtitle={subtitle}
          description={description}
          image={imageUrl}
          imageAlt={imageAlt}
          imagePosition={imagePosition}
          price={price}
          features={features}
          badge={badge}
          highlighted={highlighted}
          cta={cta}
          className={className}
          index={index}
        />
      )

    case 'product':
      return (
        <ProductCard
          title={title}
          subtitle={subtitle}
          description={description}
          image={imageUrl}
          imageAlt={imageAlt}
          price={price}
          badge={badge}
          highlighted={highlighted}
          cta={cta}
          className={className}
          index={index}
        />
      )

    case 'team':
      return (
        <TeamCard
          title={title}
          subtitle={subtitle}
          image={imageUrl}
          imageAlt={imageAlt}
          className={className}
          index={index}
        />
      )

    case 'class':
      return (
        <ClassCard
          title={title}
          subtitle={subtitle}
          description={description}
          image={imageUrl}
          imageAlt={imageAlt}
          price={price}
          cta={cta}
          className={className}
          index={index}
        />
      )

    case 'offer':
      return (
        <OfferCard
          title={title}
          subtitle={subtitle}
          description={description}
          image={imageUrl}
          imageAlt={imageAlt}
          badge={badge}
          highlighted={highlighted}
          cta={cta}
          className={className}
          index={index}
        />
      )

    case 'simple':
    default:
      return (
        <SimpleCard
          title={title}
          subtitle={subtitle}
          description={description}
          cta={cta}
          className={className}
          index={index}
        />
      )
  }
}

// === PRICING CARD ===
// Pentru abonamente GYM - cu gradient header, preț mare, features, CTA
interface PricingCardInternalProps {
  title: string
  subtitle?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  imagePosition?: 'top' | 'background'
  price?: VariantCardProps['price']
  features?: VariantCardProps['features']
  badge?: string | null
  highlighted?: boolean | null
  cta?: VariantCardProps['cta']
  className?: string
  index: number
}

const PricingCard: React.FC<PricingCardInternalProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imagePosition = 'background',
  price,
  features,
  badge,
  highlighted,
  cta,
  className,
  index,
}) => {
  return (
    <article
      className={cn(
        'variant-card variant-card-pricing relative overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:-translate-y-2',
        'transition-all duration-300 ease-out',
        'animate-fade-in-up',
        'flex flex-col h-full',
        highlighted && 'ring-2 ring-theme-primary scale-105',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {/* Header cu imagine background sau gradient */}
      <div className="relative h-48 overflow-hidden">
        {image && imagePosition === 'background' ? (
          <>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-dark to-black" />
        )}

        {/* Badge */}
        {(badge || highlighted) && (
          <div className="absolute top-4 right-4">
            <span className="bg-theme-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
              {badge || 'Popular'}
            </span>
          </div>
        )}

        {/* Titlu și subtitlu */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {subtitle && (
            <span className="text-gray-300 text-sm uppercase tracking-wider mb-2">
              {subtitle}
            </span>
          )}
          <h3 className="text-white text-2xl font-bold drop-shadow-lg">{title}</h3>
        </div>
      </div>

      {/* Preț */}
      {price && (
        <div className="text-center py-4 border-b border-gray-100">
          <div className="flex items-baseline justify-center gap-2">
            {price.oldPrice && (
              <span className="text-theme-muted line-through text-base">
                {price.oldPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-theme-dark">{price.amount}</span>
            <span className="text-theme-muted">RON</span>
            {price.period && (
              <span className="text-theme-muted">{price.period}</span>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="p-6 space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              {feature.included !== false ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm',
                  feature.included !== false ? 'text-theme-text' : 'text-theme-muted line-through',
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Description */}
      {description && !features?.length && (
        <div className="p-6">
          <p className="text-theme-text text-sm">{description}</p>
        </div>
      )}

      {/* CTA Button */}
      {cta && (
        <div className="p-6 pt-0 mt-auto">
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className={cn(
              'block w-full text-center py-3 px-6 rounded transition-all duration-300',
              highlighted
                ? 'bg-theme-primary text-white hover:bg-theme-primary-hover hover:text-white'
                : 'bg-theme-dark text-white hover:bg-theme-primary hover:text-white',
            )}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </article>
  )
}

// === PRODUCT CARD ===
// Pentru abonamente SPA/Solar - cu imagine sus, badge, preț, CTA
interface ProductCardInternalProps {
  title: string
  subtitle?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  price?: VariantCardProps['price']
  badge?: string | null
  highlighted?: boolean | null
  cta?: VariantCardProps['cta']
  className?: string
  index: number
}

const ProductCard: React.FC<ProductCardInternalProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  badge,
  highlighted,
  cta,
  className,
  index,
}) => {
  return (
    <article
      className={cn(
        'variant-card variant-card-product overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:-translate-y-2',
        'transition-all duration-300 ease-out',
        'animate-fade-in-up',
        highlighted && 'ring-2 ring-theme-primary',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {/* Imagine */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-theme-primary/10 to-theme-dark/10" />
        )}

        {/* Badge */}
        {(badge || highlighted) && (
          <div className="absolute top-4 left-4">
            <span className="bg-theme-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
              {badge || 'Recomandat'}
            </span>
          </div>
        )}

        {/* Preț badge overlay */}
        {price && (
          <div className="absolute bottom-4 right-4 bg-theme-primary text-white px-4 py-2 rounded">
            {price.oldPrice && (
              <span className="text-white/70 line-through text-sm mr-2">
                {price.oldPrice}
              </span>
            )}
            <span className="font-bold">{price.amount} RON</span>
            {price.period && <span className="text-sm ml-1">{price.period}</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {subtitle && (
          <span className="text-theme-primary text-sm font-medium uppercase tracking-wider">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-theme-dark mt-1">{title}</h3>

        {description && (
          <p className="text-theme-text text-sm mt-3 line-clamp-2">{description}</p>
        )}

        {/* CTA */}
        {cta && (
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className="inline-block mt-4 text-theme-primary font-medium hover:underline"
          >
            {cta.label} →
          </Link>
        )}
      </div>
    </article>
  )
}

// === TEAM CARD ===
// Pentru Team Members - imagine, nume, rol
interface TeamCardInternalProps {
  title: string
  subtitle?: string | null
  image?: string | null
  imageAlt?: string
  className?: string
  index: number
}

const TeamCard: React.FC<TeamCardInternalProps> = ({
  title,
  subtitle,
  image,
  imageAlt,
  className,
  index,
}) => {
  return (
    <article
      className={cn(
        'variant-card variant-card-team overflow-hidden',
        'animate-fade-in-up',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {/* Imagine */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-theme-muted/20 to-theme-dark/20 flex items-center justify-center">
            <span className="text-6xl text-theme-muted opacity-50">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="team-info text-center">
        <h3 className="text-xl font-bold text-theme-dark">{title}</h3>
        {subtitle && (
          <span className="text-theme-muted block mt-1">{subtitle}</span>
        )}
      </div>
    </article>
  )
}

// === CLASS CARD ===
// Pentru Classes - imagine, titlu, trainer, badge preț
interface ClassCardInternalProps {
  title: string
  subtitle?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  price?: VariantCardProps['price']
  cta?: VariantCardProps['cta']
  className?: string
  index: number
}

const ClassCard: React.FC<ClassCardInternalProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  price,
  cta,
  className,
  index,
}) => {
  const CardWrapper = cta ? Link : 'div'
  const wrapperProps = cta
    ? { href: cta.href, target: cta.newTab ? '_blank' : undefined }
    : {}

  return (
    <article
      className={cn(
        'variant-card variant-card-class class-thumb',
        'animate-fade-in-up',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CardWrapper {...(wrapperProps as any)} className="block">
        {/* Imagine */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-primary/10 to-theme-dark/10 flex items-center justify-center">
              <span className="text-4xl">🏋️</span>
            </div>
          )}

          {/* Preț badge */}
          {price && (
            <span className="class-price">
              {price.amount}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="class-info">
          <h3>{title}</h3>
          {subtitle && (
            <span className="class-trainer">
              <strong>Trainer</strong> - {subtitle}
            </span>
          )}
          {description && (
            <p className="class-description">{description}</p>
          )}
        </div>
      </CardWrapper>
    </article>
  )
}

// === OFFER CARD ===
// Pentru Oferte/Promo - fără preț obligatoriu, CTA proeminent
interface OfferCardInternalProps {
  title: string
  subtitle?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  badge?: string | null
  highlighted?: boolean | null
  cta?: VariantCardProps['cta']
  className?: string
  index: number
}

const OfferCard: React.FC<OfferCardInternalProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  badge,
  highlighted,
  cta,
  className,
  index,
}) => {
  return (
    <article
      className={cn(
        'variant-card variant-card-offer relative overflow-hidden rounded-lg',
        'bg-white shadow-lg hover:shadow-xl hover:scale-[1.02]',
        'transition-all duration-300 ease-out',
        'animate-fade-in-up',
        highlighted && 'ring-2 ring-theme-primary',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {/* Imagine sau gradient */}
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-primary to-theme-dark" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-white text-theme-primary text-xs font-bold uppercase px-3 py-1 rounded-full">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {subtitle && (
          <span className="text-theme-muted text-sm uppercase tracking-wider">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-theme-dark mt-1">{title}</h3>

        {description && (
          <p className="text-theme-text text-sm mt-3">{description}</p>
        )}

        {/* CTA prominent */}
        {cta && (
          <Link
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
            className="mt-6 block w-full text-center py-3 px-6 bg-theme-primary text-white rounded font-medium hover:bg-theme-primary-hover transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </article>
  )
}

// === SIMPLE CARD ===
// Minimal - text + buton
interface SimpleCardInternalProps {
  title: string
  subtitle?: string | null
  description?: string | null
  cta?: VariantCardProps['cta']
  className?: string
  index: number
}

const SimpleCard: React.FC<SimpleCardInternalProps> = ({
  title,
  subtitle,
  description,
  cta,
  className,
  index,
}) => {
  return (
    <article
      className={cn(
        'variant-card variant-card-simple p-6 rounded-lg',
        'bg-white shadow hover:shadow-md transition-shadow duration-300',
        'animate-fade-in-up',
        className,
      )}
      style={getAnimationDelay(index)}
    >
      {subtitle && (
        <span className="text-theme-primary text-sm font-medium uppercase tracking-wider">
          {subtitle}
        </span>
      )}
      <h3 className="text-lg font-bold text-theme-dark mt-1">{title}</h3>

      {description && (
        <p className="text-theme-text text-sm mt-2">{description}</p>
      )}

      {cta && (
        <Link
          href={cta.href}
          target={cta.newTab ? '_blank' : undefined}
          rel={cta.newTab ? 'noopener noreferrer' : undefined}
          className="inline-block mt-4 text-theme-primary font-medium hover:underline"
        >
          {cta.label} →
        </Link>
      )}
    </article>
  )
}

export default VariantCard
