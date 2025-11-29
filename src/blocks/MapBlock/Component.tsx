import React from 'react'
import type { MapBlock as MapBlockType, BusinessInfo } from '@/payload-types'
import { getSpacingClasses } from '@/fields/spacing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Props = MapBlockType & {
  id?: string
}

// Helper function to extract iframe src from embed code
function extractEmbedUrl(embedCode?: string | null): string | undefined {
  if (!embedCode) return undefined

  // If it's already a URL, return it
  if (embedCode.startsWith('http')) {
    return embedCode
  }

  // Extract src from iframe tag
  const srcMatch = embedCode.match(/src="([^"]+)"/)
  return srcMatch ? srcMatch[1] : undefined
}

export const MapBlock: React.FC<Props> = async (props) => {
  const { mapSource = 'global', customMap, spacing } = props

  let mapTitle: string | undefined
  let embedURL: string | undefined
  let height = 400
  let borderRadius = 8
  let width: 'full' | 'container' | 'narrow' = 'full'

  // Get map data based on source
  if (mapSource === 'global') {
    // Fetch from BusinessInfo global
    const payload = await getPayload({ config: configPromise })
    const businessInfo = (await payload.findGlobal({
      slug: 'business-info',
    })) as BusinessInfo

    if (businessInfo?.googleMapsEmbed) {
      mapTitle = businessInfo.businessName ?? undefined
      embedURL = extractEmbedUrl(businessInfo.googleMapsEmbed)
    }
  } else if (mapSource === 'custom' && customMap) {
    mapTitle = customMap.mapTitle ?? undefined
    embedURL = customMap.embedURL ?? undefined
    height = customMap.height ?? 400
    borderRadius = customMap.borderRadius ?? 8
    width = customMap.width ?? 'full'
  }

  // If no map data available, show nothing
  if (!embedURL) {
    return null
  }

  const spacingClass = getSpacingClasses(spacing)

  // Width classes
  const widthMap = {
    full: 'w-full',
    container: 'max-w-6xl mx-auto',
    narrow: 'max-w-4xl mx-auto',
  }

  const widthClass = (width && widthMap[width]) || widthMap.full

  return (
    <div
      className={`theme-google-map ${spacingClass}`}
    >
      <div className={widthClass}>
        {mapTitle && (
          <h2 className="mb-6 text-3xl font-bold text-center md:text-left">{mapTitle}</h2>
        )}

        <div className="relative overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
          <iframe
            src={embedURL}
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={mapTitle || 'Google Maps Location'}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
