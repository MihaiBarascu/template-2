import type { Block } from 'payload'

export const ClassesPreview: Block = {
  slug: 'classesPreview',
  labels: {
    singular: 'Classes Preview',
    plural: 'Classes Previews',
  },
  fields: [
    {
      name: 'preTitle',
      type: 'text',
      label: 'Pre-Title',
      defaultValue: 'Get A Perfect Body',
      admin: {
        description: 'Textul mic de deasupra titlului principal',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Our Training Classes',
      required: true,
    },
    {
      name: 'classes',
      type: 'relationship',
      label: 'Classes to Display',
      relationTo: 'classes',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Selectează clasele care vor fi afișate (maxim 6)',
      },
    },
    {
      name: 'showPrice',
      type: 'checkbox',
      label: 'Show Price Badge',
      defaultValue: true,
      admin: {
        description: 'Afișează badge-ul cu prețul pe imagine',
      },
    },
  ],
}