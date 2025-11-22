import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'

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
const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'team-members',
  'classes',
  'forms',
  'form-submissions',
  'search',
]

const _globals: GlobalSlug[] = ['header', 'footer', 'schedule']

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
    payload.updateGlobal({
      slug: 'schedule',
      data: {
        entries: [],
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

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/MihaiBarascu/template-2/main/src/endpoints/seed/image-hero1.webp',
    ),
    // Temporar dezactivat până când imaginile sunt pe GitHub:
    // fetchFileByURL('https://anpc.ro/galerie/file/categ_legislatie/1660/logo%20ANPC.png'),
    // fetchFileByURL('https://ec.europa.eu/consumers/odr/resources/public2/images/odr_logo_ro.png'),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc, categoriesCreated] =
    await Promise.all([
      payload.create({
        collection: 'users',
        data: {
          name: 'Demo Author',
          email: 'demo-author@example.com',
          password: 'password',
        },
      }),
      payload.create({
        collection: 'media',
        data: image1,
        file: image1Buffer,
      }),
      payload.create({
        collection: 'media',
        data: image2,
        file: image2Buffer,
      }),
      payload.create({
        collection: 'media',
        data: image2,
        file: image3Buffer,
      }),
      payload.create({
        collection: 'media',
        data: imageHero1,
        file: hero1Buffer,
      }),
      // Temporar dezactivat până când imaginile sunt pe GitHub:
      // payload.create({
      //   collection: 'media',
      //   data: anpcLogo,
      //   file: anpcBuffer,
      // }),
      // payload.create({
      //   collection: 'media',
      //   data: solLogo,
      //   file: solBuffer,
      // }),
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
  await Promise.all([
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

  payload.logger.info(`— Seeding pages...`)

  // First create the home page data
  const [_] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  // Create clase page after we have the category - disabled as we now have a dedicated Classes collection
  // const clasePageDoc = await payload.create({
  //   collection: 'pages',
  //   depth: 0,
  //   data: clasePage(classesCategory),
  // })

  payload.logger.info(`— Seeding schedule...`)

  // Create schedule data with linked and custom entries
  const scheduleData = {
    title: 'Orar Săptămânal',
    description: 'Program valabil începând cu 1 Decembrie 2024',
    settings: {
      startHour: '07:00',
      endHour: '21:00',
      timeSlotDuration: 60,
      showEmptySlots: true,
    },
    entries: [
      // Luni
      {
        day: 'monday' as const,
        time: '07:00',
        entryType: 'custom' as const,
        customTitle: 'Morning Cardio',
        customTrainer: 'Dan Popescu',
        customDuration: 60,
        customColor: '#f13a11',
      },
      {
        day: 'monday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'Yoga pentru Începători',
        customTrainer: teamMembers[1].title, // Maria Ionescu
        customDuration: 60,
        customColor: '#7209B7',
      },
      {
        day: 'monday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'Spinning',
        customTrainer: 'Andreea Pop',
        customDuration: 45,
        customColor: '#FFD93D',
      },
      {
        day: 'monday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'TRX',
        customTrainer: 'Sala 2',
        customDuration: 60,
        customColor: '#4ECDC4',
      },
      {
        day: 'monday' as const,
        time: '19:00',
        entryType: 'custom' as const,
        customTitle: 'Kango Jumps',
        customTrainer: 'Marius David',
        customDuration: 45,
        customColor: '#FF6B35',
      },
      // Marți
      {
        day: 'tuesday' as const,
        time: '07:00',
        entryType: 'custom' as const,
        customTitle: 'CrossFit Intensiv',
        customTrainer: teamMembers[2].title, // Mihai Radu
        customDuration: 45,
        customColor: '#E63946',
      },
      {
        day: 'tuesday' as const,
        time: '09:00',
        entryType: 'custom' as const,
        customTitle: 'TRX Training',
        customTrainer: 'Ana Marinescu',
        customDuration: 60,
        customColor: '#4ECDC4',
      },
      {
        day: 'tuesday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'Spinning',
        customTrainer: 'Vlad Ionescu',
        customDuration: 45,
        customColor: '#FFD93D',
      },
      // Miercuri
      {
        day: 'wednesday' as const,
        time: '10:00',
        entryType: 'custom' as const,
        customTitle: 'Pilates Core',
        customTrainer: teamMembers[0].title, // Alexandru Popescu
        customDuration: 50,
        customColor: '#A8DADC',
      },
      {
        day: 'wednesday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'Yoga pentru Începători',
        customTrainer: teamMembers[1].title,
        customDuration: 60,
        customColor: '#7209B7',
      },
      {
        day: 'wednesday' as const,
        time: '19:30',
        entryType: 'custom' as const,
        customTitle: 'Boxing Fitness',
        customTrainer: 'Radu Constantin',
        customDuration: 60,
        customColor: '#E63946',
      },
      // Joi
      {
        day: 'thursday' as const,
        time: '07:00',
        entryType: 'custom' as const,
        customTitle: 'CrossFit Intensiv',
        customTrainer: teamMembers[2].title,
        customDuration: 45,
        customColor: '#E63946',
      },
      {
        day: 'thursday' as const,
        time: '17:00',
        entryType: 'custom' as const,
        customTitle: 'Aerobic Step',
        customTrainer: 'Elena Dumitrescu',
        customDuration: 50,
        customColor: '#A8DADC',
      },
      // Vineri
      {
        day: 'friday' as const,
        time: '10:00',
        entryType: 'custom' as const,
        customTitle: 'Pilates Core',
        customTrainer: teamMembers[0].title,
        customDuration: 50,
        customColor: '#A8DADC',
      },
      {
        day: 'friday' as const,
        time: '18:00',
        entryType: 'custom' as const,
        customTitle: 'Yoga pentru Începători',
        customTrainer: teamMembers[1].title,
        customDuration: 60,
        customColor: '#7209B7',
      },
      // Sâmbătă
      {
        day: 'saturday' as const,
        time: '09:00',
        entryType: 'custom' as const,
        customTitle: 'CrossFit Intensiv',
        customTrainer: teamMembers[2].title,
        customDuration: 45,
        customColor: '#E63946',
      },
      {
        day: 'saturday' as const,
        time: '11:00',
        entryType: 'custom' as const,
        customTitle: 'Zumba Party',
        customTrainer: 'Cristina Popa',
        customDuration: 90,
        customColor: '#F72585',
      },
      // Duminică
      {
        day: 'sunday' as const,
        time: '10:00',
        entryType: 'custom' as const,
        customTitle: 'Yoga Relaxare',
        customTrainer: teamMembers[1].title,
        customDuration: 75,
        customColor: '#7209B7',
      },
      {
        day: 'sunday' as const,
        time: '16:00',
        entryType: 'custom' as const,
        customTitle: 'Stretching & Recovery',
        customTrainer: 'Team',
        customDuration: 60,
        customColor: '#560BAD',
      },
    ],
  }

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'schedule',
      data: scheduleData,
    }),
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
