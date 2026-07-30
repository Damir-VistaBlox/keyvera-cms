'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'
import type { ModelPrice, ChannelPricing } from '@/components/pricing/ModelPricingTable'

const PREDEFINED_SCENARIOS = [
  { label: 'Light user (10K/month)', input: 10_000, output: 10_000 },
  { label: 'Regular user (100K/month)', input: 100_000, output: 100_000 },
  { label: 'Developer (1M/month)', input: 1_000_000, output: 1_000_000 },
  { label: 'Heavy user (10M/month)', input: 10_000_000, output: 10_000_000 },
  { label: 'Application (100M/month)', input: 100_000_000, output: 100_000_000 },
  { label: 'Custom', input: null, output: null },
]

function formatTokens(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function formatUSD(cents: number): string {
  if (cents < 0.01) return `$${cents.toFixed(4)}`
  if (cents < 1) return `$${cents.toFixed(2)}`
  return `$${cents.toFixed(2)}`
}

export function SavingsCalculator({
  channels,
}: {
  channels: ChannelPricing[]
}) {
  // Flatten all models with channel context
  const allModels = useMemo(() => {
    const unique = new Map<string, { model: string; channel: string; input: number; output: number }>()
    for (const ch of channels) {
      for (const m of ch.models) {
        if (!unique.has(m.model)) {
          unique.set(m.model, {
            model: m.model,
            channel: ch.name.replace(/\s*External\s*/g, '').trim(),
            input: m.input,
            output: m.output,
          })
        }
      }
    }
    return Array.from(unique.values()).sort((a, b) => a.model.localeCompare(b.model))
  }, [channels])

  // Group by channel for the select
  const channelGroups = useMemo(() => {
    const groups = new Map<string, typeof allModels>()
    for (const m of allModels) {
      const g = groups.get(m.channel) || []
      g.push(m)
      groups.set(m.channel, g)
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [allModels])

  const [selectedModel, setSelectedModel] = useState('')
  const [inputTokens, setInputTokens] = useState('100000')
  const [outputTokens, setOutputTokens] = useState('100000')
  const [scenario, setScenario] = useState('')

  const model = allModels.find((m) => m.model === selectedModel)

  // Handle scenario selection
  const onScenarioChange = (label: string) => {
    setScenario(label)
    const s = PREDEFINED_SCENARIOS.find((s) => s.label === label)
    if (s && s.input !== null && s.output !== null) {
      setInputTokens(s.input.toString())
      setOutputTokens(s.output.toString())
    }
  }

  // Calculations
  const input = parseInt(inputTokens) || 0
  const output = parseInt(outputTokens) || 0
  const keyveraInputCost = model ? (input / 1_000_000) * model.input : 0
  const keyveraOutputCost = model ? (output / 1_000_000) * model.output : 0
  const keyveraTotal = keyveraInputCost + keyveraOutputCost
  const retailTotal = keyveraTotal * 2 // 50% retail rule
  const savings = retailTotal - keyveraTotal
  const savingsPct = retailTotal > 0 ? ((savings / retailTotal) * 100).toFixed(0) : '0'

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-balance">See how much you save</h2>
        <p className="mt-3 text-[var(--text-body)]">
          Pick a model, enter your estimated monthly usage, and compare Keyvera&apos;s wholesale
          pricing against retail API rates.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
          {/* Model picker */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Select a model...</option>
              {channelGroups.map(([channel, models]) => (
                <optgroup key={channel} label={channel}>
                  {models.map((m) => (
                    <option key={m.model} value={m.model}>
                      {m.model}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Usage presets */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Usage scenario
            </label>
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_SCENARIOS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => onScenarioChange(s.label)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium transition-colors border',
                    scenario === s.label
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Token inputs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Input tokens
              </label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => { setInputTokens(e.target.value); setScenario('') }}
                placeholder="100000"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <span className="mt-1 block text-[0.65rem] text-muted-foreground">
                {formatTokens(input)} tokens
              </span>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Output tokens
              </label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => { setOutputTokens(e.target.value); setScenario('') }}
                placeholder="100000"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <span className="mt-1 block text-[0.65rem] text-muted-foreground">
                {formatTokens(output)} tokens
              </span>
            </div>
          </div>

          {/* Results */}
          {model ? (
            <div className="rounded-lg border border-border bg-secondary/30 p-5">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Keyvera</p>
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    {formatUSD(keyveraTotal)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {model.model} · {model.channel}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Retail estimate</p>
                  <p className="text-2xl font-bold text-muted-foreground/60 tabular-nums line-through decoration-muted-foreground/30">
                    {formatUSD(retailTotal)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Official API pricing
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-md bg-success/10 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-success">
                  You save {formatUSD(savings)} ({savingsPct}%)
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Keyvera wholesale pricing is 50% of retail. All models, no exceptions.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Retail estimate is the model&apos;s official API price per 1M tokens — typically double the Keyvera rate.
                  Actual retail prices may vary by provider tier and commitment level.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Select a model above to see your estimated savings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
