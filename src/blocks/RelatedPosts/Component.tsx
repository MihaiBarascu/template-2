import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { UniversalCard } from '@/components/UniversalCard'
import { postToCardProps } from '@/utilities/cardAdapters'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          const cardProps = postToCardProps(doc, {
            cardType: 'blog',
            showCategories: true,
          })

          return <UniversalCard key={index} {...cardProps} index={index} />
        })}
      </div>
    </div>
  )
}
