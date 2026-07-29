import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React, { Suspense } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import type { Viewport } from 'next'

/* =================================================================
   JSON-LD Structured Data — Google's preferred format
   ================================================================= */
function StructuredData() {
  const siteUrl = getServerSideURL()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'KEYVERA',
        url: siteUrl,
        logo: `${siteUrl}/keyvera-mark.svg`,
        description:
          'Access leading AI models through one unified API. Simplify integrations, centralize model usage, and build resilient multi-model applications.',
        sameAs: ['https://github.com/Damir-VistaBlox', 'https://linkedin.com/company/keyvera'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'sales@keyvera.cloud',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'KEYVERA',
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/* ── Skeleton fallback while Header/Footer are suspending ── */
function HeaderFallback() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="h-7 w-28 animate-pulse rounded bg-border/50" />
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-3">
          <div className="h-9 w-16 animate-pulse rounded bg-border/50" />
          <div className="h-9 w-24 animate-pulse rounded bg-border/50" />
        </div>
      </div>
    </header>
  )
}

function FooterFallback() {
  return (
    <footer className="site-footer">
      <div className="container py-10">
        <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
      </div>
    </footer>
  )
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://app.keyvera.cloud" />
        <link rel="preconnect" href="https://api.keyvera.cloud" />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <StructuredData />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          {children}
          <Suspense fallback={<FooterFallback />}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'KEYVERA — One API for Leading AI Models',
    template: '%s | KEYVERA',
  },
  description:
    'Access leading AI models through one unified API. Simplify integrations, centralize model usage, and build resilient multi-model applications with KEYVERA.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@keyvera',
  },
  icons: {
    icon: [{ url: '/keyvera-mark.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  applicationName: 'KEYVERA',
  appleWebApp: {
    title: 'KEYVERA',
    capable: true,
    statusBarStyle: 'black-translucent' as const,
  },
}
