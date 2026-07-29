/* =================================================================
   ModelPricingTable — live per-model token pricing from Sub2API.
   Features: search/filter, clean channel names, mobile cards,
   popular model badges.
   ================================================================= */
'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'

/* =================================================================
   Types
   ================================================================= */
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

/* =================================================================
   Channel name normalization
   ================================================================= */
const CHANNEL_LABELS: Record<string, string> = {
  'Cloud Lite External': 'Keyvera Lite',
  'Cloud Plus External': 'Keyvera Plus',
  'Cloud Pro External': 'Keyvera Pro',
  'Cloud Max External': 'Keyvera Max',
  'Cloud Codex Pro External': 'Keyvera Codex',
  'Grok External': 'Grok',
  'Zhipu External': 'Zhipu AI',
  'Kimi External': 'Kimi',
  'DeepSeek External': 'DeepSeek',
}

const POPULAR_MODELS = new Set([
  'claude-sonnet-5',
  'claude-haiku-4-5',
  'claude-opus-4-8',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'deepseek-v3.2',
  'deepseek-r1',
  'grok-3',
])

function cleanName(raw: string): string {
  return CHANNEL_LABELS[raw] || raw.replace(/\s*External\s*/g, '').trim()
}

function formatPrice(usdPer1M: number): string {
  if (usdPer1M === 0) return '—'
  if (usdPer1M < 0.01) return `$${usdPer1M.toFixed(4)}`
  return `$${usdPer1M.toFixed(2)}`
}

/* =================================================================
   Mobile model card
   ================================================================= */
function ModelCard({ m, hasCache }: { m: ModelPrice; hasCache: boolean }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-medium text-foreground">{m.model}</span>
        {POPULAR_MODELS.has(m.model) && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary uppercase tracking-wide">
            Popular
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-muted-foreground">Input</span>
        <span className="text-right font-mono tabular-nums font-medium text-primary">
          {formatPrice(m.input)}
        </span>
        <span className="text-muted-foreground">Output</span>
        <span className="text-right font-mono tabular-nums">{formatPrice(m.output)}</span>
        {hasCache && (
          <>
            <span className="text-muted-foreground">Cache Write</span>
            <span className="text-right font-mono tabular-nums text-muted-foreground">
              {m.cache_write !== null ? formatPrice(m.cache_write) : '—'}
            </span>
            <span className="text-muted-foreground">Cache Read</span>
            <span className="text-right font-mono tabular-nums text-muted-foreground">
              {m.cache_read !== null ? formatPrice(m.cache_read) : '—'}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

/* =================================================================
   Main component
   ================================================================= */
export function ModelPricingTable({
  channels: initialChannels,
}: {
  channels: ChannelPricing[]
}) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return initialChannels

    return initialChannels
      .map((ch) => ({
        ...ch,
        models: ch.models.filter((m) => m.model.toLowerCase().includes(q)),
      }))
      .filter((ch) => ch.models.length > 0)
  }, [initialChannels, search])

  if (initialChannels.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Pricing data is being refreshed. Check back shortly.</p>
      </div>
    )
  }

  return (
    <div className="container">
      {/* ── Search ── */}
      <div className="mb-8">
        <div className="relative mx-auto max-w-md">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search models (e.g. claude-sonnet, gpt, grok)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        {search && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {filtered.reduce((sum, ch) => sum + ch.models.length, 0)} model{filtered.reduce((sum, ch) => sum + ch.models.length, 0) !== 1 ? 's' : ''} matching &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* ── Tables ── */}
      {filtered.map((channel) => {
        const hasCache = channel.models.some(
          (m) => m.cache_write !== null || m.cache_read !== null,
        )

        return (
          <div key={channel.id} className="mb-12">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {cleanName(channel.name)}
            </h3>

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
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
                    {hasCache && (
                      <>
                        <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                          Cache Write
                        </th>
                        <th className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap">
                          Cache Read
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {channel.models.map((m) => (
                    <tr
                      key={m.model}
                      className={cn(
                        'border-b border-border/50 transition-colors',
                        POPULAR_MODELS.has(m.model)
                          ? 'bg-primary/[0.03] hover:bg-primary/[0.06]'
                          : 'hover:bg-secondary/30',
                      )}
                    >
                      <td className="px-4 py-2.5 font-mono text-xs">
                        <span>{m.model}</span>
                        {POPULAR_MODELS.has(m.model) && (
                          <span className="ml-2 rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.6rem] font-semibold text-primary uppercase">
                            Popular
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums font-medium text-primary">
                        {formatPrice(m.input)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums">
                        {formatPrice(m.output)}
                      </td>
                      {hasCache && (
                        <>
                          <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-muted-foreground">
                            {m.cache_write !== null ? formatPrice(m.cache_write) : '—'}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-muted-foreground">
                            {m.cache_read !== null ? formatPrice(m.cache_read) : '—'}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-3">
              {channel.models.map((m) => (
                <ModelCard key={m.model} m={m} hasCache={hasCache} />
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No models match &ldquo;{search}&rdquo;. Try a different search term.
          </p>
        </div>
      )}
    </div>
  )
}
