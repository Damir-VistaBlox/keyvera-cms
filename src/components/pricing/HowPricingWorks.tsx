type Section = {
  title: string
  body: string
}

export default function HowPricingWorks() {
  const steps: Section[] = [
    {
      title: 'Wholesale-sourced prices',
      body: "We buy AI model capacity in bulk from upstream providers at volume rates. Every model you access through Keyvera is priced at exactly 50% of its official API retail rate. No per-token markup, no hidden fees.",
    },
    {
      title: '2× top-up credit',
      body: "Deposit €25, get $50 in credit. Deposit €50, get $100. Deposit €100, get $200. Your balance works across every model and every provider in your account. No per-model subscriptions, no separate billing.",
    },
    {
      title: 'Pay only for what you use',
      body: 'Tokens are deducted from your balance in real time as you make requests. Monitor usage, spending, and per-model breakdowns from your Keyvera dashboard. No surprises at the end of the month.',
    },
  ]

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-balance">How Keyvera pricing works</h2>
        <p className="mt-3 text-[var(--text-body)]">
          Three things to know about what you pay — and what you don't.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <span className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <h3 className="mb-2 text-base font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm text-[var(--text-body)]">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-primary/20 bg-primary/[0.03] p-6 text-center">
        <p className="text-sm font-medium text-foreground">Real-world example</p>
        <p className="mt-2 text-[var(--text-body)]">
          You top up with <strong className="text-foreground">€25</strong>. Your balance shows{' '}
          <strong className="text-foreground">$50</strong> in USD credit. You send 100,000 output
          tokens through Claude Sonnet 5 at{' '}
          <strong className="text-foreground">$1.03/1M</strong> via Keyvera. You pay{' '}
          <strong className="text-foreground">$0.10</strong>.
          The same 100,000 output tokens through Claude Sonnet 5 at Anthropic&apos;s official retail
          rate of <strong className="text-foreground">$2.60/1M</strong> would cost{' '}
          <strong className="text-foreground">$0.26</strong>. You save{' '}
          <strong className="text-primary">60%</strong> on the exact same model.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Keyvera prices are ≤50% of each model&apos;s official retail rate. The 2× top-up multiplier
          includes the EUR→USD exchange spread baked in — your deposit is converted at a flat 2× rate.
        </p>
      </div>
    </div>
  )
}
