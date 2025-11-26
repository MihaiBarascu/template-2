import React from 'react'
import type { MapBlock as MapBlockType, Address } from '@/payload-types'

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
  const { mapSource = 'fromCollection', address, customMap, showBorder = true, topSpacing = 'normal' } = props

  let mapTitle: string | undefined
  let embedURL: string | undefined
  let height = 400
  let borderRadius = 8
  let width: 'full' | 'container' | 'narrow' = 'full'

  // Get map data from Addresses collection or use custom settings
  if (mapSource === 'fromCollection' && address) {
    // Address can be an ID or a populated object
    const addressData = typeof address === 'object' ? (address as Address) : null

    if (addressData) {
      mapTitle = addressData.title ?? undefined
      embedURL = extractEmbedUrl(addressData.googleMapsEmbed) ?? addressData.googleMapsUrl ?? undefined
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

  // Spacing classes
  const spacingMap = {
    none: 'mt-0 pt-0',
    small: 'mt-4 pt-4',
    normal: 'mt-10 pt-10',
    large: 'mt-16 pt-16',
  }

  const topSpacingClass = (topSpacing && spacingMap[topSpacing]) || spacingMap.normal

  // Width classes
  const widthMap = {
    full: 'w-full',
    container: 'max-w-6xl mx-auto',
    narrow: 'max-w-4xl mx-auto',
  }

  const widthClass = (width && widthMap[width]) || widthMap.full

  return (
    <div
      className={`theme-google-map ${showBorder ? 'border-t border-gray-200' : ''} ${topSpacingClass}`}
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
