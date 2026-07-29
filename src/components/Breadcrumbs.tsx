import React from 'react'
import Link from 'next/link'

export type BreadcrumbCrumb = { label?: string | null; url?: string | null }

/**
 * Server-rendered breadcrumb bar.
 * Renders schema.org BreadcrumbList markup so Google displays rich breadcrumb results.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbCrumb[] }) {
  if (!items || items.length === 0) return null

  // Filter out crumbs without labels
  const crumbs = items.filter((c) => c.label).slice(0, 6) as { label: string; url?: string | null }[]

  if (crumbs.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="container py-2 text-xs text-muted-foreground"
    >
      <ol
        className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li
              key={i}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!isLast && crumb.url ? (
                <Link
                  href={crumb.url}
                  className="hover:text-primary transition-colors no-underline"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.label}</span>
                </Link>
              ) : (
                <span
                  className="text-foreground/60"
                  itemProp="item"
                  aria-current="page"
                >
                  <span itemProp="name">{crumb.label}</span>
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
              {!isLast && (
                <svg className="size-3 text-muted-foreground/40" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                  />
                </svg>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
