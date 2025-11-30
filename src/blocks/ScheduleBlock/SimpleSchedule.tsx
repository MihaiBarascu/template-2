'use client'
import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface SimpleHour {
  days?: string | null
  hours?: string | null
}

interface SimpleScheduleProps {
  title: string
  hours: SimpleHour[]
  style?: 'default' | 'compact' | 'card' | null
  spacingClass?: string
}

export const SimpleSchedule: React.FC<SimpleScheduleProps> = ({
  title,
  hours,
  style = 'default',
  spacingClass = '',
}) => {
  const { ref, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })

  // Card style
  if (style === 'card') {
    return (
      <div
        ref={ref}
        className={cn(
          `bg-white rounded-lg shadow-lg p-6 ${spacingClass}`,
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}
      >
        <h3 className="text-xl font-bold text-theme-dark mb-4">{title}</h3>
        <div className="space-y-2">
          {hours.map((item, index) => (
            <div key={index} className="flex justify-between text-[15px]">
              <span className="font-medium text-theme-dark">{item.days}</span>
              <span className="text-theme-text">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Compact style (for sidebar)
  if (style === 'compact') {
    return (
      <div
        ref={ref}
        className={cn(
          spacingClass,
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}
      >
        <h4 className="text-lg font-bold text-theme-dark mb-3">{title}</h4>
        <div className="space-y-1 text-sm">
          {hours.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-theme-text">{item.days}</span>
              <span className="font-medium text-theme-dark">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default style (like working hours in CTA)
  return (
    <section className={`py-12 ${spacingClass}`}>
      <div className="container">
        <div
          ref={ref}
          className={cn(
            'max-w-lg mx-auto',
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-theme-dark mb-6 text-center">
            {title}
          </h2>
          <div className="space-y-3">
            {hours.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex justify-between items-center py-2 border-b border-gray-200 last:border-0',
                  'transition-all duration-500 ease-out',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-theme-dark text-lg">{item.days}</span>
                <span className="text-theme-primary font-bold text-lg">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
