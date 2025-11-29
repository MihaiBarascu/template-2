import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Logo, BusinessInfo } from '@/payload-types'

export async function Header() {
  const [headerData, logoData, businessInfo] = await Promise.all([
    getCachedGlobal('header', 1)() as Promise<Header>,
    getCachedGlobal('logo', 1)() as Promise<Logo>,
    getCachedGlobal('business-info', 1)() as Promise<BusinessInfo>,
  ])

  return <HeaderClient data={headerData} logo={logoData} businessInfo={businessInfo} />
}
