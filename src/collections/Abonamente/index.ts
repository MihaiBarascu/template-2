import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Abonamente: CollectionConfig = {
  slug: 'abonamente',
  labels: {
    singular: 'Abonament',
    plural: 'Abonamente',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'price', 'highlighted', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    // === INFO DE BAZĂ ===
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nume Abonament',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitlu',
      admin: {
        placeholder: 'Ex: "8 ședințe", "Full morning", "Nelimitat"',
      },
    },

    // === TIP ABONAMENT (pentru grupare pe pagină) ===
    {
      name: 'type',
      type: 'select',
      label: 'Tip Abonament',
      required: true,
      defaultValue: 'gym',
      options: [
        { label: 'Sală / GYM', value: 'gym' },
        { label: 'SPA & Wellness', value: 'spa' },
        { label: 'Solar', value: 'solar' },
        { label: 'Fitness + SPA', value: 'fitness-spa' },
        { label: 'Aerobic + SPA', value: 'aerobic-spa' },
      ],
      admin: {
        description: 'Determină în ce secțiune apare pe pagina Abonamente',
      },
    },

    // === IMAGINE (pentru carduri cu poze ca la Elyssium SPA/Solar) ===
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagine Card',
      admin: {
        description: 'Opțional - pentru carduri cu poze (SPA, Solar)',
      },
    },

    // === PREȚ ===
    {
      name: 'price',
      type: 'group',
      label: 'Preț',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Sumă (RON)',
        },
        {
          name: 'period',
          type: 'text',
          label: 'Perioadă/Unitate',
          admin: {
            placeholder: 'Ex: /lună, /ședință, /minut',
          },
        },
        {
          name: 'oldPrice',
          type: 'number',
          label: 'Preț Vechi (pentru reduceri)',
          admin: {
            description: 'Afișează prețul vechi tăiat dacă există',
          },
        },
      ],
    },

    // === BENEFICII (array simplu) ===
    {
      name: 'features',
      type: 'array',
      label: 'Beneficii / Detalii',
      labels: {
        singular: 'Beneficiu',
        plural: 'Beneficii',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
        {
          name: 'included',
          type: 'checkbox',
          defaultValue: true,
          label: 'Inclus (✓) sau Nu (✗)',
        },
      ],
    },

    // === BUTON CTA (flexibil: pagină SAU tel:/URL) ===
    {
      name: 'cta',
      type: 'group',
      label: 'Buton Acțiune',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Contactează-ne',
          label: 'Text Buton',
        },
        {
          name: 'linkType',
          type: 'radio',
          defaultValue: 'page',
          options: [
            { label: 'Link către Pagină (Contact)', value: 'page' },
            { label: 'URL Custom (tel:, mailto:)', value: 'custom' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Selectează Pagina',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL Custom',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'custom',
            placeholder: 'tel:+40264123456',
          },
        },
      ],
    },

    // === SIDEBAR: VIZUAL + ORDONARE ===
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Evidențiat (Popular/Recomandat)',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'highlightLabel',
      type: 'text',
      defaultValue: 'Popular',
      label: 'Text Badge',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.highlighted,
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Ordine în Secțiune',
      admin: {
        position: 'sidebar',
        description: 'Număr mai mic = apare primul',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Activ',
      admin: { position: 'sidebar' },
    },
  ],
}
