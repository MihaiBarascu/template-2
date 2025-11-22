import type { Block } from 'payload'

export const ScheduleBlock: Block = {
  slug: 'schedule',
  labels: {
    singular: 'Orar',
    plural: 'Orare',
  },
  fields: [
    {
      name: 'displayMode',
      type: 'select',
      label: 'Mod afișare',
      defaultValue: 'full',
      options: [
        { label: 'Complet', value: 'full' },
        { label: 'Compact', value: 'compact' },
      ],
    },
    {
      name: 'customTitle',
      type: 'text',
      label: 'Titlu personalizat (opțional)',
      admin: {
        description: 'Lasă gol pentru a folosi titlul din setări',
      },
    },
    {
      name: 'designTheme',
      type: 'select',
      label: 'Tema vizuală',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Transilvania', value: 'transilvania' },
      ],
      admin: {
        description: 'Alege stilul vizual pentru afișarea orarului',
      },
    },
  ],
}