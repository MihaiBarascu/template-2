import type { Block } from 'payload'

import { spacingField } from '@/fields/spacing'

export const cardTypeOptions = [
  { label: 'Pricing (abonamente sală)', value: 'pricing' },
  { label: 'Product (SPA/Solar)', value: 'product' },
  { label: 'Team (membri echipă)', value: 'team' },
  { label: 'Class (clase fitness)', value: 'class' },
  { label: 'Offer (oferte/promo)', value: 'offer' },
  { label: 'Blog (articole)', value: 'blog' },
  { label: 'Service (servicii)', value: 'service' },
  { label: 'Simple (minimal)', value: 'simple' },
]

export const UniversalCardBlock: Block = {
  slug: 'universalCard',
  labels: {
    singular: 'Card Universal',
    plural: 'Carduri Universale',
  },
  fields: [
    spacingField,
    {
      name: 'cardType',
      type: 'select',
      label: 'Tip Card',
      defaultValue: 'simple',
      options: cardTypeOptions,
      admin: {
        description: 'Alege stilul vizual al cardului',
      },
    },

    // === CONȚINUT DE BAZĂ ===
    {
      name: 'title',
      type: 'text',
      label: 'Titlu',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitlu',
      admin: {
        placeholder: 'Ex: "8 ședințe", "Full morning", "Antrenor Principal"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere',
    },

    // === IMAGINE ===
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagine',
      admin: {
        condition: (_, { cardType }) =>
          ['pricing', 'product', 'team', 'class', 'offer', 'blog', 'service'].includes(cardType),
      },
    },
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Poziție Imagine',
      defaultValue: 'top',
      options: [
        { label: 'Sus', value: 'top' },
        { label: 'Background (overlay)', value: 'background' },
      ],
      admin: {
        layout: 'horizontal',
        condition: (_, { cardType }) => ['pricing'].includes(cardType),
      },
    },

    // === PREȚ (disponibil pe TOATE tipurile) ===
    {
      name: 'price',
      type: 'group',
      label: 'Preț',
      admin: {
        description: 'Opțional - disponibil pe toate tipurile de carduri',
      },
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Sumă (RON)',
        },
        {
          name: 'period',
          type: 'text',
          label: 'Perioadă',
          admin: {
            placeholder: '/lună, /ședință',
          },
        },
        {
          name: 'oldPrice',
          type: 'number',
          label: 'Preț Vechi (reducere)',
        },
      ],
    },

    // === FEATURES (array) ===
    {
      name: 'features',
      type: 'array',
      label: 'Beneficii / Features',
      admin: {
        condition: (_, { cardType }) => ['pricing'].includes(cardType),
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
          label: 'Inclus (✓)',
        },
      ],
    },

    // === BADGE (disponibil pe TOATE tipurile) ===
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      admin: {
        placeholder: 'Ex: "Popular", "Reducere 20%", "Nou", "Avansat"',
        description: 'Opțional - disponibil pe toate tipurile de carduri',
      },
    },
    {
      name: 'badgeColor',
      type: 'select',
      label: 'Culoare Badge',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Roșu)', value: 'primary' },
        { label: 'Success (Verde)', value: 'success' },
        { label: 'Warning (Galben)', value: 'warning' },
        { label: 'Dark (Negru)', value: 'dark' },
      ],
      admin: {
        condition: (_, { badge }) => !!badge,
      },
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Evidențiat (stil special)',
      defaultValue: false,
    },

    // === META (pentru class/service) ===
    {
      name: 'meta',
      type: 'group',
      label: 'Metadata',
      admin: {
        condition: (_, { cardType }) => ['class', 'service', 'blog'].includes(cardType),
        description: 'Informații suplimentare pentru carduri de tip clasă/serviciu',
      },
      fields: [
        {
          name: 'duration',
          type: 'number',
          label: 'Durată (minute)',
        },
        {
          name: 'capacity',
          type: 'number',
          label: 'Capacitate maximă',
        },
        {
          name: 'schedule',
          type: 'text',
          label: 'Program',
          admin: {
            placeholder: 'Ex: "3 zile/săptămână"',
          },
        },
      ],
    },

    // === CTA ===
    {
      name: 'cta',
      type: 'group',
      label: 'Buton Acțiune',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Text Buton',
          defaultValue: 'Află mai mult',
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Tip Link',
          defaultValue: 'page',
          options: [
            { label: 'Pagină', value: 'page' },
            { label: 'URL Custom (tel:, mailto:)', value: 'custom' },
          ],
          admin: {
            layout: 'horizontal',
          },
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
            placeholder: 'tel:+40264123456 sau /contact',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Deschide în tab nou',
          defaultValue: false,
        },
      ],
    },
  ],
}
