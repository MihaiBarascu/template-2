import type { Block } from 'payload'
import { spacingField } from '@/fields/spacing'

export const ContactInfoBlock: Block = {
  slug: 'contactInfoBlock',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Informații Contact',
    plural: 'Blocuri Contact Info',
  },
  fields: [
    {
      name: 'source',
      type: 'select',
      label: 'Sursă date',
      defaultValue: 'global',
      required: true,
      options: [
        { label: '🌐 Global (din Business Info)', value: 'global' },
        { label: '✏️ Custom (definit aici)', value: 'custom' },
      ],
      admin: {
        description: 'Alege sursa datelor de contact',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titlu (opțional)',
      admin: {
        placeholder: 'Unde ne poți găsi',
        description: 'Titlu afișat deasupra informațiilor',
      },
    },

    // ===============================
    // CUSTOM FIELDS (shown when source = custom)
    // ===============================
    {
      name: 'customData',
      type: 'group',
      label: 'Date Contact',
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'custom',
      },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Adresă',
          admin: {
            placeholder: 'Str. Example nr. 123, Cluj-Napoca',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              admin: {
                placeholder: '+40 123 456 789',
                width: '50%',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              admin: {
                placeholder: 'contact@example.com',
                width: '50%',
              },
            },
          ],
        },
      ],
    },

    // ===============================
    // MAP OPTIONS
    // ===============================
    {
      name: 'showMap',
      type: 'checkbox',
      label: 'Afișează harta',
      defaultValue: true,
    },
    {
      name: 'mapSource',
      type: 'select',
      label: 'Sursă hartă',
      defaultValue: 'global',
      options: [
        { label: '🌐 Global (din Business Info)', value: 'global' },
        { label: '✏️ Custom URL', value: 'custom' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.showMap,
      },
    },
    {
      name: 'customMapUrl',
      type: 'textarea',
      label: 'Google Maps Embed URL',
      admin: {
        condition: (_, siblingData) => siblingData?.showMap && siblingData?.mapSource === 'custom',
        placeholder: 'https://www.google.com/maps/embed?pb=...',
      },
    },
    {
      name: 'mapHeight',
      type: 'number',
      label: 'Înălțime hartă (px)',
      defaultValue: 250,
      min: 150,
      max: 500,
      admin: {
        condition: (_, siblingData) => siblingData?.showMap,
        step: 50,
      },
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
        { label: 'Default (vertical)', value: 'default' },
        { label: 'Compact (inline)', value: 'compact' },
        { label: 'Card', value: 'card' },
      ],
    },
    spacingField,
  ],
  graphQL: {
    singularName: 'ContactInfoBlock',
  },
}
