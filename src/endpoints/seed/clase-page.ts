import type { Category } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

export const clasePage: (classesCategory?: Category) => RequiredDataFromCollectionSlug<'pages'> = (
  classesCategory,
) => {
  return {
    slug: 'clase',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockName: 'Clasele Noastre',
        blockType: 'archive',
        categories: classesCategory ? [classesCategory.id] : [],
        introContent: {
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
                    text: 'Clasele Noastre',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
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
                    text: 'Descoperă gama noastră completă de clase de fitness. Fiecare clasă este condusă de antrenori experți și este adaptată pentru toate nivelurile de experiență.',
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
        populateBy: 'collection',
        relationTo: 'posts',
      },
    ],
    meta: {
      description:
        'Explorează clasele noastre de fitness și serviciile de antrenament la Transilvania Gym',
      title: 'Clase - Transilvania Gym',
    },
    title: 'Clase',
  }
}
