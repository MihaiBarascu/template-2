import type { GlobalConfig } from 'payload'

import { revalidateLogo } from './hooks/revalidateLogo'

export const Logo: GlobalConfig = {
  slug: 'logo',
  label: 'Logo',
  admin: {
    group: 'Setari',
    description: 'Logo-ul site-ului - 2 variante pentru fundal deschis/inchis',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ===============================
    // OPTION 1 - Logo deschis (pentru fundal dark)
    // ===============================
    {
      name: 'option1',
      type: 'group',
      label: 'Varianta 1 (pentru fundal inchis)',
      admin: {
        description: 'Logo deschis la culoare - folosit pe Header/Footer cu fundal dark',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tip Logo',
          defaultValue: 'text',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Imagine', value: 'image' },
          ],
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text Logo',
          defaultValue: 'Transilvania Gym',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
            placeholder: 'Transilvania Gym',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine Logo',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Recomandat: PNG transparent sau SVG',
          },
        },
      ],
    },

    // ===============================
    // OPTION 2 - Logo inchis (pentru fundal light)
    // ===============================
    {
      name: 'option2',
      type: 'group',
      label: 'Varianta 2 (pentru fundal deschis)',
      admin: {
        description: 'Logo inchis la culoare - pentru pagini cu fundal light (rezervat pentru viitor)',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tip Logo',
          defaultValue: 'text',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Imagine', value: 'image' },
          ],
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text Logo',
          defaultValue: 'Transilvania Gym',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
            placeholder: 'Transilvania Gym',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine Logo',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Recomandat: PNG transparent sau SVG',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateLogo],
  },
}
