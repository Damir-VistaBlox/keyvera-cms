import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div
        className="flex flex-col items-start gap-8 rounded-xl border border-primary/20 p-8 md:flex-row md:items-center md:justify-between md:p-10"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--primary) 12%, var(--card)) 0%, var(--card) 100%)',
        }}
      >
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
