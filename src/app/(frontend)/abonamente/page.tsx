import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import type { Abonamente as AbonamentType, PaginiAbonamente } from '@/payload-types'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import { abonamenteToCardProps } from '@/utilities/cardAdapters'
import { StaticPageHero } from '@/components/StaticPageHero'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getCachedGlobal('pagini-abonamente', 1)()) as PaginiAbonamente

  return {
    title: settings?.meta?.title || 'Abonamente | Transilvania Fitness',
    description: settings?.meta?.description || 'Descopera abonamentele noastre pentru sala, SPA si solar la preturi avantajoase.',
    openGraph: settings?.meta?.image && typeof settings.meta.image === 'object' ? {
      images: [{ url: settings.meta.image.url || '' }],
    } : undefined,
  }
}

// Type labels for section titles
const typeLabels: Record<string, string> = {
  gym: 'Abonamente Sală',
  spa: 'Abonamente SPA & Wellness',
  solar: 'Abonamente Solar',
  'fitness-spa': 'Pachete Fitness + SPA',
  'aerobic-spa': 'Pachete Aerobic + SPA',
}

// Type descriptions
const typeDescriptions: Record<string, string> = {
  gym: 'Alege abonamentul care ți se potrivește și începe-ți transformarea.',
  spa: 'Relaxare și recuperare după antrenament.',
  solar: 'Bronz perfect tot timpul anului.',
  'fitness-spa': 'Combinația ideală pentru corp și minte.',
  'aerobic-spa': 'Cardio și relaxare într-un singur pachet.',
}

export default async function AbonamentePage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('pagini-abonamente', 1)()) as PaginiAbonamente

  // Layout settings from admin
  const showFilters = settings?.showFilters ?? true
  const columns = settings?.columns || '3'
  const defaultFilter = settings?.defaultFilter || 'all'
  const adminCardType = settings?.cardType as CardType | undefined

  const { docs } = await payload.find({
    collection: 'abonamente',
    where: { active: { equals: true } },
    sort: 'order',
    depth: 2,
    limit: 100,
  })

  // Group by type
  const grouped = docs.reduce(
    (acc, item) => {
      const type = item.type || 'gym'
      if (!acc[type]) acc[type] = []
      acc[type].push(item)
      return acc
    },
    {} as Record<string, AbonamentType[]>,
  )

  // Order of sections
  const sectionOrder = ['gym', 'spa', 'solar', 'fitness-spa', 'aerobic-spa']

  // Get column class based on settings
  const getGridCols = () => {
    switch (columns) {
      case '2': return 'lg:grid-cols-2'
      case '4': return 'lg:grid-cols-4'
      default: return 'lg:grid-cols-3'
    }
  }

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <StaticPageHero
        title={settings?.heroTitle || 'Abonamente'}
        description={settings?.heroSubtitle || 'Alege abonamentul potrivit pentru tine si incepe-ti calatoria spre un stil de viata sanatos.'}
        backgroundImage={settings?.heroBackground && typeof settings.heroBackground === 'object' ? settings.heroBackground.url : null}
      />

      {/* Filter Navigation */}
      {showFilters && (
        <div className="container mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                defaultFilter === 'all'
                  ? 'bg-theme-primary text-white'
                  : 'bg-theme-surface text-theme-dark hover:bg-theme-primary/10'
              }`}
            >
              Toate
            </a>
            {sectionOrder.map((type) => {
              const items = grouped[type]
              if (!items || items.length === 0) return null
              return (
                <a
                  key={type}
                  href={`#section-${type}`}
                  className={`px-5 py-2 rounded-full font-medium transition-colors ${
                    defaultFilter === type
                      ? 'bg-theme-primary text-white'
                      : 'bg-theme-surface text-theme-dark hover:bg-theme-primary/10'
                  }`}
                >
                  {typeLabels[type] || type}
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="container mt-12">
        {sectionOrder.map((type) => {
          const items = grouped[type]
          if (!items || items.length === 0) return null

          return (
            <section
              key={type}
              id={`section-${type}`}
              className="abonamente-section mb-16"
            >
              {/* Section Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-theme-dark inline-block">
                  {typeLabels[type] || type}
                </h2>
                {typeDescriptions[type] && (
                  <p className="text-theme-text mt-2">{typeDescriptions[type]}</p>
                )}
              </div>

              {/* Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridCols()} gap-6`}>
                {items.map((item, index) => {
                  const cardProps = abonamenteToCardProps(item, {
                    cardType: adminCardType,
                    imagePosition: type === 'gym' ? 'background' : 'top',
                  })
                  return (
                    <UniversalCard
                      key={item.id}
                      {...cardProps}
                      index={index}
                    />
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* No subscriptions message */}
        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-theme-text">
              Nu există abonamente disponibile momentan.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-theme-surface mt-16 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-theme-dark mb-4">
            Ai întrebări despre abonamente?
          </h2>
          <p className="text-theme-text mb-8 max-w-xl mx-auto">
            Echipa noastră îți stă la dispoziție pentru orice informații suplimentare.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-theme-primary text-white px-8 py-4 rounded font-medium hover:bg-theme-primary-hover transition-colors"
          >
            Contactează-ne
          </Link>
        </div>
      </div>
    </div>
  )
}
