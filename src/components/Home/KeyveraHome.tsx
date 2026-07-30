import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { HeroCodeBlock } from './HeroCodeBlock'
import { ConvergenceNode } from './ConvergenceNode'
import FeaturedOn from './FeaturedOn'
import HomeFAQ from './HomeFAQ'

/* =================================================================
   Data — static marketing content, server-rendered for SEO
   ================================================================= */

const providers = [
  { name: 'OpenAI', icon: '/icons/openai.svg', blurb: "Run GPT-5.6, o3, and O4-mini through one endpoint — no separate OpenAI billing required." },
  { name: 'Anthropic', icon: '/icons/claude-color.svg', blurb: "Access Claude Sonnet 5, Opus 4.8, and Haiku 4.5 with zero code changes via the OpenAI-compatible API." },
  { name: 'Google', icon: '/icons/google-color.svg', blurb: "Gemini Pro, Flash, and Ultra models at 50% off retail, with the same request format you already use." },
  { name: 'Mistral', icon: '/icons/mistral-color.svg', blurb: "Mistral Large and Small models at wholesale rates — ideal for European data residency workloads." },
  { name: 'Meta', icon: '/icons/meta-color.svg', blurb: "Llama 4 and Llama 3.3 models with no per-token markup, served from EU infrastructure." },
  { name: 'DeepSeek', icon: '/icons/deepseek-color.svg', blurb: "DeepSeek V3.2 and R1 reasoning models at the lowest available rates through a unified API." },
]

const heroStats = [
  { value: '100T+', label: 'Tokens served' },
  { value: '5K+', label: 'Active developers' },
  { value: '200+', label: 'Models available' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const processSteps = [
  { n: '01', title: 'Integrate', body: 'Add one lightweight SDK or connect through a familiar OpenAI-compatible API.' },
  { n: '02', title: 'Choose', body: 'Select a model directly or route requests according to your application\'s requirements.' },
  { n: '03', title: 'Scale', body: 'Use centralized infrastructure for larger workloads, provider changes, and failover.' },
]

const features = [
  { title: 'One shared balance', body: 'Top up once; the same balance works across models and providers.' },
  { title: 'Usage tracking', body: 'See requests, tokens, and spending in one dashboard.' },
  { title: 'API key management', body: 'Create and revoke keys from a single Keyvera account.' },
  { title: 'Switch models easily', body: 'Change the model ID without opening new provider accounts.', wide: true },
  { title: 'Flexible billing', body: 'Pay-as-you-go or subscription — pick what fits your workload.', wide: true },
  { title: 'Reliable & Fast', body: 'Provider fallback and model failover when traffic or upstreams shift.', full: true },
]

const pricingPreview = [
  { name: 'Starter', price: 'Pay as you go', desc: 'Top up your balance, pay per token.', cta: 'Get Started →', url: 'https://app.keyvera.cloud/register' },
  { name: 'Pro', price: '$49/mo', desc: 'Includes $50 monthly credit. 2× top-up.', cta: 'Start Pro →', url: 'https://app.keyvera.cloud/register', highlight: true },
  { name: 'Enterprise', price: 'Custom', desc: 'Volume discounts, dedicated support, SLA.', cta: 'Contact Sales →', url: 'mailto:sales@keyvera.cloud' },
]

/* =================================================================
   Sub-components
   ================================================================= */
function SectionHeading({ id, title, subtitle }: { id?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <h2 id={id} className="text-balance text-foreground">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-[var(--text-body)] md:text-lg">{subtitle}</p> : null}
    </div>
  )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40', className)}>
      {children}
    </div>
  )
}

/* =================================================================
   Homepage — server-rendered (SEO-visible without JS)
   ================================================================= */
export default async function KeyveraHome() {
  return (
    <div className="flex flex-col">
      {/* ═══════ HERO with Convergence Node ═══════ */}
      <section id="top" aria-label="Introduction" className="relative overflow-hidden border-b border-border" data-theme="dark">
        <div className="pointer-events-none absolute inset-0 opacity-40 hero-atmosphere-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] hero-atmosphere-grid" aria-hidden="true" />

        {/* Convergence Node motif */}
        <ConvergenceNode />

        <div className="container relative z-10 py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-primary uppercase">ONE API · MULTIPLE AI PROVIDERS</p>
            <h1 className="text-balance text-white">Leading AI models. One unified API.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              Connect to leading AI providers through one clean API. Simplify integrations,
              centralize model usage, and route requests without rebuilding your application.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="https://app.keyvera.cloud/register">Get API Key</Link>
              </Button>
              <Button asChild size="lg" variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold text-white sm:text-2xl">{s.value}</div>
                  <div className="mt-1 text-[0.7rem] font-medium uppercase tracking-wide text-white/50">{s.label}</div>
                </div>
              ))}
            </div>

            <HeroCodeBlock />
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED ON ═══════ */}
      <FeaturedOn />

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="section-pad border-b border-border py-16 md:py-24" aria-labelledby="how-heading">
        <div className="container">
          <SectionHeading id="how-heading" title="One integration. Every model."
            subtitle="Replace fragmented provider integrations with a single, consistent workflow designed to make model access easier to operate and scale." />
          <ol className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.n}>
                <Card className="h-full">
                  <span className="text-xs font-semibold tracking-[0.12em] text-primary">{step.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-body)]">{step.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════ MODELS ═══════ */}
      <section id="models" className="section-pad border-b border-border bg-secondary/40 py-16 md:py-24" aria-labelledby="models-heading">
        <div className="container">
          <SectionHeading id="models-heading" title="Complete model access. One consistent interface."
            subtitle="Choose a primary model, configure routing behavior, and switch providers without rewriting your application's integration layer." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((p) => (
              <Card key={p.name}>
                <div className="flex items-center gap-3 mb-2">
                  <img src={p.icon} alt="" className="h-6 w-6 object-contain shrink-0" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--text-body)]">{p.blurb}</p>
                <Link href="/pricing" className="mt-4 inline-flex text-sm font-medium text-primary no-underline hover:underline">
                  View pricing →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="section-pad border-b border-border py-16 md:py-24" aria-labelledby="features-heading">
        <div className="container">
          <SectionHeading id="features-heading" title="One account. Complete control."
            subtitle="Manage your API keys, balance, model access, and usage from a single Keyvera workspace. No silos, no fragmentation." />
          <div className="grid gap-4 md:grid-cols-6">
            {features.map((f) => (
              <Card key={f.title}
                className={cn('md:col-span-2', f.wide && 'md:col-span-3', f.full && 'md:col-span-6')}>
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING PREVIEW ═══════ */}
      <section id="pricing" className="section-pad border-b border-border bg-secondary/30 py-16 md:py-24" aria-labelledby="pricing-heading">
        <div className="container">
          <SectionHeading id="pricing-heading" title="Flexible access for every stage of growth."
            subtitle="Start with the plan that fits your current workload, then expand model access and operational controls as your application grows." />
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {pricingPreview.map((tier) => (
              <div key={tier.name}
                className={cn(
                  'relative flex flex-col rounded-xl border bg-card p-6 shadow-sm',
                  tier.highlight ? 'border-primary shadow-md ring-1 ring-primary/20 md:-mt-2 md:pb-8 md:pt-8' : 'border-border hover:border-primary/40',
                )}>
                {tier.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">Recommended</span>}
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-body)]">{tier.desc}</p>
                <Link href={tier.url}
                  className={cn('mt-4 inline-flex items-center text-sm font-medium no-underline hover:underline', tier.highlight ? 'text-primary' : 'text-foreground/70')}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="mx-auto mb-10 max-w-2xl rounded-lg border border-primary/20 bg-primary/[0.04] px-5 py-4 text-center">
            <p className="text-sm text-[var(--text-body)]">
              <strong className="text-foreground">2× top-up:</strong> Deposit in EUR, get double in USD credit.
              €25 → $50. €50 → $100. €100 → $200. One balance works across all models and providers.
            </p>
          </div>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/pricing">Compare all models →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <HomeFAQ />
    </div>
  )
}
