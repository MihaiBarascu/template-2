import type { Metadata } from 'next'
import { StaticPageHero } from '@/components/StaticPageHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Clase as ClassType, PaginiClase } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ClassesFilter } from './ClassesFilter'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getCachedGlobal('pagini-clase', 1)()) as PaginiClase

  return {
    title: settings?.meta?.title || 'Clase | Transilvania Fitness',
    description: settings?.meta?.description || 'Descopera clasele noastre de fitness pentru toate nivelurile',
    openGraph: settings?.meta?.image && typeof settings.meta.image === 'object' ? {
      images: [{ url: settings.meta.image.url || '' }],
    } : undefined,
  }
}

export default async function ClassesPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = (await getCachedGlobal('pagini-clase', 1)()) as PaginiClase

  // Fetch all active classes (client-side filtering)
  const classes = await payload.find({
    collection: 'clase',
    depth: 2,
    limit: 100,
    where: { active: { equals: true } },
    sort: 'title',
  })

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <StaticPageHero
        title={settings?.heroTitle || 'Clasele Noastre'}
        description={settings?.heroSubtitle || 'Alege din varietatea noastra de clase pentru a-ti atinge obiectivele de fitness'}
        backgroundImage={settings?.heroBackground && typeof settings.heroBackground === 'object' ? settings.heroBackground.url : null}
      />

      {/* Client-side Filter + Grid */}
      <ClassesFilter
        classes={classes.docs as ClassType[]}
        columns={settings?.columns || '3'}
      />
    </div>
  )
}
