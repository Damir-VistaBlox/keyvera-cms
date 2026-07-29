'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { ActiveNavClient } from './ActiveNavClient'
import { Button } from '@/components/ui/button'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: HeaderType | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  const isRoot = pathname === '/'

  return (
    <header
      className="site-header"
      itemScope
      itemType="https://schema.org/WPHeader"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container header-inner">
        {/* LOGO — schema.org Organization */}
        <Link
          href="/"
          className="shrink-0"
          aria-label="KEYVERA home"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="KEYVERA" />
          <meta itemProp="url" content="https://keyvera.cloud" />
          <Logo loading="eager" priority="high" />
        </Link>

        {/* SERVER-NAV — static HTML, crawlable without JS */}
        <HeaderNav data={data} />

        {/* ACTIONS (client-only — theme toggle, CTAs) */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeSelector />
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link
                href="https://app.keyvera.cloud/login"
                rel="noopener noreferrer"
              >
                Sign In
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link
                href="https://app.keyvera.cloud/register"
                rel="noopener noreferrer"
              >
                Get API Key
              </Link>
            </Button>
          </div>

          {/* MOBILE hamburger */}
          <MobileNav data={data} />
        </div>
      </div>

      {/* aria-current hydration — runs after mount, no visual change */}
      <ActiveNavClient />
    </header>
  )
}
