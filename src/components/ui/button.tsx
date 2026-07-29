'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[color,box-shadow,transform,background] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        /* Primary interactive — Keyvera blue CTA */
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-px hover:shadow-[var(--glow-blue)]',
        /* Destructive */
        destructive:
          'border border-destructive bg-background text-destructive shadow-xs hover:bg-[#FEF2F2] dark:hover:bg-destructive/20',
        /* Secondary / outline navy */
        outline:
          'border border-foreground/20 bg-background text-foreground shadow-xs hover:bg-secondary hover:border-primary/40',
        /* Soft secondary surface */
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 border border-border',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline font-medium',
        /* Hero / final CTA — deep navy */
        cta: 'bg-[var(--brand-navy)] text-white shadow-sm hover:bg-[var(--brand-navy-light)] hover:-translate-y-px',
      },
      size: {
        clear: '',
        default: 'h-10 px-6 py-2 has-[>svg]:px-4',
        sm: 'h-9 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-8 text-base has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
