const faqs = [
  { q: 'What is Keyvera?', a: 'Keyvera is an AI API wholesale reseller. We buy model capacity in bulk from upstream providers and pass the savings to you at exactly 50% of retail pricing. You get one OpenAI-compatible API key that works across 200+ models.' },
  { q: 'How does the 2× top-up work?', a: 'When you deposit money, your balance is doubled. Deposit €25, get $50 in credit. Deposit €50, get $100. Deposit €100, get $200. Your credit works across every model and provider in your account.' },
  { q: 'Do you add a per-token markup?', a: 'No. Every model is priced at exactly 50% of its official API retail rate. We make our margin from the top-up conversion, not from per-token markups. The price you see on our pricing page is what you pay.' },
  { q: 'Which AI models can I access?', a: 'All models from Anthropic (Claude), OpenAI (GPT), Google (Gemini), Meta (Llama), Mistral, DeepSeek, Grok, Zhipu, Kimi, and more. 200+ models across all major providers, available through one API endpoint.' },
  { q: 'Is your API OpenAI-compatible?', a: 'Yes. The Keyvera API is fully compatible with the OpenAI SDK. If your application already works with the OpenAI API, switching to Keyvera requires changing only the base URL and API key. No code changes needed.' },
  { q: 'Where is my data processed?', a: 'All Keyvera infrastructure runs on AWS in Frankfurt (eu-central-1), within the European Union. Our database is hosted on Neon (serverless PostgreSQL) with encryption at rest and in transit. We do not log or store your API request content.' },
]

export default function HomeFAQ() {
  return (
    <section className="border-t border-border py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="container max-w-3xl">
        <div className="mb-12 text-center">
          <h2 id="faq-heading" className="text-balance text-foreground">Frequently asked questions</h2>
          <p className="mt-3 text-[var(--text-body)]">Everything you need to know about Keyvera pricing, models, and API access.</p>
        </div>

        <dl className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-foreground hover:text-primary transition-colors marker:content-none list-none">
                {faq.q}
                <svg
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  />
                </svg>
              </summary>
              <p className="mt-3 pr-10 text-sm text-[var(--text-body)] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </dl>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{' '}
            <a href="mailto:support@keyvera.cloud" className="font-medium text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
