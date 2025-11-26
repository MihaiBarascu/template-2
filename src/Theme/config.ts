import type { GlobalConfig } from 'payload'

import { revalidateTheme } from './hooks/revalidateTheme'

export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primary Color',
      defaultValue: '#f13a11',
      admin: {
        description: 'Butoane, link-uri, accente (ex: #f13a11)',
      },
    },
    {
      name: 'darkColor',
      type: 'text',
      label: 'Dark Color',
      defaultValue: '#171819',
      admin: {
        description: 'Header, footer, backgrounds dark (ex: #171819)',
      },
    },
    {
      name: 'lightColor',
      type: 'text',
      label: 'Light Color',
      defaultValue: '#ffffff',
      admin: {
        description: 'Background principal (ex: #ffffff)',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#666262',
      admin: {
        description: 'Text body (ex: #666262)',
      },
    },
    {
      name: 'surfaceColor',
      type: 'text',
      label: 'Surface Color',
      defaultValue: '#f9f9f9',
      admin: {
        description: 'Secțiuni alternate, carduri (ex: #f9f9f9)',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTheme],
  },
}
