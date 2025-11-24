import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacte',
  },
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['phone', 'email', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Număr de telefon',
      admin: {
        placeholder: '+40 123 456 789',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      admin: {
        placeholder: 'contact@example.com',
      },
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Rețele sociale',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
          admin: {
            placeholder: 'https://facebook.com/username',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
          admin: {
            placeholder: 'https://instagram.com/username',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok',
          admin: {
            placeholder: 'https://tiktok.com/@username',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
          admin: {
            placeholder: 'https://youtube.com/@username',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
          admin: {
            placeholder: '+40123456789',
            description: 'Număr de telefon pentru WhatsApp (fără spații)',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
          admin: {
            placeholder: 'https://linkedin.com/company/name',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X',
          admin: {
            placeholder: 'https://twitter.com/username',
          },
        },
      ],
    },
  ],
}
