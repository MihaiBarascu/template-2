'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Clase as ClassType, TeamMember } from '@/payload-types'
import { Clock, Users, Award, Calendar } from 'lucide-react'
import { getCollectionUrl } from '@/utilities/getCollectionUrl'

interface ClassesFilterProps {
  classes: ClassType[]
  columns?: string
}

const categoryLabels: Record<string, string> = {
  cardio: 'Cardio',
  strength: 'Forță',
  flexibility: 'Flexibilitate',
  'mind-body': 'Mind & Body',
  combat: 'Combat',
  dance: 'Dans',
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
  'all-levels': 'bg-blue-100 text-blue-700',
}

const difficultyLabels: Record<string, string> = {
  beginner: 'Începător',
  intermediate: 'Intermediar',
  advanced: 'Avansat',
  'all-levels': 'Toate nivelurile',
}

const categoryIcons: Record<string, string> = {
  cardio: '🏃',
  strength: '💪',
  flexibility: '🧘',
  'mind-body': '🧠',
  combat: '🥊',
  dance: '💃',
}

function translateDay(day: string): string {
  const days: Record<string, string> = {
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

export function ClassesFilter({ classes, columns = '3' }: ClassesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Get unique categories from classes
  const availableCategories = [...new Set(classes.map((c) => c.category).filter(Boolean))]

  // Filter classes based on active filter
  const filteredClasses =
    activeFilter === 'all'
      ? classes
      : classes.filter((c) => c.category === activeFilter)

  // Get grid columns class
  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'lg:grid-cols-2'
      case '4':
        return 'lg:grid-cols-4'
      default:
        return 'lg:grid-cols-3'
    }
  }

  return (
    <>
      {/* Category Filter */}
      <div className="container mt-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-theme-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toate
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat!)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-theme-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[cat!] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="container mt-12">
        {filteredClasses.length > 0 ? (
          <div className={`grid md:grid-cols-2 ${getGridCols()} gap-6`}>
            {filteredClasses.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-theme-text">
              Nu există clase în această categorie.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-theme-primary hover:underline"
            >
              Vezi toate clasele
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Class Card Component
function ClassCard({ classItem }: { classItem: ClassType }) {
  const trainer = classItem.trainer as TeamMember | null

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <Link href={getCollectionUrl('clase', classItem.slug)} className="block">
        <div className="relative aspect-[4/3] bg-gray-100">
          {classItem.featuredImage && typeof classItem.featuredImage === 'object' ? (
            <Image
              src={classItem.featuredImage.url || ''}
              alt={classItem.featuredImage.alt || classItem.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-theme-primary/20 to-theme-dark/20 flex items-center justify-center">
              <span className="text-6xl">
                {categoryIcons[classItem.category as string] || '🏋️'}
              </span>
            </div>
          )}

          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficultyColors[classItem.difficulty as string] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {difficultyLabels[classItem.difficulty as string] || classItem.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-theme-dark mb-2 group-hover:text-theme-primary transition-colors">
            {classItem.title}
          </h3>

          {classItem.description && (
            <p className="text-sm text-theme-text mb-4 line-clamp-2">
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
              <div className="flex items-center gap-2 text-sm text-theme-primary">
                <Calendar className="w-4 h-4" />
                <span>
                  {classItem.schedule.length === 1
                    ? `${translateDay(classItem.schedule[0].day!)} la ${classItem.schedule[0].time}`
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
