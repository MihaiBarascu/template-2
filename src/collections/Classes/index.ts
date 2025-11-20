import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Classes: CollectionConfig<'classes'> = {
  slug: 'classes',
  labels: {
    singular: 'Clasă',
    plural: 'Clase',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    featuredImage: true,
    schedule: true,
    trainer: true,
    capacity: true,
    price: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'trainer', 'schedule', 'capacity', 'updatedAt'],
    group: 'Conținut',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Numele Clasei',
      required: true,
    },
    slugField(),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagine principală',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere scurtă',
      maxLength: 300,
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Descriere detaliată',
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'team-members',
      label: 'Antrenor',
      hasMany: false,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      options: [
        { label: 'Cardio', value: 'cardio' },
        { label: 'Forță', value: 'strength' },
        { label: 'Flexibilitate', value: 'flexibility' },
        { label: 'Mind & Body', value: 'mind-body' },
        { label: 'Combat', value: 'combat' },
        { label: 'Dance', value: 'dance' },
      ],
      required: true,
    },
    {
      name: 'difficulty',
      type: 'select',
      label: 'Nivel dificultate',
      options: [
        { label: 'Începător', value: 'beginner' },
        { label: 'Intermediar', value: 'intermediate' },
        { label: 'Avansat', value: 'advanced' },
        { label: 'Toate nivelurile', value: 'all-levels' },
      ],
      defaultValue: 'all-levels',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Durată (minute)',
      min: 15,
      max: 180,
      defaultValue: 60,
      required: true,
    },
    {
      name: 'schedule',
      type: 'array',
      label: 'Program',
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'Ziua',
          options: [
            { label: 'Luni', value: 'monday' },
            { label: 'Marți', value: 'tuesday' },
            { label: 'Miercuri', value: 'wednesday' },
            { label: 'Joi', value: 'thursday' },
            { label: 'Vineri', value: 'friday' },
            { label: 'Sâmbătă', value: 'saturday' },
            { label: 'Duminică', value: 'sunday' },
          ],
          required: true,
        },
        {
          name: 'time',
          type: 'text',
          label: 'Ora',
          required: true,
          admin: {
            placeholder: '18:00',
          },
        },
      ],
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacitate maximă',
      min: 1,
      max: 100,
      defaultValue: 20,
    },
    {
      name: 'price',
      type: 'group',
      label: 'Prețuri',
      fields: [
        {
          name: 'dropIn',
          type: 'number',
          label: 'Preț per ședință (RON)',
          min: 0,
        },
        {
          name: 'monthly',
          type: 'number',
          label: 'Abonament lunar (RON)',
          min: 0,
        },
        {
          name: 'package',
          type: 'group',
          label: 'Pachet ședințe',
          fields: [
            {
              name: 'sessions',
              type: 'number',
              label: 'Număr ședințe',
              min: 1,
            },
            {
              name: 'price',
              type: 'number',
              label: 'Preț pachet (RON)',
              min: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Beneficii',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          label: 'Beneficiu',
        },
      ],
    },
    {
      name: 'requirements',
      type: 'textarea',
      label: 'Cerințe / Echipament necesar',
      admin: {
        placeholder: 'Ex: Prosop, sticlă de apă, încălțăminte sport',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Clasă activă',
      defaultValue: true,
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