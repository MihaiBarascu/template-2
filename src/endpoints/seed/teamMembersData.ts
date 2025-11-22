interface ImageDoc {
  id: string | number
}

export const getTeamMembersData = (image1Doc: ImageDoc, image2Doc: ImageDoc, image3Doc: ImageDoc) => [
  {
    title: 'Alexandru Popescu',
    slug: 'alexandru-popescu',
    role: 'Antrenor Principal & Fondator',
    excerpt: 'Cu peste 15 ani de experiență în fitness și culturism, Alexandru este sufletul sălii noastre.',
    featuredImage: image1Doc.id,
    experience: 15,
    specializations: [
      { name: 'Culturism' },
      { name: 'Powerlifting' },
      { name: 'Nutriție Sportivă' },
    ],
    socialMedia: {
      instagram: 'https://instagram.com/alex_trainer',
      facebook: 'https://facebook.com/alextrainer',
    },
    contact: {
      email: 'alexandru@transilvaniafitness.ro',
      phone: '+40 722 333 444',
    },
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Maria Ionescu',
    slug: 'maria-ionescu',
    role: 'Instructor Fitness de Grup',
    excerpt: 'Specializată în aerobic, Pilates și Yoga, Maria aduce energie pozitivă în fiecare clasă.',
    featuredImage: image2Doc.id,
    experience: 8,
    specializations: [
      { name: 'Yoga' },
      { name: 'Pilates' },
      { name: 'Aerobic' },
    ],
    socialMedia: {
      instagram: 'https://instagram.com/maria_fitness',
      facebook: 'https://facebook.com/mariafitness',
    },
    contact: {
      email: 'maria@transilvaniafitness.ro',
      phone: '+40 733 444 555',
    },
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Mihai Radu',
    slug: 'mihai-radu',
    role: 'Antrenor CrossFit',
    excerpt: 'Campion național de CrossFit, Mihai te va împinge să-ți depășești limitele.',
    featuredImage: image3Doc.id,
    experience: 10,
    specializations: [
      { name: 'CrossFit' },
      { name: 'Functional Training' },
      { name: 'HIIT' },
    ],
    socialMedia: {
      instagram: 'https://instagram.com/mihai_crossfit',
    },
    contact: {
      email: 'mihai@transilvaniafitness.ro',
      phone: '+40 744 555 666',
    },
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
  },
]