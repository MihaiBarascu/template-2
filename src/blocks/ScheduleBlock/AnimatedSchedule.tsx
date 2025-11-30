'use client'

import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface AnimatedScheduleProps {
  children: React.ReactNode
  title: string
}

export const AnimatedSchedule: React.FC<AnimatedScheduleProps> = ({ children, title }) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })

  return (
    <>
      {/* Animated Title */}
      <div
        ref={titleRef}
        className={cn(
          'text-center mb-10',
          'transition-all duration-700 ease-out',
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6',
        )}
      >
        <h2 className="text-white text-3xl md:text-4xl font-bold">{title}</h2>
      </div>

      {/* Animated Table Container */}
      <div
        ref={tableRef}
        className={cn(
          'overflow-x-auto',
          'transition-all duration-700 ease-out',
          tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}
        style={{ transitionDelay: '200ms' }}
      >
        {children}
      </div>
    </>
  )
}
