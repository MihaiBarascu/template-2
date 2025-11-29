'use client'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Logo, Media, BusinessInfo } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  logo: Logo
  businessInfo: BusinessInfo
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, businessInfo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Get logo option1 (for dark backgrounds)
  const logoOption = logo?.option1
  const logoImage = logoOption?.image as Media | undefined

  // Render logo based on type
  const renderLogo = () => {
    if (!logoOption) {
      // Fallback if no logo configured
      return (
        <span className="text-3xl font-bold text-white hover:text-theme-primary transition-colors">
          Logo
        </span>
      )
    }

    if (logoOption.type === 'image' && logoImage?.url) {
      return (
        <Image
          src={logoImage.url}
          alt={logoImage.alt || 'Logo'}
          width={150}
          height={48}
          className="h-12 w-auto"
          priority
        />
      )
    }

    // Default to text logo
    return (
      <span className="text-3xl font-bold text-white hover:text-theme-primary transition-colors">
        {logoOption.text || 'Logo'}
      </span>
    )
  }

  return (
    <header className="relative z-20 bg-theme-dark">
      <div className="container mx-auto max-w-6.5xl">
        <nav className="flex items-center justify-between h-20 px-4">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            {renderLogo()}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <HeaderNav data={data} businessInfo={businessInfo} className="flex items-center space-x-2" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-theme-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
          }`}
        >
          <HeaderNav
            data={data}
            businessInfo={businessInfo}
            className="flex flex-col space-y-2 pt-4 px-4"
            isMobile
          />
        </div>
      </div>
    </header>
  )
}
