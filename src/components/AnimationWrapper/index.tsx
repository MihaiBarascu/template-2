'use client'

import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utilities/ui'

interface AnimationWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn'
}

const animationStyles: Record<string, { initial: string; visible: string }> = {
  fadeInUp: {
    initial: 'opacity-0 translate-y-6',
    visible: 'opacity-100 translate-y-0',
  },
  fadeIn: {
    initial: 'opacity-0',
    visible: 'opacity-100',
  },
  scaleIn: {
    initial: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  delay = 0,
  className = '',
  animation = 'fadeInUp',
}) => {
  const { ref, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
  const style = animationStyles[animation] || animationStyles.fadeInUp

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'transition-all duration-700 ease-out',
        isVisible ? style.visible : style.initial,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default AnimationWrapper
