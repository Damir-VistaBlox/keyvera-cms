import React from 'react'
import Link from 'next/link'

import type { NavigationMenuItem } from '@/payload-types'

/** Map external link detection */
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

function NavLink({ item }: { item: NavigationMenuItem }) {
  const external = isExternal(item.href || '')

  return (
    <li className="flex items-center gap-1.5">
      <Link
        href={item.href || '#'}
        className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors no-underline rounded-md"
        data-nav-link={item.href || ''}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.title}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className="absolute left-0 top-full z-30 mt-1 hidden min-w-[12rem] rounded-lg border border-border bg-card p-1 shadow-lg group-hover:block" role="list">
          {item.children.map((child) => (
            <li key={`${item.id}-${child.id}`}>
              <Link
                href={child.href || '#'}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-accent hover:text-primary transition-colors no-underline"
                {...(isExternal(child.href || '') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

interface Props {
  items: NavigationMenuItem[]
}

/** Server-rendered nav — Googlebot sees all links in static HTML */
export async function HeaderNav({ items }: Props) {
  return (
    <nav
      className="hidden md:flex flex-1 items-center justify-center gap-1"
      aria-label="Primary"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul className="flex items-center gap-1 list-none p-0 m-0" role="list">
        {items.map((item) => (
          <li key={item.id} itemProp="name" className="relative group">
            <NavLink item={item} />
          </li>
        ))}

        <li>
          <Link
            href="/search"
            className="ml-1 inline-flex size-9 items-center justify-center rounded-md text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
            aria-label="Search"
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
