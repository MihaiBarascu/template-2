import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

// Icon Components
const Icons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  location: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  heart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  user: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
}

const getIcon = (iconName: string) => {
  return Icons[iconName as keyof typeof Icons] || null
}

const SocialMediaIcons = ({
  socialMedia,
  className = '',
}: {
  socialMedia: Footer['socialMedia']
  className?: string
}) => {
  if (!socialMedia) return null

  const socialLinks = [
    { name: 'facebook', url: socialMedia.facebook || '', icon: Icons.facebook },
    { name: 'instagram', url: socialMedia.instagram || '', icon: Icons.instagram },
    { name: 'tiktok', url: socialMedia.tiktok || '', icon: Icons.tiktok },
    { name: 'youtube', url: socialMedia.youtube || '', icon: Icons.youtube },
    { name: 'whatsapp', url: socialMedia.whatsapp || '', icon: Icons.whatsapp },
    { name: 'linkedin', url: socialMedia.linkedin || '', icon: Icons.linkedin },
    { name: 'twitter', url: socialMedia.twitter || '', icon: Icons.twitter },
  ].filter((link) => link.url)

  if (socialLinks.length === 0) return null

  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-muted hover:text-theme-primary transition-colors duration-300"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const { companyInfo, columns, socialMedia, bottomBar } = footerData || {}

  return (
    <footer className="bg-gradient-to-b from-theme-dark to-black text-theme-light">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info Section */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <div className="mb-6">
                {companyInfo?.logoType === 'text' && companyInfo.logoText && (
                  <Link href="/" className="inline-block">
                    <span className="text-3xl font-bold text-white hover:text-theme-primary transition-colors">
                      {companyInfo.logoText}
                    </span>
                  </Link>
                )}
                {companyInfo?.logoType === 'image' && companyInfo.logoImage && (
                  <Link href="/" className="inline-block">
                    <Image
                      src={(companyInfo.logoImage as Media).url!}
                      alt={(companyInfo.logoImage as Media).alt || 'Logo'}
                      width={150}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </Link>
                )}
                {companyInfo?.logoType === 'both' && (
                  <Link href="/" className="inline-block">
                    <div className="flex items-center gap-3">
                      {companyInfo.logoImage && (
                        <Image
                          src={(companyInfo.logoImage as Media).url!}
                          alt={(companyInfo.logoImage as Media).alt || 'Logo'}
                          width={40}
                          height={40}
                          className="h-10 w-10"
                        />
                      )}
                      {companyInfo.logoText && (
                        <span className="text-2xl font-bold bg-gradient-to-r from-theme-primary to-red-400 bg-clip-text text-transparent">
                          {companyInfo.logoText}
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </div>

              {/* Description */}
              {companyInfo?.description && (
                <p className="text-theme-muted mb-6 leading-relaxed">{companyInfo.description}</p>
              )}

              {/* Social Media Icons */}
              {companyInfo?.showSocialHere && socialMedia && (
                <SocialMediaIcons socialMedia={socialMedia} />
              )}
            </div>

            {/* Dynamic Columns */}
            {columns &&
              columns.map((column, index) => (
                <div key={index} className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>

                  {/* Links Content */}
                  {column.contentType === 'links' && column.links && (
                    <ul className="space-y-3">
                      {column.links.map((item, i) => (
                        <li key={i}>
                          <CMSLink
                            {...item.link}
                            className="text-theme-muted hover:text-theme-primary transition-colors duration-300 hover:translate-x-1 transition-transform inline-block"
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Text Items */}
                  {column.contentType === 'text' && column.textItems && (
                    <ul className="space-y-3">
                      {column.textItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-theme-muted">
                          {item.icon && item.icon !== 'none' && (
                            <span className="text-theme-primary mt-1">
                              {getIcon(item.icon)}
                            </span>
                          )}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact Items */}
                  {column.contentType === 'contact' && column.contactItems && (
                    <ul className="space-y-3">
                      {column.contactItems.map((item, i) => {
                        const icon = getIcon(item.type)
                        return (
                          <li key={i} className="flex items-start gap-2 text-theme-muted">
                            <span className="text-theme-primary mt-1">{icon}</span>
                            <div>
                              {item.label && (
                                <span className="text-xs text-theme-text block">{item.label}</span>
                              )}
                              {item.type === 'email' ? (
                                <a
                                  href={`mailto:${item.value}`}
                                  className="hover:text-theme-primary transition-colors"
                                >
                                  {item.value}
                                </a>
                              ) : item.type === 'phone' || item.type === 'whatsapp' ? (
                                <a
                                  href={`tel:${item.value}`}
                                  className="hover:text-theme-primary transition-colors"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <span>{item.value}</span>
                              )}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  {/* Schedule Items */}
                  {column.contentType === 'schedule' && column.scheduleItems && (
                    <ul className="space-y-3">
                      {column.scheduleItems.map((item, i) => (
                        <li key={i} className="flex justify-between text-theme-muted">
                          <span className="font-medium">{item.label}</span>
                          <span>{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Custom Content */}
                  {column.contentType === 'custom' && column.customContent && (
                    <div className="text-theme-muted prose prose-sm prose-invert">
                      <RichText data={column.customContent} enableGutter={false} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-dark/50">
          <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-theme-text text-sm">
              {bottomBar?.copyright || `© ${new Date().getFullYear()} All rights reserved.`}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {bottomBar?.legalLinks && bottomBar.legalLinks.length > 0 && (
                <nav className="flex gap-4">
                  {bottomBar.legalLinks.map((item, i) => (
                    <React.Fragment key={i}>
                      <CMSLink
                        {...item.link}
                        className="text-theme-text hover:text-theme-primary text-sm transition-colors duration-300"
                      />
                      {bottomBar.legalLinks && i < bottomBar.legalLinks.length - 1 && (
                        <span className="text-theme-muted">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}

              {/* Compliance Logos */}
              {bottomBar?.complianceLogos && bottomBar.complianceLogos.length > 0 && (
                <div className="flex items-center gap-4 ml-4">
                  {bottomBar.complianceLogos.map((logo, i) => {
                    const LogoImage = (
                      <Image
                        src={(logo.logo as Media).url!}
                        alt={logo.altText}
                        width={logo.width || 100}
                        height={50}
                        className="h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                        style={{ width: `${logo.width || 100}px` }}
                      />
                    )

                    return logo.link ? (
                      <a
                        key={i}
                        href={logo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        {LogoImage}
                      </a>
                    ) : (
                      <div key={i} className="opacity-70">
                        {LogoImage}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
