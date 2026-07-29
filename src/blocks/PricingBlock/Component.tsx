import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('size-4 shrink-0 text-success', className)}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"
      />
    </svg>
  )
}

export const PricingBlockComponent: React.FC<any> = ({
  heading,
  subtitle,
  tiers,
  trustBadges,
}) => {
  return (
    <section className="section-pad py-16 md:py-24">
      <div className="container">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          {heading && <h2 className="text-balance">{heading}</h2>}
          {subtitle && (
            <p className="mt-4 text-base text-[var(--text-body)] md:text-lg">{subtitle}</p>
          )}
        </div>

        {/* Tiers */}
        {tiers && tiers.length > 0 && (
          <div
            className={cn(
              'grid gap-6',
              tiers.length <= 3
                ? 'lg:grid-cols-3'
                : 'md:grid-cols-2 lg:grid-cols-4',
            )}
          >
            {tiers.map((tier: any, i: number) => (
              <div
                key={i}
                className={cn(
                  'relative flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow',
                  tier.highlight
                    ? 'border-primary shadow-md ring-1 ring-primary/20 md:-mt-2 md:pb-8 md:pt-8'
                    : 'border-border hover:border-primary/40',
                )}
              >
                {tier.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Recommended
                  </span>
                ) : null}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                  </div>
                  {tier.description ? (
                    <p className="mt-1 text-sm text-[var(--text-body)]">{tier.description}</p>
                  ) : null}
                </div>

                {/* Features */}
                {tier.features && tier.features.length > 0 && (
                  <ul className="mb-6 flex-1 space-y-2.5">
                    {tier.features.map((f: any, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <CheckIcon
                          className={cn(
                            'mt-0.5',
                            f.included ? 'text-success' : 'text-muted-foreground/30',
                          )}
                        />
                        <span
                          className={cn(
                            f.included
                              ? 'text-[var(--text-body)]'
                              : 'text-muted-foreground/50 line-through',
                          )}
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {tier.cta?.label && tier.cta?.url ? (
                  <Button
                    asChild
                    variant={tier.cta.variant === 'outline' ? 'outline' : tier.cta.variant === 'cta' ? 'cta' : 'default'}
                    size="lg"
                    className="w-full"
                  >
                    <Link href={tier.cta.url}>{tier.cta.label}</Link>
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Trust badges */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustBadges.map((b: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary">{b.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
