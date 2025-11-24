import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
  slug: 'addresses',
  labels: {
    singular: 'Adresă',
    plural: 'Adrese',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'address', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titlu',
      admin: {
        placeholder: 'Sediul principal, Sala Cluj, etc.',
        description: 'Un nume identificator pentru această adresă',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Adresă completă',
      admin: {
        placeholder: 'Strada Example, Nr. 123, Cluj-Napoca, România',
      },
    },
    {
      name: 'googleMapsEmbed',
      type: 'textarea',
      label: 'Google Maps Embed Code',
      admin: {
        description:
          'Codul iframe complet de la Google Maps (Share → Embed a map → Copy HTML)',
        placeholder:
          '<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" ...></iframe>',
      },
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Google Maps URL (opțional)',
      admin: {
        description: 'Link direct către locație pe Google Maps',
        placeholder: 'https://maps.google.com/?q=...',
      },
    },
  ],
}
