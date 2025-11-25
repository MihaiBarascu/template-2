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
      defaultValue: 'gymso-team',
      options: [
        { label: 'Gymso Team (card alb cu shadow)', value: 'gymso-team' },
        { label: 'Gymso Class (card alb cu preț badge)', value: 'gymso-class' },
        { label: 'Small (stil simplu)', value: 'small' },
        { label: 'Large (overlay pe imagine)', value: 'large' },
      ],
      admin: {
        description: 'Gymso = stil original template | Small/Large = stiluri alternative',
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
            description: 'Ex: "Antrenor Principal" sau "Antrenat de • Maria"',
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
