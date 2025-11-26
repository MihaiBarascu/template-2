import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Card, CardPostData } from '@/components/Card'
import type { Post, TeamMember } from '@/payload-types'

export type Props = {
  items?: (Post | TeamMember | CardPostData)[]
  posts?: CardPostData[] // backwards compatibility
  collectionType?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, posts, collectionType = 'posts' } = props

  // Use items if provided, otherwise fallback to posts for backwards compatibility
  const data = items || posts || []

  // Check if item is a team member
  const isTeamMember = (item: Post | TeamMember | CardPostData): item is TeamMember => {
    return 'role' in item || collectionType === 'team-members'
  }

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {data?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              // If it's a team member, render team member card
              if (isTeamMember(result)) {
                return (
                  <div className="col-span-4" key={index}>
                    <TeamMemberCard member={result} />
                  </div>
                )
              }

              // Otherwise render post card
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}

// Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  const memberUrl = `/team-members/${member.slug}`

  return (
    <article className="h-full bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 group">
      <Link href={memberUrl} className="block h-full">
        <div className="relative aspect-[3/4] bg-gray-100">
          {member.featuredImage && typeof member.featuredImage === 'object' ? (
            <Image
              src={member.featuredImage.url || ''}
              alt={member.featuredImage.alt || member.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-muted to-theme-dark
                          flex items-center justify-center">
              <span className="text-6xl text-white opacity-50">
                {member.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-theme-dark mb-1
                       group-hover:text-theme-primary transition-colors">
            {member.title}
          </h3>

          {member.role && (
            <p className="text-theme-primary font-medium mb-3">{member.role}</p>
          )}

          {member.excerpt && (
            <p className="text-sm text-theme-text line-clamp-2">
              {member.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}