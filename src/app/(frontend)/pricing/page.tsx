import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { PricingTableSection } from '@/components/pricing/PricingTableSection'
import HowPricingWorks from '@/components/pricing/HowPricingWorks'
import PageClient from '../[slug]/page.client'

export const dynamic = 'force-dynamic'

const queryPricingPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: { slug: { equals: 'pricing' } },
    })
    return result.docs?.[0] || null
  } catch {
    return null
  }
})

export default async function PricingPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryPricingPage()

  return (
    <>
      <PageClient />
      {draft && <LivePreviewListener />}

      {page ? (
        <article className="pb-12">
          <RenderHero {...page.hero} />
          <RenderBlocks blocks={page.layout} />
        </article>
      ) : null}

      {/* How pricing works */}
      <HowPricingWorks />

      {/* Live per-model token pricing — ISR, revalidated hourly */}
      <PricingTableSection />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPricingPage()
  return generateMeta({ doc: page })
}
