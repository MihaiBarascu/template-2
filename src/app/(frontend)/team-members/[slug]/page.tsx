import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { Award, ChevronRight, Facebook, Instagram, Mail, Phone, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { TeamMember } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })

    if (!payload) {
      console.warn('Payload not initialized for team-members')
      return []
    }

    const teamMembers = await payload.find({
      collection: 'team-members',
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
      },
    })

    if (!teamMembers || !teamMembers.docs) {
      return []
    }

    const params = teamMembers.docs
      .filter((doc) => doc.slug)
      .map(({ slug }) => ({ slug: slug || '' }))

    return params
  } catch (error) {
    console.warn('Failed to generate static params for team-members:', error)
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Helper function to get other team members
const getOtherTeamMembers = cache(async (currentId: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'team-members',
    where: {
      id: { not_equals: currentId },
    },
    limit: 3,
    depth: 2,
  })

  return result.docs as TeamMember[]
})

export default async function TeamMemberPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const teamMember = await queryTeamMemberBySlug({ slug: decodedSlug })

  if (!teamMember) {
    notFound()
  }

  // Get other team members for the "Meet the Team" section
  const otherMembers = await getOtherTeamMembers(teamMember.id)

  // Get the image URL safely
  const imageUrl =
    teamMember.featuredImage && typeof teamMember.featuredImage === 'object'
      ? teamMember.featuredImage.url
      : null

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-transilvania-primary transition-colors">
                Acasă
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <Link
                href="/team-members"
                className="hover:text-transilvania-primary transition-colors"
              >
                Echipa
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-transilvania-dark font-medium">{teamMember.title}</li>
          </ol>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Image & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              {imageUrl ? (
                <div className="relative h-96 lg:h-[450px]">
                  <Image
                    src={imageUrl}
                    alt={teamMember.title || 'Team member'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="h-96 lg:h-[450px] bg-gradient-to-br from-transilvania-primary/20 to-transilvania-dark/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-transilvania-primary/30">
                    {teamMember.title?.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-transilvania-dark">{teamMember.title}</h2>
                  {teamMember.role && (
                    <p className="text-lg text-transilvania-primary font-medium mt-1">
                      {teamMember.role}
                    </p>
                  )}
                </div>

                {/* Experience Badge */}
                {teamMember.experience && (
                  <div className="flex items-center justify-center gap-3 py-4 border-y border-gray-100">
                    <Award className="w-8 h-8 text-transilvania-primary" />
                    <div>
                      <p className="text-2xl font-bold text-transilvania-dark">
                        {teamMember.experience}+
                      </p>
                      <p className="text-sm text-gray-600">Ani experiență</p>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {teamMember.contact && (
                  <div className="space-y-3">
                    {teamMember.contact.email && (
                      <a
                        href={`mailto:${teamMember.contact.email}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-transilvania-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm break-all">{teamMember.contact.email}</span>
                      </a>
                    )}
                    {teamMember.contact.phone && (
                      <a
                        href={`tel:${teamMember.contact.phone}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-transilvania-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{teamMember.contact.phone}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Social Media */}
                {teamMember.socialMedia && (
                  <div className="pt-4">
                    <div className="flex justify-center gap-3">
                      {teamMember.socialMedia.facebook && (
                        <a
                          href={teamMember.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-transilvania-primary/10 hover:bg-transilvania-primary hover:text-white transition-all"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {teamMember.socialMedia.instagram && (
                        <a
                          href={teamMember.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-transilvania-primary/10 hover:bg-transilvania-primary hover:text-white transition-all"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Bio Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {teamMember.excerpt && (
                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {teamMember.excerpt}
                  </p>
                </div>
              )}

              {/* Rich Text Content */}
              {teamMember.content && (
                <div className="prose prose-lg max-w-none prose-headings:text-transilvania-dark prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-transilvania-dark prose-a:text-transilvania-primary hover:prose-a:text-transilvania-primary/80">
                  <RichText data={teamMember.content} />
                </div>
              )}
            </div>

            {/* Specializations Card */}
            {teamMember.specializations && teamMember.specializations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-transilvania-primary" />
                  <h2 className="text-2xl font-bold text-transilvania-dark">Specializări</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {teamMember.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gradient-to-r from-transilvania-primary/10 to-transparent text-transilvania-dark rounded-lg font-medium border border-transilvania-primary/20 hover:border-transilvania-primary/40 transition-colors"
                    >
                      {spec.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-transilvania-primary to-transilvania-primary/90 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Vrei să lucrezi cu {teamMember.title?.split(' ')[0]}?
              </h3>
              <p className="mb-6 text-white/90">
                Contactează-ne pentru a programa o sesiune de antrenament sau pentru mai multe
                informații despre serviciile noastre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-transilvania-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contactează-ne
                </Link>
                <Link
                  href="/classes"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
                >
                  Vezi clasele disponibile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members Section */}
        {otherMembers.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-transilvania-dark mb-8">Restul echipei</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMembers.map((member) => {
                const memberImageUrl =
                  member.featuredImage && typeof member.featuredImage === 'object'
                    ? member.featuredImage.url
                    : null

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <Link href={`/team-members/${member.slug}`}>
                      <div className="relative h-64">
                        {memberImageUrl ? (
                          <Image
                            src={memberImageUrl}
                            alt={member.title || 'Team member'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-transilvania-primary/20 to-transilvania-dark/20 flex items-center justify-center">
                            <div className="text-4xl font-bold text-transilvania-primary/30">
                              {member.title?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="font-bold text-xl mb-1">{member.title}</h3>
                          {member.role && <p className="text-sm text-white/90">{member.role}</p>}
                        </div>
                      </div>
                      {member.specializations && member.specializations.length > 0 && (
                        <div className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {member.specializations.slice(0, 2).map((spec, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-transilvania-primary/10 text-transilvania-primary rounded-full"
                              >
                                {spec.name}
                              </span>
                            ))}
                            {member.specializations.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                +{member.specializations.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* View All Team Button */}
            <div className="text-center mt-8">
              <Link
                href="/team-members"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transilvania-primary text-white font-bold rounded-lg hover:bg-transilvania-primary/90 transition-colors"
              >
                Vezi toată echipa
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const teamMember = await queryTeamMemberBySlug({ slug })

  return generateMeta({ doc: teamMember })
}

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'team-members',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
