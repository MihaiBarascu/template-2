import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ServiceArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const serviceCrossfit: (args: ServiceArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'aerobic-crossfit',
    _status: 'published',
    postType: 'service',
    serviceDetails: {
      price: '250 RON/lună',
      duration: '75 min',
      schedule: 'Luni-Vineri 6:00',
      trainer: 'Maria',
    },
    authors: [author],
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Antrenament de intensitate ridicată care dezvoltă forța, rezistența și arde calorii rapid.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Programul nostru Aerobic & CrossFit combină condiționarea cardiovasculară cu mișcări funcționale de forță pentru a oferi rezultate maxime. Condus de antrenorul nostru experimentat Maria, aceste sesiuni intensive de 75 de minute îți vor provoca limitele în timp ce dezvoltă o condiție fizică reală care se traduce în activitățile de zi cu zi.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Antrenament de Fitness Funcțional',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Metodologia CrossFit se concentrează pe mișcări funcționale de intensitate ridicată, constant variate. Antrenamentele noastre incorporează elemente din haltere, gimnastică și cardio pentru a construi o condiție fizică completă. Fiecare antrenament este scalabil la nivelurile individuale de fitness, asigurând că toată lumea poate participa în siguranță în timp ce este provocată corespunzător.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: '',
              blockType: 'mediaBlock',
              media: blockImage.id,
            },
            format: '',
            version: 2,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Structura Antrenamentului',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Fiecare sesiune începe cu o încălzire dinamică pentru a pregăti corpul pentru exerciții intense. Antrenamentul principal variază zilnic, dar include de obicei antrenament de forță, condiționare metabolică și dezvoltarea abilităților. Terminăm cu stretching țintit și lucru de mobilitate pentru a ajuta recuperarea. Programul nostru de dimineață devreme este perfect pentru a-ți începe ziua cu energie și concentrare.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: 'Rezultate de Intensitate Ridicată',
              blockType: 'banner',
              content: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 1,
                          mode: 'normal',
                          style: '',
                          text: 'Ești gata să-ți depășești limitele?',
                          version: 1,
                        },
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: ' Alătură-te comunității noastre CrossFit și descoperă de ce este cu adevărat capabil corpul tău. Fiecare antrenament este o oportunitate de a deveni mai puternic, mai rapid și mai încrezător.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              style: 'info',
            },
            format: '',
            version: 2,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    heroImage: heroImage.id,
    meta: {
      description:
        'Antrenament aerobic și CrossFit de intensitate ridicată care dezvoltă forța, rezistența și arde calorii rapid. Coaching expert și antrenamente scalabile pentru toate nivelurile.',
      image: heroImage.id,
      title: 'Aerobic & CrossFit - Fitness Funcțional de Intensitate Ridicată',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Aerobic & CrossFit',
  }
}