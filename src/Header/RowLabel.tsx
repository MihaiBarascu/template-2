'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const rowNum = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  let label = 'Row'

  if (data?.data?.itemType === 'socialMedia') {
    const platforms = data?.data?.socialPlatforms
    if (platforms && platforms.length > 0) {
      label = `${rowNum}: Social Media (${platforms.join(', ')})`
    } else {
      label = `${rowNum}: Social Media`
    }
  } else if (data?.data?.itemType === 'linkWithSubItems') {
    const subItemsCount = data?.data?.subItems?.length || 0
    const parentLabel = data?.data?.parentLink?.label || 'Dropdown'
    label = `${rowNum}: ${parentLabel} (${subItemsCount} sub-items)`
  } else if (data?.data?.link?.label) {
    label = `${rowNum}: ${data?.data?.link?.label}`
  }

  return <div>{label}</div>
}
