import type { Address, Class, Form, Media, TeamMember } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type HomeArgs = {
  heroImage: Media
  teamMembers: TeamMember[]
  classes: Class[]
  contactForm: Form
  address: Address
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  teamMembers,
  classes,
  contactForm,
  address,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Începe acum',
            url: '#feature',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Află mai mult',
            url: '#about',
          },
        },
      ],
      media: heroImage.id,
      richText: {
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
                  text: 'un mod de a construi un stil de viață sănătos!',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h4',
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
                  text: 'Transformă-ți corpul și mintea',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    layout: [
      {
        blockName: 'Caracteristici Transilvania Gym',
        blockType: 'cta',
        style: 'transilvania-feature',
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Devino membru astăzi',
              url: '#membership',
            },
          },
        ],
        richText: {
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
                    text: 'Nou la Transilvania Gym?',
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
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Abonamentul tău este GRATUIT până la 2 luni (250 RON pe lună)',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h6',
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
                    text: 'Transformă-ți corpul și mintea la Transilvania Gym. Alătură-te miilor de persoane care au descoperit deja noul mod de a construi un stil de viață sănătos cu echipamentele noastre de ultimă generație și antrenorii noștri experți.',
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
        workingHours: {
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
                    text: 'Program de lucru',
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
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Duminică : Închis',
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
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Luni - Vineri',
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
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '7:00 AM - 10:00 PM',
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
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Sâmbătă',
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
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '6:00 AM - 4:00 PM',
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
      },
      {
        blockType: 'teamPreview',
        title: 'Salut, suntem Transilvania Gym',
        description:
          'Echipa noastră de antrenori profesioniști este dedicată să te ajute să îți atingi obiectivele de fitness. Cu experiență vastă și certificări internaționale, suntem aici pentru tine.',
        teamMembers: teamMembers.map((member) => member.id),
        showSocialLinks: true,
        designTheme: 'transilvania',
      },
      {
        blockType: 'classesPreview',
        preTitle: 'Obține un Corp Perfect',
        title: 'Clasele Noastre de Antrenament',
        classes: classes.map((cls) => cls.id),
        showPrice: true,
      },
      {
        blockType: 'schedule',
        displayMode: 'full',
        customTitle: 'Programul Nostru Săptămânal',
        designTheme: 'default',
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
            richText: {
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
                        text: 'Trimite-ne un mesaj',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h2',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            blocks: [
              {
                blockType: 'formBlock',
                form: typeof contactForm.id === 'string' ? contactForm.id : String(contactForm.id),
                enableIntro: false,
              },
            ],
          },
          {
            size: 'half',
            blocks: [
              {
                blockType: 'mapBlock',
                mapSource: 'fromCollection',
                address: typeof address.id === 'string' ? address.id : String(address.id),
                showBorder: false,
                topSpacing: 'none',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      description:
        'Transformă-ți corpul la Transilvania Gym - Un nou mod de a construi un stil de viață sănătos!',
      image: heroImage.id,
      title: 'Transilvania Gym',
    },
    title: 'Acasă',
  }
}
