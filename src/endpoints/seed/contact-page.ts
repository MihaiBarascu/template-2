import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    title: 'Contact',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'content',
        backgroundColor: 'white',
        columns: [
          {
            size: 'half',
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'lg',
              letterSpacing: 'normal',
              paragraphSpacing: 'lg',
            },
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
            textStyle: {
              lineHeight: 'normal',
              fontSize: 'base',
              letterSpacing: 'normal',
              paragraphSpacing: 'normal',
            },
            blocks: [
              {
                blockType: 'contactInfoBlock',
                source: 'global',
                title: 'Unde ne poți găsi',
                showMap: true,
                mapSource: 'global',
                mapHeight: 250,
                style: 'default',
              },
            ],
          },
        ],
      },
    ],
  }
}
