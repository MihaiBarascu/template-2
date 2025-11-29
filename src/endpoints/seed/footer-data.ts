import type { Footer } from '@/payload-types'

export const footerData: Partial<Footer> = {
  companyInfo: {
    // Logo comes from Logo global
    description:
      'Transformă-ți corpul și mintea cu programele noastre profesionale de fitness. Alătură-te comunității noastre și începe călătoria ta către o viață sănătoasă!',
    showSocialHere: true, // Social media icons from BusinessInfo
  },
  columns: [
    {
      title: 'Linkuri Rapide',
      contentType: 'links',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Despre Noi',
            url: '/despre',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Clasele Noastre',
            url: '/clase',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Antrenori',
            url: '/antrenori',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Abonamente',
            url: '/abonamente',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Blog',
            url: '/blog',
          },
        },
      ],
    },
    {
      title: 'Serviciile Noastre',
      contentType: 'text',
      textItems: [
        {
          icon: 'check',
          text: 'Antrenament Personal',
        },
        {
          icon: 'check',
          text: 'Clase de Grup',
        },
        {
          icon: 'check',
          text: 'Consiliere Nutrițională',
        },
        {
          icon: 'check',
          text: 'Programe Online',
        },
        {
          icon: 'check',
          text: 'Recuperare & Masaj',
        },
      ],
    },
    {
      title: 'Contact',
      contentType: 'contact',
      // Contact data comes automatically from BusinessInfo global
    },
    {
      title: 'Program de Lucru',
      contentType: 'schedule',
      // Schedule data comes automatically from BusinessInfo global
    },
  ],
  // Social Media removed - comes from BusinessInfo global
  bottomBar: {
    copyright: `© ${new Date().getFullYear()} Transilvania Gym toate drepturile rezervate.`,
    legalLinks: [
      {
        link: {
          type: 'custom',
          label: 'Politica de Confidențialitate',
          url: '/confidentialitate',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Termeni și Condiții',
          url: '/termeni',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Politica Cookie',
          url: '/cookies',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'ANPC',
          url: 'https://anpc.ro/',
          newTab: true,
        },
      },
    ],
    complianceLogos: [], // Will be populated with media IDs after upload
  },
}
