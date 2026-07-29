import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { ModelPricingTable } from '@/components/pricing/ModelPricingTable'
import { SavingsCalculator } from '@/components/pricing/SavingsCalculator'
import HowPricingWorks from '@/components/pricing/HowPricingWorks'
import PageClient from '../[slug]/page.client'

export const dynamic = 'force-dynamic'

/* ── Sub2API data ── */
const SUB2API_BASE = 'https://api.keyvera.cloud'
const ADMIN_KEY = 'admin-426b7da7096a4b464cec004d8389f922afb2c4d0309245710d30c21bff293769'

async function fetchChannels() {
  try {
    const res = await fetch(`${SUB2API_BASE}/api/v1/admin/channels`, {
      headers: { 'x-api-key': ADMIN_KEY },
      next: { revalidate: 3600 },
    })
    const json = await res.json()
    return (json?.data?.items || [])
      .filter((ch: any) => ch.status === 'active')
      .map((ch: any) => ({
        id: ch.id,
        name: ch.name || `Channel ${ch.id}`,
        models: (ch.model_pricing || [])
          .flatMap((mp: any) =>
            (mp.models || []).map((model: string) => ({
              model,
              input: typeof mp.input_price === 'number' ? mp.input_price * 1_000_000 : 0,
              output: typeof mp.output_price === 'number' ? mp.output_price * 1_000_000 : 0,
              cache_write: typeof mp.cache_write_price === 'number' ? mp.cache_write_price * 1_000_000 : null,
              cache_read: typeof mp.cache_read_price === 'number' ? mp.cache_read_price * 1_000_000 : null,
            })),
          )
          .filter((m: any) => m.model),
      }))
      .filter((ch: any) => ch.models.length > 0)
  } catch {
    return []
  }
}

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
  const [page, channels] = await Promise.all([queryPricingPage(), fetchChannels()])

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

      {/* How pricing works — 3 steps + real-world example */}
      <HowPricingWorks />

      {/* Savings calculator */}
      <SavingsCalculator channels={channels} />

      {/* Live per-model token pricing */}
      <section className="py-12 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-balance">Per-model token pricing</h2>
          <p className="mt-3 text-[var(--text-body)]">
            All prices in USD per 1 million tokens. Live data from our wholesale upstream.
          </p>
        </div>

        <ModelPricingTable channels={channels} />

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Prices are pulled live from our upstream provider and updated hourly. All prices are
          pass-through — Keyvera does not add per-token markup.
        </p>
      </section>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPricingPage()
  return generateMeta({ doc: page })
}
