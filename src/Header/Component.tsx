import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  try {
    const headerData = await getCachedGlobal('header', 1)()
    return <HeaderClient data={headerData} />
  } catch {
    // DB not yet initialized — render header with empty data
    return <HeaderClient data={null as any} />
  }
}
