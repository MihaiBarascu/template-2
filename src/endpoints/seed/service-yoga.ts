import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ServiceArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const serviceYoga: (args: ServiceArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'yoga-training',
    _status: 'published',
    postType: 'service',
    serviceDetails: {
      price: '$50/month',
      duration: '60 min',
      schedule: 'Mon-Fri 7:30AM',
      trainer: 'Bella',
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
                text: 'Transform your body and mind with our comprehensive yoga training program.',
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
                text: 'Our yoga training program combines traditional Hatha and Vinyasa styles to create a balanced practice that builds strength, flexibility, and inner peace. Whether you\'re a beginner looking to start your yoga journey or an experienced practitioner seeking to deepen your practice, our expert instructor Bella will guide you through each session with care and attention.',
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
                text: 'Benefits of Regular Yoga Practice',
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
                text: 'Yoga offers numerous physical and mental health benefits. Regular practice can improve flexibility, build muscle strength, and perfect your posture. It also helps reduce stress, increase focus, and promote better sleep patterns. Our structured 60-minute sessions are designed to maximize these benefits while ensuring a safe and enjoyable experience.',
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
                text: 'What to Expect',
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
                text: 'Each yoga session begins with breathing exercises and gentle warm-up poses, followed by a flowing sequence that builds heat and strength in the body. Sessions conclude with relaxing poses and meditation to help you leave feeling centered and renewed. All necessary equipment is provided, and modifications are offered for different skill levels.',
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
    heroImage: heroImage.id,
    meta: {
      description:
        'Transform your body and mind with our comprehensive yoga training program. Expert instruction, flexible scheduling, and benefits for all skill levels.',
      image: heroImage.id,
      title: 'Yoga Training - Mindful Movement for Body & Soul',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Yoga Training',
  }
}