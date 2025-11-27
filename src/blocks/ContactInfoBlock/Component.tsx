import React from 'react'
import type { BusinessInfo } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ContactInfoClient } from './Component.client'

interface ContactInfoBlockProps {
  source?: 'global' | 'custom' | null
  title?: string | null
  customData?: {
    address?: string | null
    phone?: string | null
    email?: string | null
  } | null
  showMap?: boolean | null
  mapSource?: 'global' | 'custom' | null
  customMapUrl?: string | null
  mapHeight?: number | null
  style?: 'default' | 'compact' | 'card' | null
  spacing?: {
    marginTop?: string | null
    marginBottom?: string | null
  } | null
}

export const ContactInfoBlockComponent: React.FC<ContactInfoBlockProps> = async (props) => {
  const {
    source = 'global',
    title,
    customData,
    showMap = true,
    mapSource = 'global',
    customMapUrl,
    mapHeight = 250,
    style = 'default',
    spacing,
  } = props

  let contactInfo = {
    address: customData?.address || '',
    phone: customData?.phone || '',
    email: customData?.email || '',
  }

  let mapUrl = customMapUrl || ''

  // Fetch from global if source is global
  if (source === 'global' || mapSource === 'global') {
    const payload = await getPayload({ config: configPromise })
    const businessInfo = (await payload.findGlobal({
      slug: 'business-info',
    })) as BusinessInfo

    if (source === 'global' && businessInfo) {
      contactInfo = {
        address: businessInfo.address || '',
        phone: businessInfo.phone || '',
        email: businessInfo.email || '',
      }
    }

    if (mapSource === 'global' && businessInfo?.googleMapsEmbed) {
      mapUrl = businessInfo.googleMapsEmbed
    }
  }

  return (
    <ContactInfoClient
      title={title}
      address={contactInfo.address}
      phone={contactInfo.phone}
      email={contactInfo.email}
      showMap={showMap}
      mapUrl={mapUrl}
      mapHeight={mapHeight}
      style={style}
      spacing={spacing}
    />
  )
}
