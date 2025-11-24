import type { Form, Contact, Address } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
  contact: Contact
  address: Address
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
  contact,
  address,
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
        blockType: 'formBlock',
        form: typeof contactForm.id === 'string' ? contactForm.id : String(contactForm.id),
        showContactInfo: true,
        contact: typeof contact.id === 'string' ? contact.id : String(contact.id),
        enableIntro: true,
        introContent: {
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
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Suntem aici să te ajutăm! Completează formularul de mai jos și te vom contacta în cel mai scurt timp.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
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
        blockType: 'mapBlock',
        mapSource: 'fromCollection',
        address: typeof address.id === 'string' ? address.id : String(address.id),
        showBorder: true,
        topSpacing: 'large',
      },
    ],
  }
}
