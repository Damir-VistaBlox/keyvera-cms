import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import { HeaderClient } from './Component.client'
import type { NavigationMenuItem } from '@/payload-types'

const GET_NAV = `
  query GetNavigation {
    Navigations(limit: 1, sort: "-createdAt") {
      docs {
        items
      }
    }
  }
`

async function fetchNavItems(): Promise<NavigationMenuItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'navigation' as any,
      limit: 1,
      depth: 3,
      sort: '-createdAt',
    })
    const doc = result.docs?.[0] as Record<string, any> | undefined
    return (doc?.items as NavigationMenuItem[]) || []
  } catch {
    return []
  }
}

export async function Header() {
  const items = await fetchNavItems()

  return <HeaderClient navItems={items} />
}
