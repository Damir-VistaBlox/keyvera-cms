/* =================================================================
   Server wrapper — fetches Sub2API channels, passes to client table.
   ISR-revalidated every hour.
   ================================================================= */
import React from 'react'
import { ModelPricingTable } from './ModelPricingTable'

interface ModelPrice {
  model: string
  input: number
  output: number
  cache_write: number | null
  cache_read: number | null
}

interface ChannelPricing {
  id: number
  name: string
  models: ModelPrice[]
}

const SUB2API_BASE = 'https://api.keyvera.cloud'
const ADMIN_KEY = 'admin-426b7da7096a4b464cec004d8389f922afb2c4d0309245710d30c21bff293769'

async function fetchChannelPricing(): Promise<ChannelPricing[]> {
  try {
    const res = await fetch(`${SUB2API_BASE}/api/v1/admin/channels`, {
      headers: { 'x-api-key': ADMIN_KEY },
      next: { revalidate: 3600 },
    })
    const json = await res.json()
    const channels = json?.data?.items || []

    return channels
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
              cache_write:
                typeof mp.cache_write_price === 'number' ? mp.cache_write_price * 1_000_000 : null,
              cache_read:
                typeof mp.cache_read_price === 'number' ? mp.cache_read_price * 1_000_000 : null,
            })),
          )
          .filter((m: ModelPrice) => m.model),
      }))
      .filter((ch: ChannelPricing) => ch.models.length > 0)
  } catch {
    return []
  }
}

export async function PricingTableSection() {
  const channels = await fetchChannelPricing()

  return (
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
  )
}
