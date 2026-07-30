'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * GSAP-powered hero animations — replaces the CSS keyframe approach.
 *
 * 1. Convergence lines: stroke-dashoffset draw-in, staggered 80ms, 1s each
 * 2. Central node: scale + opacity breath, 6s loop, infinite
 * 3. Scroll-triggered reveals: cards fade up as they enter viewport
 *
 * All selectors target elements anywhere in the document on mount —
 * the Convergence Node SVG and data-reveal-card elements are rendered
 * by the parent server component before this client island hydrates.
 */
export function HeroAnimation() {
  useGSAP(() => {
    /* ── 1. Convergence Node — line draw sequence ── */
    const lines = gsap.utils.toArray<SVGLineElement>('.convergence-line line')

    if (lines.length > 0) {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })

      tl.set(lines, { strokeDasharray: 1000, strokeDashoffset: 1000 })

      lines.forEach((line, i) => {
        tl.to(line, { strokeDashoffset: 0 }, i * 0.08)
      })

      // Pulse the node glow briefly at end
      tl.to('.node-pulse circle:first-child', { attr: { r: 10 }, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .to('.node-pulse circle:first-child', { attr: { r: 6 }, opacity: 0.8, duration: 0.8, ease: 'power2.inOut' })
    }

    /* ── 2. Node breathing pulse — infinite loop ── */
    gsap.to('.node-pulse circle:first-child', {
      attr: { r: 8 },
      opacity: 1,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.0,
    })

    /* ── 3. Outer ring subtle glow pulse ── */
    gsap.to('.node-ring', {
      opacity: 0.15,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.0,
    })

    /* ── 4. Scroll-triggered card reveals ── */
    ScrollTrigger.batch('[data-reveal-card]', {
      onEnter: (elements) => {
        gsap.fromTo(elements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
      },
      start: 'top 85%',
      once: true,
    })
  })

  return null
}
