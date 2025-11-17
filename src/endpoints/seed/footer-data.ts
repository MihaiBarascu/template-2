import type { Footer } from '@/payload-types'

export const footerData: Partial<Footer> = {
  companyInfo: {
    logoType: 'text',
    logoText: 'Transilvania Gym',
    description:
      'Transformă-ți corpul și mintea cu programele noastre profesionale de fitness. Alătură-te comunității noastre și începe călătoria ta către o viață sănătoasă!',
    showSocialHere: true,
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
      contactItems: [
        {
          type: 'phone',
          value: '+40 721 123 456',
          label: 'Sună-ne',
        },
        {
          type: 'email',
          value: 'contact@transilvaniafitness.ro',
        },
        {
          type: 'address',
          value: 'Str. Victoriei nr. 10, Cluj-Napoca, România',
        },
        {
          type: 'whatsapp',
          value: '+40 721 123 456',
          label: 'WhatsApp',
        },
      ],
    },
    {
      title: 'Program de Lucru',
      contentType: 'schedule',
      scheduleItems: [
        {
          label: 'Luni - Vineri',
          value: '06:00 - 22:00',
        },
        {
          label: 'Sâmbătă',
          value: '08:00 - 20:00',
        },
        {
          label: 'Duminică',
          value: '09:00 - 18:00',
        },
        {
          label: 'Sărbători Legale',
          value: 'Închis',
        },
      ],
    },
  ],
  socialMedia: {
    facebook: 'https://facebook.com/transilvaniafitness',
    instagram: 'https://instagram.com/transilvaniafitness',
    tiktok: 'https://tiktok.com/@transilvaniafitness',
    youtube: 'https://youtube.com/transilvaniafitness',
    whatsapp: '+40721123456',
    linkedin: 'https://linkedin.com/company/transilvaniafitness',
    twitter: 'https://twitter.com/transilvaniafitness',
  },
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
