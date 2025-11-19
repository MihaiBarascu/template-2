import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    if (!payload) {
      console.warn('Payload not initialized for team-members')
      return []
    }

    const teamMembers = await payload.find({
      collection: 'team-members',
      draft: false,
      limit: 1000,
      overrideAccess: false,
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

export default async function TeamMemberPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const teamMember = await queryTeamMemberBySlug({ slug: decodedSlug })

  if (!teamMember) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-bold mb-4">Team Member Not Found</h1>
        <p>Looking for: {decodedSlug}</p>
        <p className="mt-4">
          <a href="/team-members" className="text-blue-600 underline">
            ← Back to all team members
          </a>
        </p>
      </div>
    )
  }

  const { isEnabled: draft } = await draftMode()

  return (
    <article className="pb-16">
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-b from-transilvania-dark to-black">
        {teamMember.featuredImage && typeof teamMember.featuredImage === 'object' && (
          <div className="absolute inset-0">
            <Image
              src={teamMember.featuredImage.url || ''}
              alt={teamMember.featuredImage.alt || teamMember.title}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}

        <div className="relative container h-full flex items-end pb-12">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {teamMember.title}
            </h1>
            {teamMember.role && (
              <p className="text-xl md:text-2xl text-transilvania-primary font-medium">
                {teamMember.role}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {teamMember.excerpt && (
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-transilvania-text leading-relaxed">
                  {teamMember.excerpt}
                </p>
              </div>
            )}

            {/* Rich Text Content */}
            {teamMember.content && (
              <div className="prose prose-lg max-w-none">
                <RichText data={teamMember.content} />
              </div>
            )}

            {/* Specializations */}
            {teamMember.specializations && teamMember.specializations.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-transilvania-dark mb-4">
                  Specializări
                </h2>
                <div className="flex flex-wrap gap-3">
                  {teamMember.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-transilvania-primary/10 text-transilvania-primary
                               rounded-full font-medium"
                    >
                      {spec.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
              {/* Experience */}
              {teamMember.experience && (
                <div className="text-center mb-6 pb-6 border-b">
                  <p className="text-3xl font-bold text-transilvania-primary">
                    {teamMember.experience}+
                  </p>
                  <p className="text-sm text-transilvania-text">Ani experiență</p>
                </div>
              )}

              {/* Contact */}
              {teamMember.contact && (
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold text-transilvania-dark mb-3">Contact</h3>
                  {teamMember.contact.email && (
                    <a
                      href={`mailto:${teamMember.contact.email}`}
                      className="flex items-center gap-3 text-transilvania-text
                               hover:text-transilvania-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">{teamMember.contact.email}</span>
                    </a>
                  )}
                  {teamMember.contact.phone && (
                    <a
                      href={`tel:${teamMember.contact.phone}`}
                      className="flex items-center gap-3 text-transilvania-text
                               hover:text-transilvania-primary transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">{teamMember.contact.phone}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Social Media */}
              {teamMember.socialMedia && (
                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-transilvania-dark mb-3">Social Media</h3>
                  <div className="flex gap-3">
                    {teamMember.socialMedia.facebook && (
                      <a
                        href={teamMember.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full
                                 bg-white shadow hover:shadow-md transition-shadow"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-transilvania-text" />
                      </a>
                    )}
                    {teamMember.socialMedia.instagram && (
                      <a
                        href={teamMember.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full
                                 bg-white shadow hover:shadow-md transition-shadow"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-transilvania-text" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {draft && <LivePreviewListener />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const teamMember = await queryTeamMemberBySlug({ slug })

  return generateMeta({ doc: teamMember })
}

const queryTeamMemberBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'team-members',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})