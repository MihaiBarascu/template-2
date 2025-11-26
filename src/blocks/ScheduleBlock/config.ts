import type { Block } from 'payload'

import { spacingField } from '@/fields/spacing'

export const ScheduleBlock: Block = {
  slug: 'schedule',
  labels: {
    singular: 'Orar',
    plural: 'Orare',
  },
  fields: [
    spacingField,
    {
      name: 'schedule',
      type: 'relationship',
      relationTo: 'schedules',
      label: 'Selectează Orarul',
      required: true,
      admin: {
        description: 'Alege orarul care va fi afișat',
      },
    },
    {
      name: 'customTitle',
      type: 'text',
      label: 'Titlu personalizat (opțional)',
      admin: {
        description: 'Lasă gol pentru a folosi titlul din orar',
      },
    },
  ],
}
