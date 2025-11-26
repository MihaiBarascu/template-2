import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Schedules: CollectionConfig = {
  slug: 'schedules',
  labels: {
    singular: 'Orar',
    plural: 'Orare',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nume Orar',
      required: true,
      admin: {
        placeholder: 'Ex: Orar Principal, Orar Piscină',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere',
      admin: {
        placeholder: 'Ex: Program valabil începând cu 1 Decembrie 2024',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Program Simplu',
          description: 'Ore de funcționare generale (ex: Luni-Vineri: 7:00 - 22:00)',
          fields: [
            {
              name: 'simpleHours',
              type: 'array',
              label: 'Program',
              labels: {
                singular: 'Interval',
                plural: 'Intervale',
              },
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  label: 'Zile',
                  required: true,
                  admin: {
                    placeholder: 'Ex: Luni - Vineri',
                    width: '50%',
                  },
                },
                {
                  name: 'hours',
                  type: 'text',
                  label: 'Ore',
                  required: true,
                  admin: {
                    placeholder: 'Ex: 7:00 - 22:00 sau Închis',
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Orar Detaliat',
          description: 'Orar pe zile și ore pentru clase (folosit în blocul Schedule)',
          fields: [
            {
              name: 'settings',
              type: 'group',
              label: 'Setări Tabel',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startHour',
                      type: 'text',
                      label: 'Ora de început',
                      defaultValue: '07:00',
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'endHour',
                      type: 'text',
                      label: 'Ora de final',
                      defaultValue: '21:00',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'entries',
              type: 'array',
              label: 'Clase',
              labels: {
                singular: 'Clasă',
                plural: 'Clase',
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
                        width: '33%',
                      },
                    },
                    {
                      name: 'time',
                      type: 'text',
                      label: 'Ora',
                      required: true,
                      admin: {
                        placeholder: '07:00',
                        width: '33%',
                      },
                    },
                    {
                      name: 'endTime',
                      type: 'text',
                      label: 'Ora final',
                      admin: {
                        placeholder: '09:00',
                        width: '33%',
                      },
                    },
                  ],
                },
                {
                  name: 'className',
                  type: 'text',
                  label: 'Nume Clasă',
                  required: true,
                  admin: {
                    placeholder: 'Ex: Cardio, Boxing, Yoga',
                  },
                },
                {
                  name: 'trainer',
                  type: 'text',
                  label: 'Antrenor / Locație',
                  admin: {
                    placeholder: 'Ex: Maria sau Sala 2',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
