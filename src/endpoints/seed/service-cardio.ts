import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ServiceArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const serviceCardio: (args: ServiceArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'cardio-training',
    _status: 'published',
    postType: 'service',
    serviceDetails: {
      price: '$45/month',
      duration: '50 min',
      schedule: 'Mon-Fri 8:00AM',
      trainer: 'Olivia',
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
                text: 'Boost your cardiovascular health and endurance with our dynamic cardio training program.',
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
                text: 'Our cardio training program is designed to improve your heart health, increase stamina, and burn calories effectively. Led by our energetic trainer Olivia, these 50-minute sessions combine various cardio exercises including HIIT, circuit training, and endurance workouts to keep your routine engaging and effective.',
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
                text: 'Cardiovascular Health Benefits',
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
                text: 'Regular cardiovascular exercise strengthens your heart muscle, improves blood circulation, and lowers blood pressure. Our training sessions also boost your metabolism, helping with weight management and increasing your energy levels throughout the day. You\'ll notice improved endurance in daily activities and better sleep quality.',
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
                text: 'Training Variety',
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
                text: 'Our cardio sessions feature a diverse mix of exercises to prevent boredom and plateaus. From high-intensity interval training (HIIT) and circuit workouts to steady-state cardio and dance-inspired movements, every session brings something new. We use various equipment including treadmills, bikes, rowing machines, and bodyweight exercises to keep your workouts challenging and fun.',
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
                text: 'Perfect for All Fitness Levels',
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
                text: 'Whether you\'re just starting your fitness journey or looking to improve your existing cardio conditioning, our program adapts to your needs. Olivia provides modifications for every exercise, ensuring you can work at your own pace while still being challenged. The morning schedule helps you start your day with increased energy and mental clarity.',
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
              blockName: 'Heart Health Priority',
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
                          text: 'Invest in your heart health today.',
                          version: 1,
                        },
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: ' Join our cardio training program and experience increased energy, improved endurance, and better overall health. Your future self will thank you.',
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
              style: 'success',
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
        'Boost your cardiovascular health and endurance with our dynamic cardio training program. Improve heart health, stamina, and burn calories effectively.',
      image: heroImage.id,
      title: 'Cardio Training - Heart Health & Endurance Building',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Cardio Training',
  }
}