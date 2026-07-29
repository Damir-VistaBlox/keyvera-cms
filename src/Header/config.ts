import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    /* ── Navigation is managed by the @spon/payload-navigation plugin ──
       The plugin adds a "Navigations" collection under the admin sidebar.
       The Header Nav and MobileNav components fetch from that collection
       instead of reading navItems from this global.                    */
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
  versions: false,
}
