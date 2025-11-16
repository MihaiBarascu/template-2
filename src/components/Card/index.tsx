'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'postType' | 'serviceDetails'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, postType, serviceDetails } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const isService = postType === 'service'
  const href = `/${relationTo}/${slug}`

  // Service card (transilvania style)
  if (isService) {
    return (
      <article
        className={cn(
          'transilvania-class-thumb bg-transilvania-white overflow-hidden hover:cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className="relative w-full">
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
        </div>
        <div className="class-info p-6">
          {titleToUse && (
            <h3 className="mb-1 text-2xl font-semibold">
              <Link
                href={href}
                ref={link.ref}
                className="text-transilvania-dark hover:text-transilvania-primary"
              >
                {titleToUse}
              </Link>
            </h3>
          )}
          {serviceDetails?.trainer && (
            <span className="text-transilvania-gray">
              <strong className="text-transilvania-dark">Trained by</strong> -{' '}
              {serviceDetails.trainer}
            </span>
          )}
          {serviceDetails?.price && (
            <span className="class-price block mt-3 text-3xl font-bold text-transilvania-primary">
              {serviceDetails.price}
            </span>
          )}
          {description && <p className="mt-3 text-transilvania-text">{sanitizedDescription}</p>}
        </div>
      </article>
    )
  }

  // Regular blog post card
  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
