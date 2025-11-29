import type { Block } from 'payload'

import { spacingField } from '@/fields/spacing'

export const VariantCardBlock: Block = {
  slug: 'variantCard',
  labels: {
    singular: 'Card Variabil',
    plural: 'Carduri Variabile',
  },
  fields: [
    spacingField,
    {
      name: 'variant',
      type: 'select',
      label: 'Stil Card',
      defaultValue: 'simple',
      options: [
        { label: 'Pricing (abonamente sală)', value: 'pricing' },
        { label: 'Product (SPA/Solar)', value: 'product' },
        { label: 'Team (membri echipă)', value: 'team' },
        { label: 'Class (clase fitness)', value: 'class' },
        { label: 'Offer (oferte/promo)', value: 'offer' },
        { label: 'Simple (minimal)', value: 'simple' },
      ],
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
        placeholder: 'Ex: "8 ședințe", "Full morning"',
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
        condition: (_, { variant }) =>
          ['pricing', 'product', 'team', 'class', 'offer'].includes(variant),
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
        condition: (_, { variant }) => ['pricing'].includes(variant),
      },
    },

    // === PREȚ (condiționat) ===
    {
      name: 'price',
      type: 'group',
      label: 'Preț',
      admin: {
        condition: (_, { variant }) => ['pricing', 'product', 'class'].includes(variant),
      },
      fields: [
        {
          name: 'amount',
          type: 'number',
          label: 'Sumă (RON)',
          required: true,
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
        condition: (_, { variant }) => ['pricing'].includes(variant),
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

    // === BADGE ===
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      admin: {
        placeholder: 'Ex: "Popular", "Reducere 20%"',
        condition: (_, { variant }) =>
          ['pricing', 'product', 'offer'].includes(variant),
      },
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Evidențiat (stil special)',
      defaultValue: false,
      admin: {
        condition: (_, { variant }) =>
          ['pricing', 'product', 'offer'].includes(variant),
      },
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
