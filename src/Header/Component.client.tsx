'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="site-header"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container header-inner">
        <Link href="/" className="shrink-0" aria-label="KEYVERA home">
          <Logo loading="eager" priority="high" />
        </Link>

        <HeaderNav data={data} />

        <div className="flex items-center gap-3 shrink-0">
          <ThemeSelector />
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="https://app.keyvera.cloud/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="https://app.keyvera.cloud/register">Get API Key</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
