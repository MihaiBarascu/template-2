import type { GlobalConfig } from 'payload'

export const Schedule: GlobalConfig = {
  slug: 'schedule',
  label: {
    singular: 'Orar',
    plural: 'Orar',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu Orar',
      defaultValue: 'Orar Săptămânal',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere',
      admin: {
        placeholder: 'Ex: Orar valabil începând cu 1 Decembrie 2024',
      },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Setări Orar',
      fields: [
        {
          name: 'startHour',
          type: 'text',
          label: 'Ora de început',
          defaultValue: '07:00',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'endHour',
          type: 'text',
          label: 'Ora de final',
          defaultValue: '21:00',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'timeSlotDuration',
          type: 'number',
          label: 'Durata slot (minute)',
          defaultValue: 60,
          min: 30,
          max: 180,
          required: true,
        },
        {
          name: 'showEmptySlots',
          type: 'checkbox',
          label: 'Afișează sloturi goale',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'entries',
      type: 'array',
      label: 'Intrări în Orar',
      labels: {
        singular: 'Intrare',
        plural: 'Intrări',
      },
      admin: {
        components: {
          RowLabel: '@/globals/Schedule/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'day',
              type: 'select',
              label: 'Ziua',
              required: true,
              options: [
                { label: 'Luni', value: 'monday' },
                { label: 'Marți', value: 'tuesday' },
                { label: 'Miercuri', value: 'wednesday' },
                { label: 'Joi', value: 'thursday' },
                { label: 'Vineri', value: 'friday' },
                { label: 'Sâmbătă', value: 'saturday' },
                { label: 'Duminică', value: 'sunday' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'time',
              type: 'text',
              label: 'Ora',
              required: true,
              admin: {
                placeholder: '18:00',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'entryType',
          type: 'select',
          label: 'Tip intrare',
          required: true,
          defaultValue: 'linked',
          options: [
            { label: 'Clasă existentă', value: 'linked' },
            { label: 'Intrare personalizată', value: 'custom' },
          ],
        },
        // Câmpuri pentru clasă linkată
        {
          name: 'class',
          type: 'relationship',
          label: 'Clasă',
          relationTo: 'classes',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'linked',
          },
        },
        {
          name: 'overrideTrainer',
          type: 'relationship',
          label: 'Antrenor diferit (opțional)',
          relationTo: 'team-members',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'linked',
            description: 'Lasă gol pentru a folosi antrenorul default al clasei',
          },
        },
        // Câmpuri pentru intrare personalizată
        {
          name: 'customTitle',
          type: 'text',
          label: 'Nume Clasă',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'custom',
            placeholder: 'Ex: Kango Jumps',
          },
        },
        {
          name: 'customTrainer',
          type: 'text',
          label: 'Nume Antrenor',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'custom',
            placeholder: 'Ex: Marius David',
          },
        },
        {
          name: 'customDuration',
          type: 'number',
          label: 'Durată (minute)',
          defaultValue: 60,
          min: 30,
          max: 180,
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'custom',
          },
        },
        {
          name: 'customColor',
          type: 'text',
          label: 'Culoare (opțional)',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'custom',
            placeholder: '#f13a11',
            description: 'Culoare HEX pentru această clasă',
          },
        },
        {
          name: 'customDescription',
          type: 'textarea',
          label: 'Descriere scurtă (opțional)',
          admin: {
            condition: (data, siblingData) => siblingData?.entryType === 'custom',
          },
        },
      ],
    },
  ],
}