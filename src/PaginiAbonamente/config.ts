import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields'
import { cardTypeOptions } from '@/blocks/UniversalCard/config'
import { revalidatePaginiAbonamente } from './hooks/revalidatePaginiAbonamente'

export const PaginiAbonamente: GlobalConfig = {
  slug: 'pagini-abonamente',
  label: 'Pagini Abonamente',
  admin: {
    group: 'Setari',
    description: 'Setari pentru pagina de listare abonamente',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePaginiAbonamente],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Hero Tab
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Titlu Hero',
              defaultValue: 'Abonamente',
              admin: {
                placeholder: 'Abonamente',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtitlu Hero',
              admin: {
                placeholder: 'Alege abonamentul potrivit pentru tine',
              },
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagine Fundal Hero',
            },
          ],
        },
        // Layout Tab
        {
          label: 'Layout',
          fields: [
            {
              name: 'showFilters',
              type: 'checkbox',
              label: 'Afiseaza filtre pe tip abonament',
              defaultValue: true,
            },
            {
              name: 'columns',
              type: 'select',
              label: 'Numar coloane carduri',
              defaultValue: '3',
              options: [
                { label: '2 coloane', value: '2' },
                { label: '3 coloane', value: '3' },
                { label: '4 coloane', value: '4' },
              ],
            },
            {
              name: 'defaultFilter',
              type: 'select',
              label: 'Filtru implicit',
              defaultValue: 'all',
              options: [
                { label: 'Toate', value: 'all' },
                { label: 'Sala / GYM', value: 'gym' },
                { label: 'SPA & Wellness', value: 'spa' },
                { label: 'Solar', value: 'solar' },
                { label: 'Fitness + SPA', value: 'fitness-spa' },
                { label: 'Aerobic + SPA', value: 'aerobic-spa' },
              ],
            },
            {
              name: 'cardType',
              type: 'select',
              label: 'Tip Card (UniversalCard)',
              options: cardTypeOptions,
              admin: {
                description: 'Opțional - dacă nu este setat, cardType se determină automat (gym=pricing, spa/solar=product)',
              },
            },
          ],
        },
        // SEO Tab
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            MetaTitleField({
              hasGenerateFn: false,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
}
