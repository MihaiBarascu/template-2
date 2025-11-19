import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

export const TeamMembers: CollectionConfig<'team-members'> = {
  slug: 'team-members',
  labels: {
    singular: 'Membru Echipă',
    plural: 'Membri Echipă',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    role: true,
    status: true,
    featuredImage: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'status', 'updatedAt'],
    group: 'Conținut',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nume',
      required: true,
    },
    slugField(),
    {
      name: 'role',
      type: 'text',
      label: 'Rol / Funcție',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagine principală',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Descriere scurtă',
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Biografie detaliată',
    },
    {
      name: 'experience',
      type: 'number',
      label: 'Ani experiență',
      min: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'specializations',
      type: 'array',
      label: 'Specializări',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Specializare',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
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
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Publicat', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, context }) => {
        if (context.disableRevalidate) {
          return doc
        }
        // Revalidate logic can be added here if needed
        return doc
      },
    ],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 20,
  },
}