'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="size-9" aria-hidden="true" />
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="inline-flex size-9 items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-accent transition-colors shrink-0"
    >
      <svg
        className="size-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {theme === 'dark' ? (
          /* Sun icon */
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </>
        ) : (
          /* Moon icon */
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        )}
      </svg>
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
    </button>
  )
}
