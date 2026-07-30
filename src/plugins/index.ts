import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { navigationPlugin } from '@spon/payload-navigation'
import { seoAnalyzerPlugin } from '@consilioweb/payload-seo-analyzer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { seoPlugin } from '@payloadcms/plugin-seo'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | KEYVERA` : 'KEYVERA — One API for Leading AI Models'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  /* ── Navigation — drag-and-drop menu builder ── */
  navigationPlugin({
    internalCollections: ['pages'],
    maxDepth: 2,
    resolveInternalUrl: async ({ id, collection, payload }) => {
      try {
        const doc = (await payload.findByID({ collection, id, depth: 0 })) as Record<string, any>
        return doc?.slug ? `/${doc.slug}` : '#'
      } catch {
        return '#'
      }
    },
  }),

  /* ── SEO Analyzer — 50+ on-page checks, dashboard, coexists with plugin-seo ── */
  seoAnalyzerPlugin({
    collections: ['pages', 'posts'],
    siteUrl: getServerSideURL(),
  }),

  /* ── SEO Plugin — meta fields for pages/posts ── */
  seoPlugin({ generateTitle, generateURL }),

  /* ── Vercel Blob — conditional ── */
  ...(process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
          clientUploads: true,
        }),
      ]
    : []),

  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return { ...field, admin: { description: 'You will need to rebuild the website when changing this field.' } }
          }
          return field
        }),
      hooks: { afterChange: [revalidateRedirects] },
    },
  }),

  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),

  formBuilderPlugin({
    fields: { payment: false },
    formOverrides: {
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                ],
              }),
            }
          }
          return field
        }),
    },
  }),

  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
]
