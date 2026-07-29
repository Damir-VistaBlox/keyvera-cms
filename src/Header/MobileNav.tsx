'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import type { Header as HeaderType } from '@/payload-types'
import { resolveNavItem } from './Nav'

export function MobileNav({ data }: { data: HeaderType | null }) {
  const [open, setOpen] = useState(false)
  const items = data?.navItems || []

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="md:hidden inline-flex size-10 items-center justify-center rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </>
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-over drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-card shadow-2xl transition-transform duration-200 ease-out md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full p-6 pt-14">
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 size-10 inline-flex items-center justify-center rounded-md text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {items.map((item, i) => {
              const resolved = resolveNavItem(item)
              if (!resolved) return null
              return (
                <Link
                  key={i}
                  href={resolved.href}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors no-underline"
                  {...(resolved.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={close}
                >
                  {resolved.label}
                </Link>
              )
            })}
            <Link
              href="/search"
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors no-underline"
              onClick={close}
            >
              Search
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
            <Button asChild variant="ghost" size="lg" className="justify-start">
              <Link href="https://app.keyvera.cloud/login" onClick={close}>
                Sign In
              </Link>
            </Button>
            <Button asChild size="lg" className="justify-start">
              <Link href="https://app.keyvera.cloud/register" onClick={close}>
                Get API Key
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
