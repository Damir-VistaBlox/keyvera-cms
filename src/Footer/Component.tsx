import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  let navItems: any[] = []

  try {
    const footerData = await getCachedGlobal('footer', 1)()
    navItems = footerData?.navItems || []
  } catch {
    // fall through with empty nav
  }

  return (
    <footer className="site-footer">
      <div className="container py-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3 max-w-xs">
          <Link href="/" className="inline-flex w-fit" aria-label="KEYVERA home">
            <Logo light />
          </Link>
          <p className="text-sm text-white/60 leading-relaxed">
            One API for leading AI models. Developer-first gateway with unified access and
            predictable pricing.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          {navItems.length > 0 && (
            <nav className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5" aria-label="Footer">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="text-sm text-white/75 hover:text-white transition-colors no-underline"
                />
              ))}
            </nav>
          )}
          <ThemeSelector />
        </div>
      </div>

      <div className="container border-t border-white/10 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/45">
        <span>© {new Date().getFullYear()} KEYVERA. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white/80 no-underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white/80 no-underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
