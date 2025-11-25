import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { CallToAction } from '../CallToAction/config'
import { FormBlock } from '../Form/config'
import { MapBlock } from '../MapBlock/config'
import { MediaBlock } from '../MediaBlock/config'
import { PreviewCards } from '../PreviewCards/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      description: 'Add rich text content to this column',
    },
  },
  {
    name: 'blocks',
    type: 'blocks',
    blocks: [CallToAction, FormBlock, MapBlock, MediaBlock, PreviewCards],
    label: 'Content Blocks',
    admin: {
      description: 'Add blocks (forms, maps, media, CTA) to this column',
      initCollapsed: true,
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Fundal',
      defaultValue: 'white',
      options: [
        { label: 'Alb', value: 'white' },
        { label: 'Gri deschis (about)', value: 'light' },
        { label: 'Închis (dark)', value: 'dark' },
      ],
      admin: {
        description: 'Culoarea de fundal a secțiunii',
      },
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
