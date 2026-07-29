'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Post-render hydration: adds aria-current="page" to the nav link
 * matching the current path. Runs client-side only — static HTML stays
 * fully crawlable without JS.
 */
export function ActiveNavClient() {
  const pathname = usePathname()

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')

    links.forEach((link) => {
      const href = link.getAttribute('data-nav-link') || ''
      if (href === '/' && pathname !== '/') {
        link.removeAttribute('aria-current')
        return
      }
      // Exact match for most pages; prefix match for blog/posts
      if (pathname === href || (href !== '/' && pathname.startsWith(href))) {
        link.setAttribute('aria-current', 'page')
      } else {
        link.removeAttribute('aria-current')
      }
    })
  }, [pathname])

  return null
}
