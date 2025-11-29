import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
        description: 'Adauga linkuri de navigare sau iconite social media. Social media preia URL-urile din Business Info.',
      },
      fields: [
        {
          name: 'itemType',
          type: 'select',
          label: 'Tip Item',
          defaultValue: 'link',
          required: true,
          options: [
            { label: 'Link (navigare)', value: 'link' },
            { label: 'Link cu Sub-Meniu (dropdown)', value: 'linkWithSubItems' },
            { label: 'Social Media Icons', value: 'socialMedia' },
          ],
        },
        // Link fields - shown when itemType === 'link'
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (data, siblingData) => siblingData?.itemType === 'link',
            },
          },
        }),
        // Dropdown fields - shown when itemType === 'linkWithSubItems'
        link({
          appearances: false,
          overrides: {
            name: 'parentLink',
            label: 'Link Părinte',
            admin: {
              description: 'Unde navighează când dai click pe dropdown (ex: pagina Clase)',
              condition: (data, siblingData) => siblingData?.itemType === 'linkWithSubItems',
            },
          },
        }),
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub-Items',
          maxRows: 10,
          admin: {
            description: 'Linkurile care apar în dropdown',
            condition: (data, siblingData) => siblingData?.itemType === 'linkWithSubItems',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        // Social Media fields - shown when itemType === 'socialMedia'
        {
          name: 'socialPlatforms',
          type: 'select',
          label: 'Platforme de Afisat',
          hasMany: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
          admin: {
            description: 'URL-urile sunt preluate automat din "Business Info". Selecteaza doar platformele pe care vrei sa le afisezi in header.',
            condition: (data, siblingData) => siblingData?.itemType === 'socialMedia',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
