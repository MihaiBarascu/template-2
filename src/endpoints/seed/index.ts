import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
// import { clasePage } from './clase-page' // No longer needed with dedicated Classes collection
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { serviceCardio } from './service-cardio'
import { serviceCrossfit } from './service-crossfit'
import { serviceYoga } from './service-yoga'
import { footerData } from './footer-data'
import { getTeamMembersData } from './teamMembersData'
// import { anpcLogo, solLogo } from './compliance-logos' // Temporar dezactivat până când imaginile sunt pe GitHub
// Media is NOT cleared - files stay in R2, we reuse existing ones
const collections: CollectionSlug[] = [
  'categories',
  // 'media', // REMOVED - don't delete media files from R2
  'pages',
  'posts',
  'team-members',
  'classes',
  'contacts',
  'addresses',
  'schedules',
  'forms',
  'form-submissions',
  'search',
]

const _globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Classes', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        companyInfo: {},
        columns: [],
        socialMedia: {},
        bottomBar: {},
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
  ])

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media (reusing existing files from R2)...`)

  // Use getOrCreateMedia to avoid re-uploading files that already exist in R2
  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    getOrCreateMedia(payload, {
      filename: 'image-post1.webp',
      url: 'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post1.webp',
      alt: image1.alt || 'Post image 1',
    }),
    getOrCreateMedia(payload, {
      filename: 'image-post2.webp',
      url: 'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post2.webp',
      alt: image2.alt || 'Post image 2',
    }),
    getOrCreateMedia(payload, {
      filename: 'image-post3.webp',
      url: 'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post3.webp',
      alt: image2.alt || 'Post image 3',
    }),
    getOrCreateMedia(payload, {
      filename: 'image-hero1.webp',
      url: 'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-hero1.webp',
      alt: imageHero1.alt || 'Hero image',
    }),
  ])

  const [demoAuthor, categoriesCreated] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    Promise.all(
      categories.map((category) =>
        payload.create({
          collection: 'categories',
          data: {
            title: category,
            slug: category.toLowerCase(),
          },
        }),
      ),
    ),
  ])

  // Find the Classes category
  const classesCategory = categoriesCreated.find((cat) => cat.title === 'Classes')

  payload.logger.info(`— Seeding service posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const yogaData = serviceYoga({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor })
  yogaData.categories = classesCategory ? [classesCategory.id] : []

  const yogaDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: yogaData,
  })

  const crossfitData = serviceCrossfit({
    heroImage: image2Doc,
    blockImage: image3Doc,
    author: demoAuthor,
  })
  crossfitData.categories = classesCategory ? [classesCategory.id] : []

  const crossfitDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: crossfitData,
  })

  const cardioData = serviceCardio({
    heroImage: image3Doc,
    blockImage: image1Doc,
    author: demoAuthor,
  })
  cardioData.categories = classesCategory ? [classesCategory.id] : []

  const cardioDoc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: cardioData,
  })

  // update each service post with related posts
  await payload.update({
    id: yogaDoc.id,
    collection: 'posts',
    data: {
      relatedPosts: [crossfitDoc.id, cardioDoc.id],
    },
  })
  await payload.update({
    id: crossfitDoc.id,
    collection: 'posts',
    data: {
      relatedPosts: [yogaDoc.id, cardioDoc.id],
    },
  })
  await payload.update({
    id: cardioDoc.id,
    collection: 'posts',
    data: {
      relatedPosts: [yogaDoc.id, crossfitDoc.id],
    },
  })

  payload.logger.info(`— Seeding team members...`)

  // Create team members using existing images
  const teamMembersData = getTeamMembersData(image1Doc, image2Doc, image3Doc)

  const teamMembers = await Promise.all(
    teamMembersData.map((memberData) =>
      payload.create({
        collection: 'team-members',
        depth: 0,
        data: {
          ...memberData,
          featuredImage: memberData.featuredImage.toString(),
        },
      })
    )
  )

  payload.logger.info(`— Seeding classes...`)

  // Create classes
  const classes = await Promise.all([
    payload.create({
      collection: 'classes',
      depth: 0,
      data: {
        title: 'Yoga pentru Începători',
        slug: 'yoga-incepatori',
        featuredImage: image1Doc.id,
        description: 'Clasă de yoga perfectă pentru cei care vor să înceapă o practică de yoga relaxantă și revigorantă.',
        category: 'mind-body',
        difficulty: 'beginner',
        duration: 60,
        trainer: teamMembers[1].id, // Maria Ionescu
        capacity: 20,
        active: true,
        _status: 'published' as const,
        publishedAt: new Date().toISOString(),
        schedule: [
          { day: 'monday', time: '18:00' },
          { day: 'wednesday', time: '18:00' },
          { day: 'friday', time: '18:00' },
        ],
        price: {
          dropIn: 50,
          monthly: 350,
          package: {
            sessions: 10,
            price: 400,
          },
        },
        benefits: [
          { benefit: 'Îmbunătățește flexibilitatea' },
          { benefit: 'Reduce stresul și anxietatea' },
          { benefit: 'Întărește musculatura' },
          { benefit: 'Îmbunătățește postura' },
        ],
        requirements: 'Saltea de yoga, prosop, sticlă de apă',
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Descoperă beneficiile yoga într-o atmosferă relaxantă și prietenoasă. Clasa noastră pentru începători este perfectă pentru cei care doresc să exploreze yoga pentru prima dată sau să-și consolideze bazele.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Ce vei învăța',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'În această clasă vei învăța pozițiile de bază ale yoga (asanas), tehnici de respirație (pranayama) și principiile fundamentale ale practicii yoga. Fiecare sesiune include încălzire, secvență de poziții și relaxare finală.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Pentru cine este potrivită',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Această clasă este perfectă pentru începători absoluți sau pentru cei care vor să-și consolideze bazele. Nu este necesară experiență anterioară. Toate vârstele și nivelurile de fitness sunt binevenite.',
                  },
                ],
              },
            ],
          },
        },
      },
    }),
    payload.create({
      collection: 'classes',
      depth: 0,
      data: {
        title: 'CrossFit Intensiv',
        slug: 'crossfit-intensiv',
        featuredImage: image2Doc.id,
        description: 'Antrenament de înaltă intensitate pentru cei care vor rezultate rapide și vizibile.',
        category: 'strength',
        difficulty: 'advanced',
        duration: 45,
        trainer: teamMembers[0].id, // Mihai Radu
        capacity: 15,
        active: true,
        _status: 'published' as const,
        publishedAt: new Date().toISOString(),
        schedule: [
          { day: 'tuesday', time: '07:00' },
          { day: 'thursday', time: '07:00' },
          { day: 'saturday', time: '09:00' },
        ],
        price: {
          dropIn: 70,
          monthly: 450,
        },
        benefits: [
          { benefit: 'Crește forța și rezistența' },
          { benefit: 'Arde calorii eficient' },
          { benefit: 'Dezvoltă masa musculară' },
          { benefit: 'Îmbunătățește condiția fizică generală' },
        ],
        requirements: 'Încălțăminte sport, prosop mare, sticlă de apă, mănuși (opțional)',
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'CrossFit este o metodă de antrenament care combină exerciții din gimnastică, haltere olimpice și exerciții cardiovasculare într-un program variat și intens.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Structura antrenamentului',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Fiecare sesiune începe cu o încălzire dinamică, urmată de exerciții de tehnică și mobilitate. Partea principală constă în WOD (Workout of the Day) - un antrenament intens și variat. Încheierea include stretching și recuperare.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Rezultate așteptate',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'După 4-6 săptămâni de antrenament constant vei observa îmbunătățiri semnificative în forță, rezistență cardiovasculară, flexibilitate și compoziție corporală. CrossFit dezvoltă toate cele 10 componente ale fitness-ului.',
                  },
                ],
              },
            ],
          },
        },
      },
    }),
    payload.create({
      collection: 'classes',
      depth: 0,
      data: {
        title: 'Pilates Core',
        slug: 'pilates-core',
        featuredImage: image3Doc.id,
        description: 'Consolidează-ți centrul corpului și îmbunătățește-ți postura cu exerciții Pilates.',
        category: 'flexibility',
        difficulty: 'intermediate',
        duration: 50,
        trainer: teamMembers[2].id, // Alexandru Popescu
        capacity: 12,
        active: true,
        _status: 'published' as const,
        publishedAt: new Date().toISOString(),
        schedule: [
          { day: 'monday', time: '10:00' },
          { day: 'wednesday', time: '10:00' },
          { day: 'friday', time: '10:00' },
        ],
        price: {
          dropIn: 60,
          monthly: 400,
          package: {
            sessions: 8,
            price: 380,
          },
        },
        benefits: [
          { benefit: 'Întărește mușchii abdominali' },
          { benefit: 'Îmbunătățește echilibrul' },
          { benefit: 'Reduce durerile de spate' },
          { benefit: 'Tonifică întregul corp' },
        ],
        requirements: 'Saltea de yoga, îmbrăcăminte confortabilă',
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Pilates este o metodă de exerciții care se concentrează pe întărirea mușchilor centrali ai corpului, îmbunătățirea posturii și creșterea flexibilității.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Principiile Pilates',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Metoda Pilates se bazează pe 6 principii fundamentale: concentrare, control, centru, fluiditate, precizie și respirație. Fiecare exercițiu este executat cu atenție la detalii și coordonare perfectă cu respirația.',
                  },
                ],
              },
              {
                type: 'heading',
                version: 1,
                tag: 'h3',
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Beneficii pe termen lung',
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Practicarea regulată a Pilates îmbunătățește postura, reduce durerile de spate, crește flexibilitatea și mobilitatea articulară. Este excelent pentru recuperare după accidentări și pentru prevenirea leziunilor.',
                  },
                ],
              },
            ],
          },
        },
      },
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding contacts and addresses...`)

  // Create Contact entry
  const mainContact = await payload.create({
    collection: 'contacts',
    depth: 0,
    data: {
      phone: '+40 264 123 456',
      email: 'contact@transilvaniagym.ro',
      socialMedia: {
        facebook: 'https://facebook.com/transilvaniagym',
        instagram: 'https://instagram.com/transilvaniagym',
        whatsapp: '+40264123456',
      },
    },
  })

  // Create Address entry
  const mainAddress = await payload.create({
    collection: 'addresses',
    depth: 0,
    data: {
      title: 'Sediul Principal Transilvania Fitness',
      address: 'Str. Moților nr. 54, Cluj-Napoca, România',
      googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.4729182042995!2d23.588416315676973!3d46.77121097913861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e8a9c5b81d1%3A0x3c8e3a1f8f7c8b9!2sCluj-Napoca%2C%20Romania!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
      googleMapsUrl: 'https://goo.gl/maps/cluj-napoca',
    },
  })

  payload.logger.info(`— Seeding schedule...`)

  // Create schedule in collection (not global anymore)
  const mainSchedule = await payload.create({
    collection: 'schedules',
    depth: 0,
    data: {
      title: 'Orar Săptămânal',
      description: 'Program valabil începând cu 1 Decembrie 2024',
      simpleHours: [
        { days: 'Luni - Vineri', hours: '07:00 - 22:00' },
        { days: 'Sâmbătă', hours: '08:00 - 20:00' },
        { days: 'Duminică', hours: '09:00 - 18:00' },
      ],
      settings: {
        startHour: '07:00',
        endHour: '21:00',
      },
      entries: [
        // Luni
        { day: 'monday' as const, time: '07:00', endTime: '08:00', className: 'Morning Cardio', trainer: 'Dan Popescu' },
        { day: 'monday' as const, time: '18:00', endTime: '19:00', className: 'Yoga pentru Începători', trainer: teamMembers[1].title },
        { day: 'monday' as const, time: '18:00', endTime: '18:45', className: 'Spinning', trainer: 'Andreea Pop' },
        { day: 'monday' as const, time: '18:00', endTime: '19:00', className: 'TRX', trainer: 'Sala 2' },
        { day: 'monday' as const, time: '19:00', endTime: '19:45', className: 'Kango Jumps', trainer: 'Marius David' },
        // Marți
        { day: 'tuesday' as const, time: '07:00', endTime: '07:45', className: 'CrossFit Intensiv', trainer: teamMembers[2].title },
        { day: 'tuesday' as const, time: '09:00', endTime: '10:00', className: 'TRX Training', trainer: 'Ana Marinescu' },
        { day: 'tuesday' as const, time: '18:00', endTime: '18:45', className: 'Spinning', trainer: 'Vlad Ionescu' },
        // Miercuri
        { day: 'wednesday' as const, time: '10:00', endTime: '10:50', className: 'Pilates Core', trainer: teamMembers[0].title },
        { day: 'wednesday' as const, time: '18:00', endTime: '19:00', className: 'Yoga pentru Începători', trainer: teamMembers[1].title },
        { day: 'wednesday' as const, time: '19:30', endTime: '20:30', className: 'Boxing Fitness', trainer: 'Radu Constantin' },
        // Joi
        { day: 'thursday' as const, time: '07:00', endTime: '07:45', className: 'CrossFit Intensiv', trainer: teamMembers[2].title },
        { day: 'thursday' as const, time: '17:00', endTime: '17:50', className: 'Aerobic Step', trainer: 'Elena Dumitrescu' },
        // Vineri
        { day: 'friday' as const, time: '10:00', endTime: '10:50', className: 'Pilates Core', trainer: teamMembers[0].title },
        { day: 'friday' as const, time: '18:00', endTime: '19:00', className: 'Yoga pentru Începători', trainer: teamMembers[1].title },
        // Sâmbătă
        { day: 'saturday' as const, time: '09:00', endTime: '09:45', className: 'CrossFit Intensiv', trainer: teamMembers[2].title },
        { day: 'saturday' as const, time: '11:00', endTime: '12:30', className: 'Zumba Party', trainer: 'Cristina Popa' },
        // Duminică
        { day: 'sunday' as const, time: '10:00', endTime: '11:15', className: 'Yoga Relaxare', trainer: teamMembers[1].title },
        { day: 'sunday' as const, time: '16:00', endTime: '17:00', className: 'Stretching & Recovery', trainer: 'Team' },
      ],
    },
  })

  payload.logger.info(`— Seeding pages...`)

  // First create the home page data
  const [_] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, teamMembers, classes, contactForm, address: mainAddress, schedule: mainSchedule }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({
        contactForm: contactForm,
        contact: mainContact,
        address: mainAddress,
      }),
    }),
  ])

  // Create clase page after we have the category - disabled as we now have a dedicated Classes collection
  // const clasePageDoc = await payload.create({
  //   collection: 'pages',
  //   depth: 0,
  //   data: clasePage(classesCategory),
  // })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Acasă',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Clase',
              url: '/classes',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Echipa',
              url: '/team-members',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact',
            },
          },
        ],
        socialLinks: [
          {
            platform: 'facebook',
            url: 'https://facebook.com/transilvaniagym',
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/transilvaniagym',
          },
          {
            platform: 'instagram',
            url: 'https://instagram.com/transilvaniagym',
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: footerData,
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

/**
 * Get existing media by alt text or create new one if not exists
 * This prevents re-uploading the same files to R2 on every seed
 *
 * Note: We search by 'alt' instead of 'filename' because Payload may rename
 * files on upload (e.g., image-hero1.webp → image-hero1-1.webp) if they exist
 */
async function getOrCreateMedia(
  payload: Payload,
  {
    filename,
    url,
    alt,
  }: {
    filename: string
    url: string
    alt: string
  }
): Promise<Media> {
  // First, try to find by alt text (most reliable for our seed data)
  const existingByAlt = await payload.find({
    collection: 'media',
    where: {
      alt: {
        equals: alt,
      },
    },
    limit: 1,
  })

  if (existingByAlt.docs.length > 0) {
    payload.logger.info(`  → Using existing media (by alt): ${alt}`)
    return existingByAlt.docs[0] as Media
  }

  // Fallback: try to find by filename (with 'contains' for renamed files)
  const baseFilename = filename.replace(/\.[^.]+$/, '') // Remove extension
  const existingByFilename = await payload.find({
    collection: 'media',
    where: {
      filename: {
        contains: baseFilename,
      },
    },
    limit: 1,
  })

  if (existingByFilename.docs.length > 0) {
    payload.logger.info(`  → Using existing media (by filename): ${existingByFilename.docs[0].filename}`)
    return existingByFilename.docs[0] as Media
  }

  // File doesn't exist, fetch and upload
  payload.logger.info(`  → Uploading new media: ${filename}`)
  const fileBuffer = await fetchFileByURL(url)

  const newMedia = await payload.create({
    collection: 'media',
    data: {
      alt,
    },
    file: fileBuffer,
  })

  return newMedia as Media
}
