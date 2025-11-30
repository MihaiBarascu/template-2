'use client'

import { useState } from 'react'
import type { Clase as ClassType } from '@/payload-types'
import { UniversalCard, type CardType } from '@/components/UniversalCard'
import { claseToCardProps } from '@/utilities/cardAdapters'

interface ClassesFilterProps {
  classes: ClassType[]
  columns?: string
  cardType?: CardType
}

const categoryLabels: Record<string, string> = {
  cardio: 'Cardio',
  strength: 'Forță',
  flexibility: 'Flexibilitate',
  'mind-body': 'Mind & Body',
  combat: 'Combat',
  dance: 'Dans',
}

export function ClassesFilter({ classes, columns = '3', cardType = 'class' }: ClassesFilterProps) {
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
            {filteredClasses.map((classItem, index) => {
              const cardProps = claseToCardProps(classItem, {
                cardType,
                showDifficulty: true,
                showScheduleCount: true,
              })
              return (
                <UniversalCard
                  key={classItem.id}
                  {...cardProps}
                  index={index}
                />
              )
            })}
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
