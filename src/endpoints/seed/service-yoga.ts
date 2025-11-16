import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ServiceArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const serviceYoga: (args: ServiceArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'antrenament-yoga',
    _status: 'published',
    postType: 'service',
    serviceDetails: {
      price: '200 RON/lună',
      duration: '60 min',
      schedule: 'Luni-Vineri 7:30',
      trainer: 'Ana Maria',
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
                text: 'Transformă-ți corpul și mintea cu programul nostru complet de antrenament yoga.',
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
                text: 'Programul nostru de antrenament yoga combină stilurile tradiționale Hatha și Vinyasa pentru a crea o practică echilibrată care dezvoltă forța, flexibilitatea și pacea interioară. Fie că ești un începător care dorește să înceapă călătoria în yoga sau un practicant experimentat care caută să-și aprofundeze practica, instructorul nostru expert Ana Maria te va ghida prin fiecare sesiune cu grijă și atenție.',
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
                text: 'Beneficiile practicării regulate a yoga',
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
                text: 'Yoga oferă numeroase beneficii pentru sănătatea fizică și mentală. Practica regulată poate îmbunătăți flexibilitatea, poate dezvolta forța musculară și poate perfecționa postura. De asemenea, ajută la reducerea stresului, creșterea concentrării și promovarea unor tipare mai bune de somn. Sesiunile noastre structurate de 60 de minute sunt concepute pentru a maximiza aceste beneficii, asigurând în același timp o experiență sigură și plăcută.',
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
                text: 'La ce să te aștepți',
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
                text: 'Fiecare sesiune de yoga începe cu exerciții de respirație și poziții ușoare de încălzire, urmate de o secvență fluidă care creează căldură și forță în corp. Sesiunile se încheie cu poziții relaxante și meditație pentru a te ajuta să pleci simțindu-te centrat și reînnoit. Toate echipamentele necesare sunt furnizate, iar modificări sunt oferite pentru diferite niveluri de experiență.',
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
    heroImage: heroImage.id,
    meta: {
      description:
        'Transformă-ți corpul și mintea cu programul nostru complet de antrenament yoga. Instruire expertă, program flexibil și beneficii pentru toate nivelurile de experiență.',
      image: heroImage.id,
      title: 'Antrenament Yoga - Mișcare Conștientă pentru Corp și Suflet',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Antrenament Yoga',
  }
}