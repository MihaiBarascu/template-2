import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { TeamMember } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Echipa Noastră | Transilvania Fitness',
  description: 'Întâlnește echipa de profesioniști dedicați de la Transilvania Fitness',
}

export default async function TeamMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = parseInt(page)

  const payload = await getPayload({ config: configPromise })

  const teamMembers = await payload.find({
    collection: 'team-members',
    depth: 1,
    limit: 12,
    page: currentPage,
    sort: '-createdAt',
  })

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-transilvania-dark to-black text-white py-20 md:py-32">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Echipa Noastră
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Profesioniști dedicați și pasionați care te vor ghida către obiectivele tale de fitness
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="container mt-16">
        {teamMembers.docs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {teamMembers.docs.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {/* Pagination */}
            {teamMembers.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  page={teamMembers.page || 1}
                  totalPages={teamMembers.totalPages}
                />
                <div className="text-center mt-4">
                  <PageRange
                    totalDocs={teamMembers.totalDocs || 0}
                    limit={12}
                    currentPage={currentPage}
                    collectionLabels={{
                      plural: 'membri echipă',
                      singular: 'membru echipă',
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-transilvania-text">
              Nu există membri ai echipei disponibili momentan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 group">
      <Link href={`/team-members/${member.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-100">
          {member.featuredImage && typeof member.featuredImage === 'object' ? (
            <Image
              src={member.featuredImage.url || ''}
              alt={member.featuredImage.alt || member.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-transilvania-gray to-transilvania-dark
                          flex items-center justify-center">
              <span className="text-6xl text-white opacity-50">
                {member.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-transilvania-dark mb-1
                       group-hover:text-transilvania-primary transition-colors">
            {member.title}
          </h3>

          {member.role && (
            <p className="text-transilvania-primary font-medium mb-3">{member.role}</p>
          )}

          {member.excerpt && (
            <p className="text-sm text-transilvania-text line-clamp-2">
              {member.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}