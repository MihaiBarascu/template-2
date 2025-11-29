import type { GlobalConfig } from 'payload'

export const BusinessInfo: GlobalConfig = {
  slug: 'business-info',
  label: 'Informatii Business',
  admin: {
    description: 'Informatii generale despre afacere - adresa, contact, program, social media',
    group: 'Setari',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ===============================
    // INFORMAȚII GENERALE
    // ===============================
    {
      type: 'collapsible',
      label: 'Informații Generale',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'businessName',
          type: 'text',
          label: 'Numele Afacerii',
          required: true,
          admin: {
            placeholder: 'Transilvania Gym',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Slogan (opțional)',
          admin: {
            placeholder: 'Transformă-ți corpul și mintea',
          },
        },
      ],
    },

    // ===============================
    // CONTACT
    // ===============================
    {
      type: 'collapsible',
      label: 'Contact',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Adresă',
          required: true,
          admin: {
            placeholder: 'Str. Moților nr. 54, Cluj-Napoca, România',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              admin: {
                placeholder: '+40 264 123 456',
                width: '50%',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              admin: {
                placeholder: 'contact@example.com',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp (opțional)',
          admin: {
            placeholder: '+40 700 000 000',
            description: 'Număr pentru buton WhatsApp',
          },
        },
      ],
    },

    // ===============================
    // PROGRAM SIMPLU
    // ===============================
    {
      type: 'collapsible',
      label: 'Program de Lucru',
      admin: {
        initCollapsed: false,
        description: 'Program simplu afișat în footer și contact info',
      },
      fields: [
        {
          name: 'workingHours',
          type: 'array',
          label: 'Program',
          labels: {
            singular: 'Interval',
            plural: 'Intervale',
          },
          minRows: 1,
          maxRows: 7,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  label: 'Zile',
                  required: true,
                  admin: {
                    placeholder: 'Luni - Vineri',
                    width: '50%',
                  },
                },
                {
                  name: 'hours',
                  type: 'text',
                  label: 'Ore',
                  required: true,
                  admin: {
                    placeholder: '07:00 - 22:00',
                    width: '50%',
                  },
                },
              ],
            },
          ],
          defaultValue: [
            { days: 'Luni - Vineri', hours: '07:00 - 22:00' },
            { days: 'Sâmbătă', hours: '08:00 - 18:00' },
            { days: 'Duminică', hours: 'Închis' },
          ],
        },
      ],
    },

    // ===============================
    // ORAR DETALIAT (pentru clase)
    // ===============================
    {
      type: 'collapsible',
      label: 'Orar Clase (Avansat)',
      admin: {
        initCollapsed: true,
        description: 'Orar detaliat pentru clasele de fitness',
      },
      fields: [
        {
          name: 'scheduleTitle',
          type: 'text',
          label: 'Titlu Orar',
          defaultValue: 'Programul Nostru Săptămânal',
        },
        {
          name: 'scheduleEntries',
          type: 'array',
          label: 'Clase',
          labels: {
            singular: 'Clasă',
            plural: 'Clase',
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  label: 'Zi',
                  required: true,
                  options: [
                    { label: 'Luni', value: 'monday' },
                    { label: 'Marți', value: 'tuesday' },
                    { label: 'Miercuri', value: 'wednesday' },
                    { label: 'Joi', value: 'thursday' },
                    { label: 'Vineri', value: 'friday' },
                    { label: 'Sâmbătă', value: 'saturday' },
                    { label: 'Duminică', value: 'sunday' },
                  ],
                  admin: { width: '25%' },
                },
                {
                  name: 'time',
                  type: 'text',
                  label: 'Ora start',
                  required: true,
                  admin: {
                    placeholder: '18:00',
                    width: '25%',
                  },
                },
                {
                  name: 'endTime',
                  type: 'text',
                  label: 'Ora final',
                  admin: {
                    placeholder: '19:00',
                    width: '25%',
                  },
                },
                {
                  name: 'className',
                  type: 'text',
                  label: 'Nume clasă',
                  required: true,
                  admin: {
                    placeholder: 'Yoga',
                    width: '25%',
                  },
                },
              ],
            },
            {
              name: 'trainer',
              type: 'text',
              label: 'Antrenor (opțional)',
              admin: {
                placeholder: 'Numele antrenorului',
              },
            },
          ],
        },
      ],
    },

    // ===============================
    // GOOGLE MAPS
    // ===============================
    {
      type: 'collapsible',
      label: 'Google Maps',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'googleMapsEmbed',
          type: 'textarea',
          label: 'Google Maps Embed URL',
          admin: {
            description: 'URL-ul din iframe-ul Google Maps (Share → Embed → copiază src)',
            placeholder: 'https://www.google.com/maps/embed?pb=...',
          },
        },
        {
          name: 'googleMapsLink',
          type: 'text',
          label: 'Link Google Maps',
          admin: {
            description: 'Link direct pentru "Deschide în Google Maps"',
            placeholder: 'https://goo.gl/maps/...',
          },
        },
      ],
    },

    // ===============================
    // SOCIAL MEDIA
    // ===============================
    {
      type: 'collapsible',
      label: 'Social Media',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook',
              admin: {
                placeholder: 'https://facebook.com/...',
                width: '50%',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram',
              admin: {
                placeholder: 'https://instagram.com/...',
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok',
              admin: {
                placeholder: 'https://tiktok.com/@...',
                width: '50%',
              },
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'YouTube',
              admin: {
                placeholder: 'https://youtube.com/...',
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn',
              admin: {
                placeholder: 'https://linkedin.com/company/...',
                width: '50%',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'Twitter/X',
              admin: {
                placeholder: 'https://twitter.com/...',
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
