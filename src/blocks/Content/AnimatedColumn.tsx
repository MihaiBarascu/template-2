'use client'

import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface AnimatedColumnProps {
  children: React.ReactNode
  index: number
  className?: string
}

export const AnimatedColumn: React.FC<AnimatedColumnProps> = ({
  children,
  index,
  className = '',
}) => {
  const { ref, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  )
}
