import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { spacingField } from '@/fields/spacing'
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
    name: 'textStyle',
    type: 'group',
    label: 'Stil Text',
    admin: {
      description: 'Setări de formatare text pentru această coloană',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'lineHeight',
            type: 'select',
            label: 'Spațiere Rânduri',
            defaultValue: 'normal',
            options: [
              { label: 'Foarte strâns (1.0)', value: 'none' },
              { label: 'Strâns (1.25)', value: 'tight' },
              { label: 'Ușor strâns (1.375)', value: 'snug' },
              { label: 'Normal (1.5)', value: 'normal' },
              { label: 'Relaxat (1.625)', value: 'relaxed' },
              { label: 'Larg (2.0)', value: 'loose' },
            ],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'fontSize',
            type: 'select',
            label: 'Mărime Text',
            defaultValue: 'base',
            options: [
              { label: 'Extra mic (12px)', value: 'xs' },
              { label: 'Mic (14px)', value: 'sm' },
              { label: 'Normal (16px)', value: 'base' },
              { label: 'Mare (18px)', value: 'lg' },
              { label: 'Extra mare (20px)', value: 'xl' },
              { label: '2XL (24px)', value: '2xl' },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'letterSpacing',
            type: 'select',
            label: 'Spațiere Litere',
            defaultValue: 'normal',
            options: [
              { label: 'Foarte strâns', value: 'tighter' },
              { label: 'Strâns', value: 'tight' },
              { label: 'Normal', value: 'normal' },
              { label: 'Larg', value: 'wide' },
              { label: 'Foarte larg', value: 'wider' },
            ],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'paragraphSpacing',
            type: 'select',
            label: 'Spațiu între Paragrafe',
            defaultValue: 'normal',
            options: [
              { label: 'Fără spațiu', value: 'none' },
              { label: 'Mic (0.5rem)', value: 'sm' },
              { label: 'Normal (1rem)', value: 'normal' },
              { label: 'Mare (1.5rem)', value: 'lg' },
              { label: 'Extra mare (2rem)', value: 'xl' },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
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
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      description: 'Add rich text content to this column (use centered h6 + h2 for section headers)',
    },
  },
  {
    name: 'blocks',
    type: 'blocks',
    blocks: [CallToAction, FormBlock, MapBlock, MediaBlock, PreviewCards],
    label: 'Content Blocks',
    admin: {
      description: 'Add blocks (forms, maps, media, CTA, preview cards) to this column',
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
    spacingField,
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
