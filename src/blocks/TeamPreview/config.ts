import type { Block } from 'payload'

export const TeamPreview: Block = {
  slug: 'teamPreview',
  labels: {
    singular: 'Team Preview',
    plural: 'Team Previews',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Hello, we are Gymso',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'You are NOT allowed to redistribute this HTML template downloadable ZIP file on any template collection site. You are allowed to use this template for your personal or business websites.',
      admin: {
        description: 'Descriere care apare sub titlu',
      },
    },
    {
      name: 'teamMembers',
      type: 'relationship',
      label: 'Team Members to Display',
      relationTo: 'team-members',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Selectează membrii echipei care vor fi afișați (maxim 6)',
      },
    },
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      label: 'Show Social Links',
      defaultValue: true,
      admin: {
        description: 'Afișează iconițele pentru social media pe hover',
      },
    },
    {
      name: 'designTheme',
      type: 'select',
      label: 'Tema vizuală',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Transilvania', value: 'transilvania' },
      ],
      admin: {
        description: 'Alege stilul vizual pentru afișarea echipei',
      },
    },
  ],
}