'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Class, Media } from '@/payload-types'
import { fadeInUp, animationDelays } from '@/utilities/animations'

interface ClassesPreviewProps {
  preTitle?: string
  title?: string
  classes?: (string | Class)[]
  showPrice?: boolean
}

export const ClassesPreview: React.FC<ClassesPreviewProps> = ({
  preTitle = 'Get A Perfect Body',
  title = 'Our Training Classes',
  classes,
  showPrice = true,
}) => {
  if (!classes || classes.length === 0) {
    return null
  }

  // Filter out string IDs and only keep full class objects
  const classObjects = classes.filter(
    (cls): cls is Class => typeof cls !== 'string' && cls !== null
  )

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {preTitle && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={animationDelays.fast}
              className="text-transilvania-gray text-sm uppercase tracking-wider mb-3"
            >
              {preTitle}
            </motion.p>
          )}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={animationDelays.medium}
            className="text-4xl lg:text-5xl font-bold text-transilvania-dark"
          >
            {title}
          </motion.h2>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classObjects.map((classItem, index) => {
            const image = classItem.featuredImage as Media | null
            const trainer = typeof classItem.trainer === 'object'
              ? classItem.trainer?.title
              : null

            return (
              <motion.div
                key={classItem.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={animationDelays.medium + (index * 0.1)}
              >
                <Link
                  href={`/classes/${classItem.slug}`}
                  className="group block relative overflow-hidden rounded-lg"
                >
                  <div className="relative h-[350px] overflow-hidden">
                    {image ? (
                      <Image
                        src={image.url || ''}
                        alt={image.alt || classItem.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Price Badge */}
                    {showPrice && classItem.price?.dropIn && (
                      <div className="absolute top-4 right-4 bg-transilvania-primary text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold">
                        <span className="text-xs">RON</span>
                        <span className="text-lg">{classItem.price.dropIn}</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]">
                        {classItem.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        Antrenat de • {trainer || 'Antrenor'}
                      </p>
                      {classItem.description && (
                        <p className="mt-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-90 line-clamp-2">
                          {classItem.description}
                        </p>
                      )}
                    </div>
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