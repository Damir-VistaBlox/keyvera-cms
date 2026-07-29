'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'

/* =================================================================
   Types
   ================================================================= */
export interface ModelPrice {
  model: string
  input: number
  output: number
  cache_write: number | null
  cache_read: number | null
}

export interface ChannelPricing {
  id: number
  name: string
  models: ModelPrice[]
}

/* ── Provider icon map (Lobe Icons) ── */
const PROVIDER_ICONS: Record<string, string> = {
  'gpt-': '/icons/openai.svg',
  'o1-': '/icons/openai.svg',
  'o3-': '/icons/openai.svg',
  'claude-': '/icons/claude-color.svg',
  'deepseek-': '/icons/deepseek-color.svg',
  'grok-': '/icons/grok.svg',
  'gemini-': '/icons/google-color.svg',
  'llama-': '/icons/meta-color.svg',
  'mistral-': '/icons/mistral-color.svg',
  'glm-': '/icons/zhipu-color.svg',
  'zhipu-': '/icons/zhipu-color.svg',
  'kimi-': '/icons/kimi-color.svg',
  'minimax-': '/icons/minimax-color.svg',
}

function getProviderIcon(model: string): string | null {
  for (const [prefix, icon] of Object.entries(PROVIDER_ICONS)) {
    if (model.toLowerCase().startsWith(prefix)) return icon
  }
  return null
}

/* ── Popular models ── */
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

/* ── Helpers ── */
function cleanName(raw: string): string {
  return raw.replace(/\s*External\s*/g, '').trim()
}

function formatPrice(usdPer1M: number): string {
  if (usdPer1M === 0) return '—'
  if (usdPer1M < 0.01) return `$${usdPer1M.toFixed(4)}`
  return `$${usdPer1M.toFixed(2)}`
}

/* =================================================================
   Mobile card
   ================================================================= */
function ModelCard({ m, hasCache }: { m: ModelPrice; hasCache: boolean }) {
  const icon = getProviderIcon(m.model)

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2.5">
        {icon && (
          <img
            src={icon}
            alt=""
            className="size-5 object-contain shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="font-mono text-sm font-medium text-foreground">{m.model}</span>
        {POPULAR_MODELS.has(m.model) && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold text-primary uppercase tracking-wide">
            Popular
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        <span className="text-muted-foreground">Input / 1M tok</span>
        <span className="text-right font-mono tabular-nums font-medium text-primary">
          {formatPrice(m.input)}
        </span>
        <span className="text-muted-foreground">Output / 1M tok</span>
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
   ModelPricingTable
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
        models: ch.models.filter(
          (m) =>
            m.model.toLowerCase().includes(q) ||
            ch.name.toLowerCase().includes(q),
        ),
      }))
      .filter((ch) => ch.models.length > 0)
  }, [initialChannels, search])

  const totalModels = filtered.reduce((sum, ch) => sum + ch.models.length, 0)

  if (initialChannels.length === 0) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">
          Pricing data is being refreshed. Check back shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="container">
      {/* ── Search ── */}
      <div className="mb-10">
        <div className="relative mx-auto max-w-xl">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
            placeholder="Search models or channels (e.g. claude-sonnet, gpt, grok)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
            aria-label="Search models"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </button>
          )}
        </div>
        {search && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {totalModels} model{totalModels !== 1 ? 's' : ''} matching &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* ── Channel tables ── */}
      {filtered.map((channel) => {
        const hasCache = channel.models.some(
          (m) => m.cache_write !== null || m.cache_read !== null,
        )

        return (
          <div key={channel.id} className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                {cleanName(channel.name)}
              </h3>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {channel.models.length} model{channel.models.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                      Input
                      <span className="block text-[0.6rem] font-normal text-muted-foreground normal-case tracking-normal">per 1M tokens</span>
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                      Output
                      <span className="block text-[0.6rem] font-normal text-muted-foreground normal-case tracking-normal">per 1M tokens</span>
                    </th>
                    {hasCache && (
                      <>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                          Cache Write
                          <span className="block text-[0.6rem] font-normal text-muted-foreground normal-case tracking-normal">per 1M tokens</span>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                          Cache Read
                          <span className="block text-[0.6rem] font-normal text-muted-foreground normal-case tracking-normal">per 1M tokens</span>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {channel.models.map((m) => {
                    const icon = getProviderIcon(m.model)
                    const isPopular = POPULAR_MODELS.has(m.model)

                    return (
                      <tr
                        key={m.model}
                        className={cn(
                          'border-b border-border/40 transition-colors group',
                          isPopular
                            ? 'bg-primary/[0.02] hover:bg-primary/[0.05]'
                            : 'hover:bg-secondary/30',
                        )}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            {icon && (
                              <img
                                src={icon}
                                alt=""
                                className="size-5 object-contain shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            <span className="font-mono text-xs text-foreground group-hover:text-foreground">
                              {m.model}
                            </span>
                            {isPopular && (
                              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.6rem] font-semibold text-primary uppercase tracking-wide">
                                Popular
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs tabular-nums font-medium text-primary">
                          {formatPrice(m.input)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">
                          {formatPrice(m.output)}
                        </td>
                        {hasCache && (
                          <>
                            <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">
                              {m.cache_write !== null ? formatPrice(m.cache_write) : '—'}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">
                              {m.cache_read !== null ? formatPrice(m.cache_read) : '—'}
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {channel.models.map((m) => (
                <ModelCard key={m.model} m={m} hasCache={hasCache} />
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && search && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-foreground">No models found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            No models match &ldquo;{search}&rdquo;. Try a different search term.
          </p>
        </div>
      )}
    </div>
  )
}
