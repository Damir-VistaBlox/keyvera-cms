'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { NavigationMenuItem } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { ActiveNavClient } from './ActiveNavClient'
import { Button } from '@/components/ui/button'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  navItems: NavigationMenuItem[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ navItems }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header
      className="site-header"
      itemScope
      itemType="https://schema.org/WPHeader"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container header-inner">
        <Link href="/" className="shrink-0" aria-label="KEYVERA home" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="KEYVERA" />
          <meta itemProp="url" content="https://keyvera.cloud" />
          <Logo loading="eager" priority="high" />
        </Link>

        {/* Server-rendered nav — static HTML, crawlable without JS */}
        <HeaderNav items={navItems} />

        {/* Client actions */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeSelector />
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="https://app.keyvera.cloud/login" rel="noopener noreferrer">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="https://app.keyvera.cloud/register" rel="noopener noreferrer">Get API Key</Link>
            </Button>
          </div>
          <MobileNav items={navItems} />
        </div>
      </div>

      <ActiveNavClient />
    </header>
  )
}
