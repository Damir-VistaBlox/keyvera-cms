import React from 'react'
import Link from 'next/link'

import type { Header as HeaderType } from '@/payload-types'

export type NavItem = NonNullable<HeaderType['navItems']>[number]

/**
 * Resolve a CMS nav item to a bare { href, label, external? } tuple
 * so we can render plain <a> tags on the server (no client JS needed for static nav).
 */
export function resolveNavItem(item: NavItem): { href: string; label: string; external: boolean } | null {
  const link = item.link
  if (!link) return null

  let href = ''
  if (link.type === 'reference' && link.reference?.value) {
    const ref = link.reference.value as any
    const relTo = link.reference.relationTo
    href = relTo === 'pages' ? `/${ref.slug}` : `/${relTo}/${ref.slug}`
  } else if (link.type === 'custom' && link.url) {
    href = link.url
  }

  if (!href) return null
  return {
    href,
    label: link.label || '',
    external: link.newTab || false,
  }
}

/** Server-rendered static nav — visible to crawlers even without JS */
export async function HeaderNav({ data }: { data: HeaderType | null }) {
  const items = data?.navItems || []

  return (
    <nav className="hidden md:flex flex-1 items-center justify-center gap-1" aria-label="Primary" itemScope itemType="https://schema.org/SiteNavigationElement">
      <ul className="flex items-center gap-1 list-none p-0 m-0" role="list">
        {items.map((item, i) => {
          const resolved = resolveNavItem(item)
          if (!resolved) return null

          return (
            <li key={i} itemProp="name">
              <Link
                href={resolved.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors no-underline rounded-md"
                {...(resolved.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                itemProp="url"
                data-nav-link={resolved.href}
              >
                {resolved.label}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            href="/search"
            className="ml-1 inline-flex size-9 items-center justify-center rounded-md text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
            aria-label="Search"
            itemProp="url"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="sr-only">Search</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
