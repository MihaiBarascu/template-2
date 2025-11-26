import type { Block } from 'payload'

export const PreviewCards: Block = {
  slug: 'previewCards',
  labels: {
    singular: 'Preview Cards',
    plural: 'Preview Cards',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Stil Carduri',
      defaultValue: 'team',
      options: [
        { label: 'Team (echipă cu social icons)', value: 'team' },
        { label: 'Class (clase cu preț badge)', value: 'class' },
      ],
      admin: {
        description: 'Team = pentru membri echipă | Class = pentru clase fitness',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Carduri',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titlu',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitlu',
          admin: {
            description: 'Ex: "Antrenor Principal" sau "Bella" (numele antrenorului)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descriere',
          admin: {
            description: 'Descriere scurtă a clasei/serviciului',
          },
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          admin: {
            description: 'Ex: "RON 50" - apare în colțul imaginii (doar la stilul large)',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Tip Link',
              defaultValue: 'reference',
              options: [
                { label: 'Pagină / Colecție', value: 'reference' },
                { label: 'URL Custom', value: 'custom' },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'reference',
              type: 'relationship',
              label: 'Link către',
              relationTo: ['pages', 'team-members', 'classes'],
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL Custom',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                placeholder: '/contact sau https://example.com',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Deschide în tab nou',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
