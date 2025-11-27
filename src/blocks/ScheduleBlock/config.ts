import type { Block } from 'payload'
import { spacingField } from '@/fields/spacing'

export const ScheduleBlock: Block = {
  slug: 'schedule',
  interfaceName: 'ScheduleBlock',
  labels: {
    singular: 'Orar',
    plural: 'Orare',
  },
  fields: [
    {
      name: 'scheduleType',
      type: 'select',
      label: 'Tip afișare',
      defaultValue: 'simpleGlobal',
      required: true,
      options: [
        { label: '🌐 Program Simplu (din Business Info)', value: 'simpleGlobal' },
        { label: '📅 Orar Clase (din Business Info)', value: 'advancedGlobal' },
        { label: '✏️ Program Simplu (custom)', value: 'simpleCustom' },
        { label: '📝 Orar Clase (custom)', value: 'advancedCustom' },
      ],
      admin: {
        description: 'Alege tipul de orar și sursa datelor',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titlu',
      admin: {
        placeholder: 'Program de lucru',
      },
    },

    // ===============================
    // SIMPLE CUSTOM (working hours)
    // ===============================
    {
      name: 'simpleHours',
      type: 'array',
      label: 'Program',
      labels: {
        singular: 'Interval',
        plural: 'Intervale',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.scheduleType === 'simpleCustom',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'days',
              type: 'text',
              label: 'Zile',
              required: true,
              admin: {
                placeholder: 'Luni - Vineri',
                width: '50%',
              },
            },
            {
              name: 'hours',
              type: 'text',
              label: 'Ore',
              required: true,
              admin: {
                placeholder: '07:00 - 22:00',
                width: '50%',
              },
            },
          ],
        },
      ],
    },

    // ===============================
    // ADVANCED CUSTOM (class schedule)
    // ===============================
    {
      name: 'scheduleEntries',
      type: 'array',
      label: 'Clase',
      labels: {
        singular: 'Clasă',
        plural: 'Clase',
      },
      admin: {
        condition: (_, siblingData) => siblingData?.scheduleType === 'advancedCustom',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'day',
              type: 'select',
              label: 'Zi',
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
              admin: { width: '25%' },
            },
            {
              name: 'time',
              type: 'text',
              label: 'Ora start',
              required: true,
              admin: {
                placeholder: '18:00',
                width: '25%',
              },
            },
            {
              name: 'endTime',
              type: 'text',
              label: 'Ora final',
              admin: {
                placeholder: '19:00',
                width: '25%',
              },
            },
            {
              name: 'className',
              type: 'text',
              label: 'Nume clasă',
              required: true,
              admin: {
                placeholder: 'Yoga',
                width: '25%',
              },
            },
          ],
        },
        {
          name: 'trainer',
          type: 'text',
          label: 'Antrenor (opțional)',
        },
      ],
    },

    // ===============================
    // STYLE OPTIONS
    // ===============================
    {
      name: 'style',
      type: 'select',
      label: 'Stil afișare',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Compact (pentru sidebar)', value: 'compact' },
        { label: 'Card', value: 'card' },
      ],
    },
    spacingField,
  ],
}
