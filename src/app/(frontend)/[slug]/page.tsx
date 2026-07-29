import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { KeyveraHome } from '@/components/Home/KeyveraHome'
import { homeStatic } from '@/endpoints/seed/home-static'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  // Root `/` is handled by page.tsx; if someone hits /home, show Keyvera home
  // unless CMS has a full layout.
  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (decodedSlug === 'home') {
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
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const contentWidth = (page as any).contentWidth as string | undefined

  return (
    <article className="pt-8 pb-24 md:pt-12">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <div className={contentWidth === 'narrow' ? 'container max-w-prose' : ''}>
        <RenderBlocks blocks={layout} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = (await queryPageBySlug({ slug: decodedSlug })) || (decodedSlug === 'home' ? homeStatic : null)
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  } catch {
    return null
  }
})
