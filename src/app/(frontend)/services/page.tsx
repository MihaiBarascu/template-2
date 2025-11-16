import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      postType: {
        equals: 'service',
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      postType: true,
      serviceDetails: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="gymso-h1">Our Classes</h1>
        </div>
      </div>

      <CollectionArchive posts={services.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Services - Gymso Fitness',
    description: 'Explore our fitness classes and training services',
  }
}