/* =================================================================
   ModelPricingBlock — fetches live per-model token pricing from
   Sub2API and renders it as a grouped comparison table.
   ================================================================= */
import React from 'react'

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
      next: { revalidate: 3600 }, // ISR: revalidate every hour
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

function formatPrice(usdPer1M: number): string {
  if (usdPer1M === 0) return '—'
  if (usdPer1M < 0.01) return `$${usdPer1M.toFixed(4)}`
  if (usdPer1M < 1) return `$${usdPer1M.toFixed(2)}`
  return `$${usdPer1M.toFixed(2)}`
}

export async function ModelPricingTable() {
  const channels = await fetchChannelPricing()

  if (channels.length === 0) {
    return (
      <section className="py-16">
        <div className="container text-center">
          <p className="text-muted-foreground">Pricing data is being refreshed. Check back shortly.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-balance">Per-model token pricing</h2>
          <p className="mt-3 text-[var(--text-body)]">
            All prices in USD per 1 million tokens. Live data from our wholesale upstream.
          </p>
        </div>

        {channels.map((channel) => (
          <div key={channel.id} className="mb-12">
            <h3 className="mb-4 text-lg font-semibold text-foreground">{channel.name}</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left font-medium text-foreground">Model</th>
                    <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                      Input
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                      Output
                    </th>
                    {channel.models.some((m) => m.cache_write !== null) && (
                      <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                        Cache Write
                      </th>
                    )}
                    {channel.models.some((m) => m.cache_read !== null) && (
                      <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                        Cache Read
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {channel.models.map((m) => (
                    <tr
                      key={m.model}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                        {m.model}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-primary font-medium">
                        {formatPrice(m.input)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums">
                        {formatPrice(m.output)}
                      </td>
                      {channel.models.some((x) => x.cache_write !== null) && (
                        <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-muted-foreground">
                          {m.cache_write !== null ? formatPrice(m.cache_write) : '—'}
                        </td>
                      )}
                      {channel.models.some((x) => x.cache_read !== null) && (
                        <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-muted-foreground">
                          {m.cache_read !== null ? formatPrice(m.cache_read) : '—'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Prices are pulled live from our upstream provider and updated hourly. All prices are pass-through
          — Keyvera does not add per-token markup.
        </p>
      </div>
    </section>
  )
}
