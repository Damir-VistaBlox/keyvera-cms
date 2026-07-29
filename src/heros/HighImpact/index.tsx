'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Link from 'next/link'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-[70vh] items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,104,208,0.35), transparent), linear-gradient(180deg, #000030 0%, #000020 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,144,253,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,144,253,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10 mb-8 flex items-center justify-center pt-28 pb-16">
        <div className="max-w-[40rem] md:text-center">
          {richText && (
            <RichText className="mb-6 text-white [&_h1]:text-white [&_p]:text-white/70" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-3 md:justify-center">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {media && typeof media === 'object' ? (
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-30">
          <Media fill imgClassName="object-cover" priority resource={media} />
        </div>
      ) : null}
    </div>
  )
}
