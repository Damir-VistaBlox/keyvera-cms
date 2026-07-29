'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType | null }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="hidden md:flex flex-1 items-center justify-center gap-1" aria-label="Primary">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors no-underline"
          />
        )
      })}
      <Link
        href="/search"
        className="ml-1 inline-flex size-9 items-center justify-center rounded-md text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="size-4" />
      </Link>
    </nav>
  )
}
