import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** Show wordmark text next to mark */
  withWordmark?: boolean
  /** Force light mark (for dark footer backgrounds) */
  light?: boolean
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    withWordmark = true,
    light = false,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2.5 no-underline select-none',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        width={44}
        height={33}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-[28px] w-auto shrink-0"
        src="/keyvera-mark.svg"
        aria-hidden="true"
      />
      {withWordmark && (
        <span
          className={clsx(
            'font-semibold tracking-[0.04em] text-[1.05rem] leading-none',
            light ? 'text-white' : 'text-foreground',
          )}
        >
          KEYVERA
        </span>
      )}
      <span className="sr-only">KEYVERA</span>
    </span>
  )
}
