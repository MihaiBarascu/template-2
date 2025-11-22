'use client'

import type { Media, TeamMember } from '@/payload-types'
import { animationDelays, fadeInUp } from '@/utilities/animations'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Social Media Icons as SVG components
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

interface TeamPreviewProps {
  title?: string
  description?: string
  teamMembers?: (string | TeamMember)[]
  showSocialLinks?: boolean
  designTheme?: 'default' | 'transilvania'
}

export const TeamPreview: React.FC<TeamPreviewProps> = ({
  title = 'Hello, we are Gymso',
  description,
  teamMembers,
  showSocialLinks = true,
  designTheme = 'default',
}) => {
  if (!teamMembers || teamMembers.length === 0) {
    return null
  }

  // Filter out string IDs and only keep full team member objects
  const memberObjects = teamMembers.filter(
    (member): member is TeamMember => typeof member !== 'string' && member !== null,
  )

  // Transilvania theme - matching Gymso template exactly
  if (designTheme === 'transilvania') {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left side - Text content */}
            <div className="lg:w-1/3">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={animationDelays.fast}
                className="text-4xl lg:text-5xl font-bold text-transilvania-dark mb-6"
              >
                {title}
              </motion.h2>
              {description && (
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={animationDelays.medium}
                  className="text-transilvania-text text-base leading-relaxed mb-4"
                >
                  {description}
                </motion.p>
              )}
              {/* <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={animationDelays.medium + 0.1}
                className="text-transilvania-gray text-sm"
              >
                 <strong className="text-transilvania-dark">Gymso Fitness</strong>{' '}
                 <span className="text-transilvania-primary font-semibold">contact Tooplate</span>{' '}
                
              </motion.p> */}
            </div>

            {/* Right side - Team members in horizontal layout */}
            <div className="lg:w-2/3">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {memberObjects.slice(0, 2).map((member, index) => {
                  const image = member.featuredImage as Media | null

                  return (
                    <motion.div
                      key={member.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInUp}
                      custom={animationDelays.medium + index * 0.1}
                      className="w-full sm:w-[280px]"
                    >
                      <Link href={`/team-members/${member.slug}`} className="group block">
                        <div className="relative overflow-hidden rounded-lg mb-4">
                          <div className="relative h-[320px]">
                            {image ? (
                              <Image
                                src={image.url || ''}
                                alt={image.alt || member.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}

                            {/* Always visible social links at bottom right */}
                            {showSocialLinks && (
                              <div className="absolute bottom-4 right-4 flex gap-2">
                                {member.socialMedia?.twitter && (
                                  <a
                                    href={member.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-transilvania-gray hover:bg-transilvania-primary hover:text-white transition-all duration-300"
                                  >
                                    <TwitterIcon />
                                  </a>
                                )}
                                {member.socialMedia?.instagram && (
                                  <a
                                    href={member.socialMedia.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-transilvania-gray hover:bg-transilvania-primary hover:text-white transition-all duration-300"
                                  >
                                    <InstagramIcon />
                                  </a>
                                )}
                                {member.socialMedia?.facebook && (
                                  <a
                                    href={member.socialMedia.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-transilvania-gray hover:bg-transilvania-primary hover:text-white transition-all duration-300"
                                  >
                                    <FacebookIcon />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-transilvania-dark mb-1 group-hover:text-transilvania-primary transition-colors">
                            {member.title}
                          </h3>
                          <p className="text-transilvania-gray text-sm">
                            {member.role || 'Fitness Trainer'}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default theme - original grid layout
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={animationDelays.fast}
            className="text-4xl lg:text-5xl font-bold text-transilvania-dark mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={animationDelays.medium}
              className="text-transilvania-text text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memberObjects.map((member, index) => {
            const image = member.featuredImage as Media | null

            return (
              <motion.div
                key={member.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={animationDelays.medium + index * 0.1}
              >
                <Link href={`/team-members/${member.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="relative h-[400px]">
                      {image ? (
                        <Image
                          src={image.url || ''}
                          alt={image.alt || member.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}

                      {/* Hover Overlay with Social Links */}
                      {showSocialLinks && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-6 w-full">
                            <div className="flex gap-3 justify-center">
                              {member.socialMedia?.twitter && (
                                <a
                                  href={member.socialMedia.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-transilvania-primary transition-colors"
                                >
                                  <TwitterIcon />
                                </a>
                              )}
                              {member.socialMedia?.instagram && (
                                <a
                                  href={member.socialMedia.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-transilvania-primary transition-colors"
                                >
                                  <InstagramIcon />
                                </a>
                              )}
                              {member.socialMedia?.facebook && (
                                <a
                                  href={member.socialMedia.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-transilvania-primary transition-colors"
                                >
                                  <FacebookIcon />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-transilvania-dark mb-1 group-hover:text-transilvania-primary transition-colors">
                      {member.title}
                    </h3>
                    <p className="text-transilvania-gray text-sm">
                      {member.role || 'Fitness Trainer'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
