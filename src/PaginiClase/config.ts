import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields'

export const PaginiClase: GlobalConfig = {
  slug: 'pagini-clase',
  label: 'Pagini Clase',
  admin: {
    group: 'Setari',
    description: 'Setari pentru pagina de listare clase fitness',
  },
  access: {
    read: () => true,
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
              defaultValue: 'Clasele Noastre',
              admin: {
                placeholder: 'Clasele Noastre',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtitlu Hero',
              admin: {
                placeholder: 'Descopera programul de clase fitness',
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
              name: 'showScheduleLink',
              type: 'checkbox',
              label: 'Afiseaza link catre program',
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
              name: 'cardStyle',
              type: 'select',
              label: 'Stil carduri',
              defaultValue: 'overlay',
              options: [
                { label: 'Cu overlay', value: 'overlay' },
                { label: 'Simplu', value: 'simple' },
                { label: 'Cu border', value: 'bordered' },
              ],
            },
          ],
        },
        // SEO Tab
        {
          name: 'meta',
          label: 'SEO Listare',
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
        // Individual Page Settings Tab
        {
          label: 'Pagini Individuale',
          description: 'Setari pentru paginile individuale ale claselor (ex: /clase/yoga)',
          fields: [
            {
              name: 'individualLayout',
              type: 'select',
              label: 'Stil Layout',
              defaultValue: 'sidebar',
              options: [
                { label: 'Cu sidebar (continut + preturi lateral)', value: 'sidebar' },
                { label: 'Full width', value: 'fullwidth' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Sectiuni Vizibile',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'showSchedule',
                  type: 'checkbox',
                  label: 'Afiseaza program (zile/ore)',
                  defaultValue: true,
                },
                {
                  name: 'showPricing',
                  type: 'checkbox',
                  label: 'Afiseaza preturi',
                  defaultValue: true,
                },
                {
                  name: 'showTrainer',
                  type: 'checkbox',
                  label: 'Afiseaza card antrenor',
                  defaultValue: true,
                },
                {
                  name: 'showBenefits',
                  type: 'checkbox',
                  label: 'Afiseaza sectiune beneficii',
                  defaultValue: true,
                },
                {
                  name: 'showRequirements',
                  type: 'checkbox',
                  label: 'Afiseaza cerinte/echipament',
                  defaultValue: true,
                },
                {
                  name: 'showRelatedClasses',
                  type: 'checkbox',
                  label: 'Afiseaza "Alte clase similare"',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'relatedClassesTitle',
              type: 'text',
              label: 'Titlu sectiune clase similare',
              defaultValue: 'Alte clase similare',
            },
            {
              name: 'relatedClassesCount',
              type: 'number',
              label: 'Cate clase similare sa afiseze',
              defaultValue: 3,
              min: 1,
              max: 6,
            },
            {
              name: 'ctaButtonText',
              type: 'text',
              label: 'Text buton rezervare',
              defaultValue: 'Rezerva acum',
            },
          ],
        },
      ],
    },
  ],
}
