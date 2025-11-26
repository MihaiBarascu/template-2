'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('', className)}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="theme-nav" />
      })}
    </nav>
  )
}
