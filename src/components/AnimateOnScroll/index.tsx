'use client'

import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in'
  delay?: number // delay in ms
  duration?: number // duration in ms
  rootMargin?: string // how early to trigger (e.g., '-100px' = 100px before entering viewport)
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
  duration = 500,
  rootMargin = '0px 0px -80px 0px',
}) => {
  const { ref, isVisible } = useScrollAnimation({ rootMargin })

  const animationStyles: Record<string, { initial: string; visible: string }> = {
    'fade-in-up': {
      initial: 'opacity-0 translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-in': {
      initial: 'opacity-0',
      visible: 'opacity-100',
    },
    'slide-in-left': {
      initial: 'opacity-0 -translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'slide-in-right': {
      initial: 'opacity-0 translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'scale-in': {
      initial: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100',
    },
  }

  const style = animationStyles[animation] || animationStyles['fade-in-up']

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isVisible ? style.visible : style.initial,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default AnimateOnScroll
