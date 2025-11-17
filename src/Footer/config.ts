import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Company Info Section
    {
      type: 'group',
      name: 'companyInfo',
      label: 'Company Information',
      fields: [
        {
          name: 'logoType',
          type: 'select',
          label: 'Logo Type',
          defaultValue: 'text',
          options: [
            { label: 'Text Logo', value: 'text' },
            { label: 'Image Logo', value: 'image' },
            { label: 'Both', value: 'both' },
          ],
        },
        {
          name: 'logoText',
          type: 'text',
          label: 'Logo Text',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.logoType === 'text' || siblingData?.logoType === 'both',
            placeholder: 'e.g., GymFit',
          },
        },
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Image',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.logoType === 'image' || siblingData?.logoType === 'both',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Company Description',
          admin: {
            rows: 3,
          },
        },
        {
          name: 'showSocialHere',
          type: 'checkbox',
          label: 'Show Social Media Icons in Company Section',
          defaultValue: true,
        },
      ],
    },

    // Dynamic Columns - Fully Flexible
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 0,
      maxRows: 5,
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
            { label: 'Links', value: 'links' },
            { label: 'Text Items', value: 'text' },
            { label: 'Contact Info', value: 'contact' },
            { label: 'Schedule', value: 'schedule' },
            { label: 'Custom Content', value: 'custom' },
          ],
        },
        // Links array for link type
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
        // Text items for text type
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
        // Contact items for contact type
        {
          name: 'contactItems',
          type: 'array',
          label: 'Contact Items',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Type',
              options: [
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Address', value: 'address' },
                { label: 'WhatsApp', value: 'whatsapp' },
              ],
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label (optional)',
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'contact',
          },
        },
        // Schedule items for schedule type
        {
          name: 'scheduleItems',
          type: 'array',
          label: 'Schedule',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: {
                placeholder: 'e.g., Luni - Vineri',
              },
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
              admin: {
                placeholder: 'e.g., 06:00 - 23:00',
              },
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'schedule',
          },
        },
        // Custom HTML content
        {
          name: 'customContent',
          type: 'richText',
          label: 'Custom Content',
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'custom',
          },
        },
      ],
      admin: {
        initCollapsed: false,
      },
    },

    // Social Media
    {
      type: 'group',
      name: 'socialMedia',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number',
          admin: {
            placeholder: 'e.g., +40712345678',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
        },
      ],
    },

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