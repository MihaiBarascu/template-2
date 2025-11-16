import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ServiceArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const serviceCrossfit: (args: ServiceArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'areobic-crossfit',
    _status: 'published',
    postType: 'service',
    serviceDetails: {
      price: '$66/month',
      duration: '75 min',
      schedule: 'Mon-Fri 6:00AM',
      trainer: 'Mary',
    },
    authors: [author],
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'High-intensity training that builds strength, endurance, and burns calories fast.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Our Aerobic & CrossFit program combines cardiovascular conditioning with functional strength movements to deliver maximum results. Led by our experienced trainer Mary, these intensive 75-minute sessions will challenge your limits while building real-world fitness that translates to everyday activities.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Functional Fitness Training',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'CrossFit methodology focuses on constantly varied, high-intensity functional movements. Our workouts incorporate elements from weightlifting, gymnastics, and cardio to build comprehensive fitness. Each workout is scalable to individual fitness levels, ensuring everyone can participate safely while being challenged appropriately.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: '',
              blockType: 'mediaBlock',
              media: blockImage.id,
            },
            format: '',
            version: 2,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Training Structure',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Each session begins with a dynamic warm-up to prepare your body for intense exercise. The main workout varies daily but typically includes strength training, metabolic conditioning, and skill development. We finish with targeted stretching and mobility work to aid recovery. Our early morning schedule is perfect for starting your day with energy and focus.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: 'High Intensity Results',
              blockType: 'banner',
              content: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 1,
                          mode: 'normal',
                          style: '',
                          text: 'Ready to push your limits?',
                          version: 1,
                        },
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: ' Join our CrossFit community and discover what your body is truly capable of. Every workout is an opportunity to get stronger, faster, and more confident.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              style: 'info',
            },
            format: '',
            version: 2,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    heroImage: heroImage.id,
    meta: {
      description:
        'High-intensity aerobic and CrossFit training that builds strength, endurance, and burns calories fast. Expert coaching and scalable workouts for all levels.',
      image: heroImage.id,
      title: 'Aerobic & CrossFit - High-Intensity Functional Fitness',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Areobic & Crossfit',
  }
}