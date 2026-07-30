import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  light?: boolean
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    light = false,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt="KEYVERA"
      width={180}
      height={82}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-8 w-auto', light && 'brightness-0 invert', className)}
      src="/keyvera-logo-horizontal.svg"
    />
  )
}
