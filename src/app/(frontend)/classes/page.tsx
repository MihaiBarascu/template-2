import type { Metadata } from 'next'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Class as ClassType, TeamMember } from '@/payload-types'
import { Clock, Users, Award, Calendar } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Clase | Transilvania Fitness',
  description: 'Descoperă clasele noastre de fitness pentru toate nivelurile',
}

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page = '1', category } = await searchParams
  const currentPage = parseInt(page)

  const payload = await getPayload({ config: configPromise })

  const where: Where = { active: { equals: true } }
  if (category) {
    where.category = { equals: category }
  }

  const classes = await payload.find({
    collection: 'classes',
    depth: 2,
    limit: 12,
    page: currentPage,
    where,
    sort: 'title',
  })

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-transilvania-dark to-black text-white py-20 md:py-32">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Clasele Noastre
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Alege din varietatea noastră de clase pentru a-ți atinge obiectivele de fitness
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mt-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/classes"
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              !category
                ? 'bg-transilvania-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toate
          </Link>
          {['cardio', 'strength', 'flexibility', 'mind-body', 'combat', 'dance'].map(
            (cat) => (
              <Link
                key={cat}
                href={`/classes?category=${cat}`}
                className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
                  category === cat
                    ? 'bg-transilvania-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'mind-body' ? 'Mind & Body' : cat}
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="container mt-12">
        {classes.docs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {classes.docs.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem as ClassType} />
              ))}
            </div>

            {/* Pagination */}
            {classes.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  page={classes.page || 1}
                  totalPages={classes.totalPages}
                />
                <div className="text-center mt-4">
                  <PageRange
                    totalDocs={classes.totalDocs || 0}
                    limit={12}
                    currentPage={currentPage}
                    collectionLabels={{
                      plural: 'clase',
                      singular: 'clasă',
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-transilvania-text">
              Nu există clase disponibile momentan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Class Card Component
function ClassCard({ classItem }: { classItem: ClassType }) {
  const trainer = classItem.trainer as TeamMember | null
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
    'all-levels': 'bg-blue-100 text-blue-700',
  }

  const categoryIcons = {
    cardio: '🏃',
    strength: '💪',
    flexibility: '🧘',
    'mind-body': '🧠',
    combat: '🥊',
    dance: '💃',
  }

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <Link href={`/classes/${classItem.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gray-100">
          {classItem.featuredImage && typeof classItem.featuredImage === 'object' ? (
            <Image
              src={classItem.featuredImage.url || ''}
              alt={classItem.featuredImage.alt || classItem.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-transilvania-primary/20 to-transilvania-dark/20
                          flex items-center justify-center">
              <span className="text-6xl">
                {categoryIcons[classItem.category as keyof typeof categoryIcons] || '🏋️'}
              </span>
            </div>
          )}

          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficultyColors[classItem.difficulty as keyof typeof difficultyColors]
              }`}
            >
              {classItem.difficulty === 'all-levels'
                ? 'Toate nivelurile'
                : classItem.difficulty === 'beginner'
                ? 'Începător'
                : classItem.difficulty === 'intermediate'
                ? 'Intermediar'
                : 'Avansat'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-transilvania-dark mb-2
                       group-hover:text-transilvania-primary transition-colors">
            {classItem.title}
          </h3>

          {classItem.description && (
            <p className="text-sm text-transilvania-text mb-4 line-clamp-2">
              {classItem.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {classItem.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{classItem.duration} min</span>
              </div>
            )}

            {classItem.capacity && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Max {classItem.capacity}</span>
              </div>
            )}

            {trainer && (
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{trainer.title}</span>
              </div>
            )}
          </div>

          {/* Schedule Preview */}
          {classItem.schedule && classItem.schedule.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-transilvania-primary">
                <Calendar className="w-4 h-4" />
                <span>
                  {classItem.schedule.length === 1
                    ? `${translateDay(classItem.schedule[0].day)} la ${classItem.schedule[0].time}`
                    : `${classItem.schedule.length} zile pe săptămână`}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

function translateDay(day: string): string {
  const days: { [key: string]: string } = {
    monday: 'Luni',
    tuesday: 'Marți',
    wednesday: 'Miercuri',
    thursday: 'Joi',
    friday: 'Vineri',
    saturday: 'Sâmbătă',
    sunday: 'Duminică',
  }
  return days[day] || day
}