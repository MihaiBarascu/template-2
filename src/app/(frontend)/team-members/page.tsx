import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { StaticPageHero } from '@/components/StaticPageHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { PaginiEchipa } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import { teamMemberToCardProps } from '@/utilities/cardAdapters'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getCachedGlobal('pagini-echipa', 1)()) as PaginiEchipa

  return {
    title: settings?.meta?.title || 'Echipa Noastra | Transilvania Fitness',
    description: settings?.meta?.description || 'Intalneste echipa de profesionisti dedicati de la Transilvania Fitness',
    openGraph: settings?.meta?.image && typeof settings.meta.image === 'object' ? {
      images: [{ url: settings.meta.image.url || '' }],
    } : undefined,
  }
}

export default async function TeamMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = parseInt(page)

  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('pagini-echipa', 1)()) as PaginiEchipa

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
      <StaticPageHero
        title={settings?.heroTitle || 'Echipa Noastra'}
        description={settings?.heroSubtitle || 'Profesionisti dedicati si pasionati care te vor ghida catre obiectivele tale de fitness'}
        backgroundImage={settings?.heroBackground && typeof settings.heroBackground === 'object' ? settings.heroBackground.url : null}
      />

      {/* Team Members Grid */}
      <div className="container mt-16">
        {teamMembers.docs.length > 0 ? (
          <>
            <div className={`grid gap-6 mb-12 ${
              settings?.columns === '2' ? 'md:grid-cols-2' :
              settings?.columns === '4' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
              'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {teamMembers.docs.map((member, index) => {
                const cardType = (settings?.cardType as CardType) || 'team'
                const cardProps = teamMemberToCardProps(member, {
                  cardType,
                  showExperience: settings?.showExperience ?? true,
                })
                return (
                  <UniversalCard
                    key={member.id}
                    {...cardProps}
                    index={index}
                  />
                )
              })}
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
            <p className="text-xl text-theme-text">
              Nu există membri ai echipei disponibili momentan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}