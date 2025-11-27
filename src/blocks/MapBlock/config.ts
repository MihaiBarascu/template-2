import type { Block } from 'payload'
import { spacingField } from '@/fields/spacing'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Map Block',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'mapSource',
      type: 'select',
      defaultValue: 'global',
      options: [
        {
          label: '🌐 Global (din Business Info)',
          value: 'global',
        },
        {
          label: '📍 Din Colecția Adrese',
          value: 'fromCollection',
        },
        {
          label: '✏️ Custom',
          value: 'custom',
        },
      ],
      required: true,
      admin: {
        description: 'Alege sursa pentru hartă',
      },
    },
    // Address from Collection (only shown when mapSource is 'fromCollection')
    {
      name: 'address',
      type: 'relationship',
      relationTo: 'addresses',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.mapSource === 'fromCollection',
        description: 'Select an address from the Addresses collection. Click "Add New" to create a new address.',
      },
    },
    // Custom Map Settings (only shown when mapSource is 'custom')
    {
      name: 'customMap',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.mapSource === 'custom',
      },
      fields: [
        {
          name: 'mapTitle',
          type: 'text',
          label: 'Map Title',
          admin: {
            description: 'Optional title above the map',
          },
        },
        {
          name: 'embedURL',
          type: 'textarea',
          label: 'Google Maps Embed URL',
          required: true,
          validate: (value) => {
            if (!value) return 'Google Maps Embed URL is required'
            if (typeof value === 'string' && !value.includes('google.com/maps')) {
              return 'Must be a valid Google Maps Embed URL'
            }
            return true
          },
          admin: {
            description:
              'Get embed URL from Google Maps: Share → Embed a map → Copy HTML (use the src URL)',
            placeholder: 'https://www.google.com/maps/embed?pb=...',
          },
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Container (Max Width)', value: 'container' },
            { label: 'Narrow', value: 'narrow' },
          ],
        },
        {
          name: 'height',
          type: 'number',
          label: 'Map Height (px)',
          defaultValue: 400,
          min: 200,
          max: 800,
          admin: {
            step: 50,
          },
        },
        {
          name: 'borderRadius',
          type: 'number',
          label: 'Border Radius (px)',
          defaultValue: 8,
          min: 0,
          max: 20,
        },
      ],
    },
    // Display Options
    spacingField,
  ],
  graphQL: {
    singularName: 'MapBlock',
  },
}
