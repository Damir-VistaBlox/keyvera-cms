import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { HeaderClient } from './Component.client'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { BreadcrumbCrumb } from '@/components/Breadcrumbs'

export async function Header() {
  let headerData = null

  try {
    headerData = await getCachedGlobal('header', 1)()
  } catch {
    // DB not initialized — render with empty data
  }

  return <HeaderClient data={headerData as any} />
}
