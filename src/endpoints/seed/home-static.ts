import type { RequiredDataFromCollectionSlug } from 'payload'

/**
 * Fallback homepage content when CMS has no published `home` page yet.
 * Full Keyvera marketing homepage is rendered by KeyveraHome; this keeps
 * generateMeta / redirects sane.
 */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'none',
  },
  meta: {
    description:
      'Access leading AI models through one unified API. Simplify integrations, centralize model usage, and build resilient multi-model applications with KEYVERA.',
    title: 'KEYVERA — One API for Leading AI Models',
  },
  title: 'Home',
  layout: [],
}
