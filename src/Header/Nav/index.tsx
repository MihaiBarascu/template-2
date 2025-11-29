'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import type { Header as HeaderType, BusinessInfo } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { socialIconPaths, getSocialUrl } from '@/components/SocialIcons/constants'

interface HeaderNavProps {
  data: HeaderType
  businessInfo: BusinessInfo
  className?: string
  isMobile?: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  businessInfo,
  className,
  isMobile = false,
}) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  const toggleDropdown = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdown(openDropdown === index ? null : index)
  }

  return (
    <nav className={cn('', className)}>
      {navItems.map((item, i) => {
        // Social Media Icons
        if (item.itemType === 'socialMedia') {
          const platforms = item.socialPlatforms || []
          return (
            <div key={i} className="flex items-center space-x-4">
              {platforms.map((platform) => {
                const url = getSocialUrl(platform, businessInfo)
                if (!url) return null
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-theme-primary transition-colors"
                    aria-label={platform}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={socialIconPaths[platform]} />
                    </svg>
                  </a>
                )
              })}
            </div>
          )
        }

        // Dropdown Menu (Link with Sub-Items)
        if (item.itemType === 'linkWithSubItems') {
          const subItems = item.subItems || []
          const parentLink = item.parentLink
          const isOpen = openDropdown === i

          // Check if parent has a valid link destination
          const hasParentUrl =
            parentLink &&
            ((parentLink.type === 'custom' && parentLink.url) ||
              (parentLink.type === 'reference' && parentLink.reference))

          if (isMobile) {
            // Mobile: Parent (link or button) + expandable sub-items
            return (
              <div key={i} className="w-full">
                <div className="flex items-center justify-between">
                  {hasParentUrl ? (
                    // Has URL - render as link
                    <CMSLink
                      {...parentLink}
                      className="text-white hover:text-theme-primary transition-colors py-2 flex-1"
                    />
                  ) : (
                    // No URL - render as button that toggles dropdown
                    <button
                      onClick={(e) => toggleDropdown(i, e)}
                      className="text-white hover:text-theme-primary transition-colors py-2 flex-1 text-left"
                    >
                      {parentLink?.label || 'Menu'}
                    </button>
                  )}
                  <button
                    onClick={(e) => toggleDropdown(i, e)}
                    className="p-2 text-white hover:text-theme-primary"
                    aria-label="Toggle submenu"
                  >
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                </div>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className="pl-4 space-y-2 pb-2">
                    {subItems.map((subItem, j) => (
                      <CMSLink
                        key={j}
                        {...subItem.link}
                        className="block text-gray-300 hover:text-theme-primary transition-colors py-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          // Desktop: Hover dropdown
          return (
            <div key={i} className="relative group">
              {hasParentUrl ? (
                // Has URL - render as clickable link
                <CMSLink
                  {...parentLink}
                  className="flex items-center gap-1 text-white hover:text-theme-primary transition-colors px-4 py-2"
                >
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </CMSLink>
              ) : (
                // No URL - just shows label, dropdown on hover
                <span className="flex items-center gap-1 text-white hover:text-theme-primary transition-colors px-4 py-2 cursor-default">
                  {parentLink?.label || 'Menu'}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </span>
              )}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-theme-dark border border-gray-700 rounded-lg shadow-xl min-w-48 py-2">
                  {subItems.map((subItem, j) => (
                    <CMSLink
                      key={j}
                      {...subItem.link}
                      className="block px-4 py-2 text-white hover:text-theme-primary hover:bg-gray-800 transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        }

        // Default: Navigation Link
        return <CMSLink key={i} {...item.link} appearance="theme-nav" />
      })}
    </nav>
  )
}
