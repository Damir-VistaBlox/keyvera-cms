import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const baseTitle = doc?.meta?.title || 'KEYVERA — One API for Leading AI Models'

  return {
    description: doc?.meta?.description || 'Access leading AI models through one unified API.',
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title: baseTitle,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    // When no CMS meta title is set we fall back to the branded default — use absolute
    // to prevent Next.js from applying the parent template (%s | KEYVERA) on top of it,
    // which would produce "KEYVERA — One API for Leading AI Models | KEYVERA".
    // Pages with explicit CMS meta titles (e.g. "Simple, transparent pricing") still
    // get the brand suffix appended by the template.
    title: doc?.meta?.title ? baseTitle : { absolute: baseTitle },
  }
}
