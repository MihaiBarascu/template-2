import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateTeamMember, revalidateDelete } from './hooks/revalidateTeamMember'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields'

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
    featuredImage: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'team-members',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'team-members',
        req,
      }),
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
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter URL',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    // SEO for individual member pages
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'SEO pentru pagina individuala a membrului',
      },
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
  ],
  hooks: {
    afterChange: [revalidateTeamMember],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
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