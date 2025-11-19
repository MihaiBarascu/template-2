import type { Post, TeamMember, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'posts'
  } = props

  const limit = limitFromProps || 3

  let items: (Post | TeamMember)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    if (relationTo === 'posts') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      })

      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      items = fetchedPosts.docs
    } else if (relationTo === 'team-members') {
      const fetchedMembers = await payload.find({
        collection: 'team-members',
        depth: 1,
        limit,
        where: {
          status: { equals: 'published' },
        },
        sort: '-createdAt',
      })

      items = fetchedMembers.docs
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedItems = selectedDocs.map((item) => {
        if (typeof item.value === 'object') return item.value
      }) as (Post | TeamMember)[]

      items = filteredSelectedItems
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive items={items} collectionType={relationTo || 'posts'} />
    </div>
  )
}