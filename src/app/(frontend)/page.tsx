import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { KeyveraHome } from '@/components/Home/KeyveraHome'
import { homeStatic } from '@/endpoints/seed/home-static'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './[slug]/page.client'

export const dynamic = 'force-dynamic'

const queryHome = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: { slug: { equals: 'home' } },
    })
    return result.docs?.[0] || null
  } catch {
    return null
  }
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryHome()

  // Prefer full Keyvera marketing homepage until CMS home has real layout blocks
  const hasCmsLayout =
    page &&
    Array.isArray(page.layout) &&
    page.layout.length > 0 &&
    page.hero?.type &&
    page.hero.type !== 'none'

  if (!hasCmsLayout) {
    return (
      <>
        <PageClient />
        {draft && <LivePreviewListener />}
        <KeyveraHome />
      </>
    )
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      <PageClient />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await queryHome()) || homeStatic
  return generateMeta({ doc: page })
}
