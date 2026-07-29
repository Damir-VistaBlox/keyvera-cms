'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const providers = [
  { name: 'OpenAI', blurb: "Access OpenAI's model family through the KEYVERA gateway." },
  { name: 'Anthropic', blurb: "Access Anthropic's model family through the KEYVERA gateway." },
  { name: 'Google', blurb: "Access Google's model family through the KEYVERA gateway." },
  { name: 'Mistral', blurb: "Access Mistral's model family through the KEYVERA gateway." },
  { name: 'Meta', blurb: "Access Meta's model family through the KEYVERA gateway." },
  { name: 'DeepSeek', blurb: "Access DeepSeek's model family through the KEYVERA gateway." },
]

const features = [
  {
    title: 'One shared balance',
    body: 'Top up once; the same balance works across models and providers.',
  },
  {
    title: 'Usage tracking',
    body: 'See requests, tokens, and spending in one dashboard.',
  },
  {
    title: 'API key management',
    body: 'Create and revoke keys from a single Keyvera account.',
  },
  {
    title: 'Switch models easily',
    body: 'Change the model ID without opening new provider accounts.',
    wide: true,
  },
  {
    title: 'Flexible billing',
    body: 'Pay-as-you-go or subscription — pick what fits your workload.',
    wide: true,
  },
  {
    title: 'Reliable & Fast',
    body: 'Provider fallback and model failover when traffic or upstreams shift.',
    full: true,
  },
]

const processSteps = [
  {
    n: '01',
    title: 'Integrate',
    body: 'Add one lightweight SDK or connect through a familiar OpenAI-compatible API.',
  },
  {
    n: '02',
    title: 'Choose',
    body: 'Select a model directly or route requests according to your application’s requirements.',
  },
  {
    n: '03',
    title: 'Scale',
    body: 'Use centralized infrastructure for larger workloads, provider changes, and failover.',
  },
]

const trustItems = [
  {
    title: 'Faster integration',
    body: 'Connect once instead of building a separate integration for every provider.',
  },
  {
    title: 'Centralized model operations',
    body: 'Manage authentication, usage, and routing from a single operational layer.',
  },
  {
    title: 'Easier provider experimentation',
    body: 'Test alternative models without rewriting application code.',
  },
  {
    title: 'Clearer usage visibility',
    body: 'See model usage across providers in one consistent view.',
  },
  {
    title: 'More flexible model selection',
    body: 'Adjust routing policy as requirements or providers change.',
  },
]

const sampleCurl = `curl https://api.keyvera.cloud/v1/chat/completions \\
  -H "Authorization: Bearer ***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-sonnet-4",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <h2 id={id} className="text-balance text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-[var(--text-body)] md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function KeyveraHome() {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleCurl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section
        id="top"
        aria-label="Introduction"
        className="relative overflow-hidden border-b border-border"
        data-theme="dark"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
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

        <div className="container relative z-10 py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
              ONE API · MULTIPLE AI PROVIDERS
            </p>
            <h1 className="text-balance text-white">Leading AI models. One unified API.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              Connect to leading AI providers through one clean API. Simplify integrations,
              centralize model usage, and route requests without rebuilding your application for
              every model.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://app.keyvera.cloud/register">Get API Key</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#models">Explore Models</Link>
              </Button>
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left shadow-[var(--glow-blue)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                  Quick request
                </span>
                <button
                  type="button"
                  onClick={onCopy}
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-[#c6cdd9]">
                <code>{sampleCurl}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section-pad border-b border-border py-16 md:py-24" aria-labelledby="how-it-works-heading">
        <div className="container">
          <SectionHeading
            id="how-it-works-heading"
            title="One integration. Every model."
            subtitle="Replace fragmented provider integrations with a single, consistent workflow designed to make model access easier to operate and scale."
          />
          <ol className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.n}>
                <Card className="h-full">
                  <span className="text-xs font-semibold tracking-[0.12em] text-primary">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-body)]">{step.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="section-pad border-b border-border bg-secondary/40 py-16 md:py-24" aria-labelledby="models-heading">
        <div className="container">
          <SectionHeading
            id="models-heading"
            title="Complete model access. One consistent interface."
            subtitle="Choose a primary model, configure routing behavior, and switch providers without rewriting your application’s integration layer."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((p) => (
              <Card key={p.name}>
                <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">{p.blurb}</p>
                <Link
                  href="https://app.keyvera.cloud"
                  className="mt-4 inline-flex text-sm font-medium text-primary no-underline hover:underline"
                >
                  View models →
                </Link>
              </Card>
            ))}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent sm:col-span-2 lg:col-span-3">
              <h3 className="text-base font-semibold text-foreground">Custom enterprise models</h3>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-body)]">
                Connect proprietary or self-hosted models alongside third-party providers through
                the same gateway.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES — approved home features copy */}
      <section
        id="platform-features"
        className="section-pad border-b border-border py-16 md:py-24"
        aria-labelledby="features-heading"
      >
        <div className="container">
          <SectionHeading
            id="features-heading"
            title="One account. Complete control."
            subtitle="Manage your API keys, balance, model access, and usage from a single Keyvera workspace."
          />
          <div className="grid gap-4 md:grid-cols-6">
            {features.map((f) => (
              <Card
                key={f.title}
                className={cn(
                  'md:col-span-2',
                  f.wide && 'md:col-span-3',
                  f.full && 'md:col-span-6',
                )}
              >
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="section-pad border-b border-border bg-secondary/30 py-16 md:py-24" aria-labelledby="trust-heading">
        <div className="container">
          <SectionHeading
            id="trust-heading"
            title="Built for teams shipping with AI."
            subtitle="No fabricated case studies — just what a unified gateway is designed to change about how your team works."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section
        id="pricing"
        className="relative overflow-hidden py-16 md:py-24"
        aria-labelledby="pricing-heading"
        data-theme="dark"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #000848 0%, #000030 45%, #1e0a4a 100%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <h2 id="pricing-heading" className="text-balance text-white">
            Flexible access for every stage of growth.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Start with the plan that fits your current workload, then expand model access and
            operational controls as your application grows.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="bg-white text-[var(--brand-navy)] hover:bg-white/90">
              <Link href="/pricing">View Pricing</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="https://app.keyvera.cloud/register">Get API Key</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
