import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Logo } from '@/payload-types'

export async function Header() {
  const [headerData, logoData] = await Promise.all([
    getCachedGlobal('header', 1)() as Promise<Header>,
    getCachedGlobal('logo', 1)() as Promise<Logo>,
  ])

  return <HeaderClient data={headerData} logo={logoData} />
}
