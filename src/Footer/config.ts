import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Company Info Section (Logo comes from Logo global, Social from BusinessInfo)
    {
      type: 'group',
      name: 'companyInfo',
      label: 'Company Information',
      admin: {
        description: 'Logo-ul vine din global "Logo". Social media vine din "Business Info".',
      },
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Company Description',
          admin: {
            rows: 3,
            placeholder: 'Scurta descriere a companiei pentru footer...',
          },
        },
        {
          name: 'showSocialHere',
          type: 'checkbox',
          label: 'Show Social Media Icons in Company Section',
          defaultValue: true,
          admin: {
            description: 'Afiseaza iconitele social media din Business Info',
          },
        },
      ],
    },

    // Dynamic Columns - Simplified
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 0,
      maxRows: 5,
      admin: {
        description: 'Contact si Schedule iau datele automat din Business Info',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
          required: true,
        },
        {
          name: 'contentType',
          type: 'select',
          label: 'Content Type',
          defaultValue: 'links',
          options: [
            { label: 'Links (manual)', value: 'links' },
            { label: 'Text Items (manual)', value: 'text' },
            { label: 'Contact Info (din Business Info)', value: 'contact' },
            { label: 'Schedule (din Business Info)', value: 'schedule' },
            { label: 'Custom Content (manual)', value: 'custom' },
          ],
        },
        // Links array for link type (MANUAL)
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'links',
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
        // Text items for text type (MANUAL)
        {
          name: 'textItems',
          type: 'array',
          label: 'Text Items',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon (optional)',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Location', value: 'location' },
                { label: 'Clock', value: 'clock' },
                { label: 'Check', value: 'check' },
                { label: 'Arrow Right', value: 'arrow' },
                { label: 'Star', value: 'star' },
                { label: 'Heart', value: 'heart' },
                { label: 'User', value: 'user' },
                { label: 'Calendar', value: 'calendar' },
              ],
              defaultValue: 'none',
            },
            {
              name: 'text',
              type: 'text',
              label: 'Text',
              required: true,
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'text',
          },
        },
        // Contact type - NO MANUAL FIELDS, uses BusinessInfo
        // (no contactItems field needed - will be rendered from BusinessInfo)

        // Schedule type - NO MANUAL FIELDS, uses BusinessInfo
        // (no scheduleItems field needed - will be rendered from BusinessInfo)

        // Custom HTML content (MANUAL)
        {
          name: 'customContent',
          type: 'richText',
          label: 'Custom Content',
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'custom',
          },
        },
      ],
    },

    // Social Media - REMOVED (now comes from BusinessInfo)
    // socialMedia group removed - Footer Component will fetch from BusinessInfo

    // Bottom Bar
    {
      type: 'group',
      name: 'bottomBar',
      label: 'Bottom Bar',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Copyright Text',
          defaultValue: `© ${new Date().getFullYear()} All rights reserved.`,
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
        {
          name: 'complianceLogos',
          type: 'array',
          label: 'Compliance Logos (ANPC, SOL, etc.)',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'External Link',
              admin: {
                placeholder: 'https://anpc.ro/...',
              },
            },
            {
              name: 'altText',
              type: 'text',
              label: 'Alt Text',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Width (px)',
              defaultValue: 100,
              min: 50,
              max: 200,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
